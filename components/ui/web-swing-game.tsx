"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const WEB_CORNER = { x: 100, y: 0 };
const WEB_EDGE_POINTS = [
    { x: 0, y: 0 },
    { x: 0, y: 25 },
    { x: 0, y: 50 },
    { x: 0, y: 75 },
    { x: 0, y: 100 },
    { x: 25, y: 100 },
    { x: 50, y: 100 },
    { x: 75, y: 100 },
    { x: 100, y: 100 },
];
const WEB_RING_FRACTIONS = [0.2, 0.4, 0.6, 0.8];

function SpiderWebBackdrop() {
    const ringPolylines = WEB_RING_FRACTIONS.map((t) =>
        WEB_EDGE_POINTS.map(
            (p) => `${WEB_CORNER.x + (p.x - WEB_CORNER.x) * t},${WEB_CORNER.y + (p.y - WEB_CORNER.y) * t}`
        ).join(" ")
    );

    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-red-950/70 via-neutral-950 to-black">
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(circle at 88% 8%, rgba(220,38,38,0.28), transparent 55%)",
                }}
            />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {WEB_EDGE_POINTS.map((p, i) => (
                    <line
                        key={`radial-${i}`}
                        x1={WEB_CORNER.x}
                        y1={WEB_CORNER.y}
                        x2={p.x}
                        y2={p.y}
                        stroke="rgba(248,113,113,0.22)"
                        strokeWidth={0.35}
                    />
                ))}
                {ringPolylines.map((pts, i) => (
                    <polyline
                        key={`ring-${i}`}
                        points={pts}
                        fill="none"
                        stroke="rgba(248,113,113,0.18)"
                        strokeWidth={0.35}
                    />
                ))}
            </svg>
            <SpiderSilhouette className="absolute top-2 right-3 w-9 h-9 text-red-600/70 drop-shadow-[0_0_6px_rgba(220,38,38,0.5)]" />
        </div>
    );
}

function SpiderSilhouette({ className }: { className?: string }) {
    const legs = [-1, 1].flatMap((side) =>
        [0, 1, 2, 3].map((i) => {
            const originY = 10 + i * 1.6;
            const midX = 12 + side * 7;
            const midY = originY - 1 + i * 0.5;
            const endX = 12 + side * 11;
            const endY = originY + 3.5;
            return `${side}-${i}|12,${originY} ${midX},${midY} ${endX},${endY}`;
        })
    );

    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            {legs.map((entry) => {
                const [key, points] = entry.split("|");
                return (
                    <polyline
                        key={key}
                        points={points}
                        stroke="currentColor"
                        strokeWidth={0.9}
                        strokeLinecap="round"
                        fill="none"
                    />
                );
            })}
            <ellipse cx="12" cy="14" rx="3.2" ry="4" fill="currentColor" />
            <circle cx="12" cy="8.5" r="2.2" fill="currentColor" />
        </svg>
    );
}

const GRAVITY = 1500;
const SWING_ATTACH_RADIUS = 280;
const PLAYER_SCREEN_X_RATIO = 0.32;
const ANCHOR_MIN_GAP = 150;
const ANCHOR_MAX_GAP = 230;
const ANCHOR_MIN_Y_RATIO = 0.12;
const ANCHOR_MAX_Y_RATIO = 0.38;
const BUILDING_WIDTH = 90;
const START_VX = 230;
const FIXED_DT = 1 / 120;
const MAX_SUBSTEPS = 8;
const CAMERA_SMOOTHING = 10; // higher = snappier follow

interface Anchor {
    x: number;
    y: number;
    shade: number;
}

interface GameState {
    playerWorldX: number;
    playerY: number;
    vx: number;
    vy: number;
    swinging: boolean;
    anchor: Anchor | null;
    ropeLength: number;
    angle: number;
    angularVel: number;
    anchors: Anchor[];
    lastGeneratedWorldX: number;
    width: number;
    height: number;
    running: boolean;
    started: boolean;
    cameraX: number;
}

function pseudoRandom(seed: number) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

function createInitialState(width: number, height: number): GameState {
    return {
        playerWorldX: 0,
        playerY: height * 0.35,
        vx: START_VX,
        vy: 0,
        swinging: false,
        anchor: null,
        ropeLength: 0,
        angle: 0,
        angularVel: 0,
        anchors: [],
        lastGeneratedWorldX: 0,
        width,
        height,
        running: true,
        started: false,
        cameraX: -width * PLAYER_SCREEN_X_RATIO,
    };
}

// Static far-parallax skyline tiles, generated once and repeated via modulo.
function buildSkylineTile(seedOffset: number, count: number, minH: number, maxH: number, tileWidth: number) {
    const buildings: { x: number; w: number; h: number; seed: number }[] = [];
    let x = 0;
    let i = 0;
    while (x < tileWidth && i < count * 3) {
        const seed = seedOffset + i;
        const w = 40 + pseudoRandom(seed) * 50;
        const h = minH + pseudoRandom(seed + 0.5) * (maxH - minH);
        buildings.push({ x, w, h, seed });
        x += w + 8 + pseudoRandom(seed + 0.25) * 20;
        i++;
    }
    return { buildings, tileWidth };
}

export function WebSwingGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<GameState>(createInitialState(800, 420));
    const rafRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const accumulatorRef = useRef(0);
    const displayScoreRef = useRef(0);
    const skylineFarRef = useRef(buildSkylineTile(1, 8, 60, 160, 500));
    const skylineNearRef = useRef(buildSkylineTile(50, 6, 90, 220, 420));
    const starsRef = useRef(
        Array.from({ length: 40 }, (_, i) => ({
            x: pseudoRandom(i * 3.1) * 1000,
            y: pseudoRandom(i * 7.7) * 0.5,
            r: 0.6 + pseudoRandom(i * 2.3) * 1.2,
        }))
    );

    const [displayScore, setDisplayScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem("web-swing-best-score");
            if (saved) setBestScore(parseInt(saved, 10) || 0);
        } catch {
            // ignore
        }
    }, []);

    const ensureAnchorsAhead = useCallback((s: GameState) => {
        const targetX = s.playerWorldX + s.width * 2.5;
        while (s.lastGeneratedWorldX < targetX) {
            const gap = ANCHOR_MIN_GAP + Math.random() * (ANCHOR_MAX_GAP - ANCHOR_MIN_GAP);
            const nextX = s.lastGeneratedWorldX + gap;
            const yRatio = ANCHOR_MIN_Y_RATIO + Math.random() * (ANCHOR_MAX_Y_RATIO - ANCHOR_MIN_Y_RATIO);
            s.anchors.push({ x: nextX, y: s.height * yRatio, shade: Math.random() });
            s.lastGeneratedWorldX = nextX;
        }
        const cameraX = s.playerWorldX - s.width * PLAYER_SCREEN_X_RATIO;
        while (s.anchors.length && s.anchors[0].x < cameraX - BUILDING_WIDTH * 2) {
            s.anchors.shift();
        }
    }, []);

    const resetState = useCallback(() => {
        const canvas = canvasRef.current;
        const width = canvas?.clientWidth || 800;
        const height = canvas?.clientHeight || 420;
        stateRef.current = createInitialState(width, height);
        ensureAnchorsAhead(stateRef.current);
        displayScoreRef.current = 0;
        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
    }, [ensureAnchorsAhead]);

    const resetGame = useCallback(() => {
        resetState();
        stateRef.current.started = true;
        setDisplayScore(0);
        setGameOver(false);
        setStarted(true);
    }, [resetState]);

    const handleAction = useCallback(() => {
        const s = stateRef.current;
        if (!s.running || !s.started) return;

        if (s.swinging) {
            // Release: keep current tangential velocity as free-flight velocity
            s.vx = s.ropeLength * Math.cos(s.angle) * s.angularVel;
            s.vy = -s.ropeLength * Math.sin(s.angle) * s.angularVel;
            s.swinging = false;
            s.anchor = null;
            return;
        }

        // Try to attach to the nearest anchor ahead within range
        let best: Anchor | null = null;
        let bestDist = Infinity;
        for (const a of s.anchors) {
            if (a.x <= s.playerWorldX - 20) continue;
            const dx = a.x - s.playerWorldX;
            const dy = a.y - s.playerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < SWING_ATTACH_RADIUS && dist < bestDist) {
                best = a;
                bestDist = dist;
            }
        }

        if (best) {
            const dx = s.playerWorldX - best.x;
            const dy = s.playerY - best.y;
            const ropeLength = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = Math.atan2(dx, dy);
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const angularVel = (s.vx * cosA - s.vy * sinA) / ropeLength;
            s.anchor = best;
            s.ropeLength = ropeLength;
            s.angle = angle;
            s.angularVel = angularVel;
            s.swinging = true;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            stateRef.current.width = width;
            stateRef.current.height = height;
        };
        resize();
        resetState();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        const stepPhysics = (s: GameState, dt: number) => {
            if (s.swinging) {
                const angularAcc = -(GRAVITY / s.ropeLength) * Math.sin(s.angle);
                s.angularVel += angularAcc * dt;
                s.angle += s.angularVel * dt;
                s.playerWorldX = s.anchor!.x + s.ropeLength * Math.sin(s.angle);
                s.playerY = s.anchor!.y + s.ropeLength * Math.cos(s.angle);
            } else {
                s.vy += GRAVITY * dt;
                s.playerWorldX += s.vx * dt;
                s.playerY += s.vy * dt;
                if (s.playerY < 10) {
                    s.playerY = 10;
                    s.vy = Math.max(s.vy, 0);
                }
            }
        };

        const drawBackground = (s: GameState, cameraX: number) => {
            const { width, height } = s;

            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, "#0a0a16");
            grad.addColorStop(0.6, "#0f0f1e");
            grad.addColorStop(1, "#15151f");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Moon
            ctx.beginPath();
            ctx.arc(width * 0.82, height * 0.16, 22, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
            ctx.fill();

            // Stars (fixed screen positions, tiled horizontally)
            ctx.fillStyle = "rgba(255,255,255,0.55)";
            for (const star of starsRef.current) {
                const sx = ((star.x - cameraX * 0.02) % (width + 60) + width + 60) % (width + 60) - 30;
                const sy = star.y * height * 0.6;
                ctx.beginPath();
                ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
                ctx.fill();
            }

            const drawParallaxLayer = (
                tile: { buildings: { x: number; w: number; h: number; seed: number }[]; tileWidth: number },
                parallax: number,
                color: string,
                windowColor: string
            ) => {
                const scrollX = cameraX * parallax;
                const offset = ((scrollX % tile.tileWidth) + tile.tileWidth) % tile.tileWidth;
                const tilesNeeded = Math.ceil(width / tile.tileWidth) + 2;
                for (let t = -1; t < tilesNeeded; t++) {
                    const baseX = t * tile.tileWidth - offset;
                    for (const b of tile.buildings) {
                        const bx = baseX + b.x;
                        if (bx + b.w < 0 || bx > width) continue;
                        const by = height - b.h;
                        ctx.fillStyle = color;
                        ctx.fillRect(bx, by, b.w, b.h);

                        // A few lit windows per building, deterministic per building seed
                        const cols = Math.max(1, Math.floor(b.w / 14));
                        const rows = Math.max(1, Math.floor(b.h / 18));
                        for (let cy = 0; cy < rows; cy++) {
                            for (let cx = 0; cx < cols; cx++) {
                                const wSeed = b.seed * 97 + cy * 13 + cx * 31;
                                if (pseudoRandom(wSeed) > 0.78) {
                                    ctx.fillStyle = windowColor;
                                    ctx.fillRect(bx + 4 + cx * 14, by + 6 + cy * 18, 5, 7);
                                }
                            }
                        }
                    }
                }
            };

            drawParallaxLayer(skylineFarRef.current, 0.15, "#1a1a2e", "rgba(180, 200, 255, 0.25)");
            drawParallaxLayer(skylineNearRef.current, 0.4, "#20202f", "rgba(250, 204, 21, 0.35)");
        };

        const drawForeground = (s: GameState, cameraX: number) => {
            const { width, height } = s;
            for (const a of s.anchors) {
                const screenX = a.x - cameraX;
                if (screenX < -BUILDING_WIDTH || screenX > width + BUILDING_WIDTH) continue;

                const shade = 26 + Math.floor(a.shade * 16);
                ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 10})`;
                ctx.fillRect(screenX - BUILDING_WIDTH / 2, a.y, BUILDING_WIDTH, height - a.y);

                // Windows on foreground buildings
                const buildingHeight = height - a.y;
                const cols = Math.max(1, Math.floor(BUILDING_WIDTH / 16));
                const rows = Math.max(1, Math.floor(buildingHeight / 20));
                const seedBase = Math.floor(a.x);
                for (let cy = 0; cy < rows; cy++) {
                    for (let cx = 0; cx < cols; cx++) {
                        const wSeed = seedBase * 13 + cy * 7 + cx * 41;
                        if (pseudoRandom(wSeed) > 0.72) {
                            ctx.fillStyle = "rgba(250, 204, 21, 0.55)";
                            ctx.fillRect(
                                screenX - BUILDING_WIDTH / 2 + 6 + cx * 16,
                                a.y + 8 + cy * 20,
                                6,
                                9
                            );
                        }
                    }
                }

                // Anchor point glow (cheap radial gradient instead of shadowBlur)
                const glowGrad = ctx.createRadialGradient(screenX, a.y, 0, screenX, a.y, 10);
                glowGrad.addColorStop(0, "rgba(34, 211, 238, 0.9)");
                glowGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
                ctx.fillStyle = glowGrad;
                ctx.fillRect(screenX - 10, a.y - 10, 20, 20);
                ctx.beginPath();
                ctx.arc(screenX, a.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#22d3ee";
                ctx.fill();
            }
        };

        const drawSpiderman = (
            playerScreenX: number,
            playerY: number,
            s: GameState,
            cameraX: number,
            t: number
        ) => {
            let dirX: number;
            let dirY: number;
            if (s.swinging) {
                dirX = Math.cos(s.angle);
                dirY = -Math.sin(s.angle);
            } else {
                const speed = Math.hypot(s.vx, s.vy) || 1;
                dirX = s.vx / speed;
                dirY = s.vy / speed;
            }
            const angle = Math.atan2(dirY, dirX);
            const fx = Math.cos(angle);
            const fy = Math.sin(angle);

            const headX = playerScreenX + fx * 9;
            const headY = playerY + fy * 9;
            const shoulderX = playerScreenX + fx * 3;
            const shoulderY = playerY + fy * 3;
            const hipX = playerScreenX - fx * 7;
            const hipY = playerY - fy * 7;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Legs (trailing, slight flutter)
            const legFlutter = Math.sin(t / 90) * 0.12;
            for (const side of [1, -1]) {
                const legAngle = angle + Math.PI + side * (0.42 + legFlutter);
                const kneeX = hipX + Math.cos(legAngle) * 8;
                const kneeY = hipY + Math.sin(legAngle) * 8;
                const footAngle = legAngle - side * 0.35;
                const footX = kneeX + Math.cos(footAngle) * 7;
                const footY = kneeY + Math.sin(footAngle) * 7;
                ctx.beginPath();
                ctx.moveTo(hipX, hipY);
                ctx.lineTo(kneeX, kneeY);
                ctx.lineTo(footX, footY);
                ctx.strokeStyle = "#1d4ed8";
                ctx.lineWidth = 3.5;
                ctx.stroke();
            }

            // Arms
            if (s.swinging && s.anchor) {
                const anchorScreenX = s.anchor.x - cameraX;
                const toAnchorAngle = Math.atan2(s.anchor.y - shoulderY, anchorScreenX - shoulderX);
                const handX = shoulderX + Math.cos(toAnchorAngle) * 13;
                const handY = shoulderY + Math.sin(toAnchorAngle) * 13;
                ctx.beginPath();
                ctx.moveTo(shoulderX, shoulderY);
                ctx.lineTo(handX, handY);
                ctx.strokeStyle = "#dc2626";
                ctx.lineWidth = 3.5;
                ctx.stroke();

                const trailAngle = angle + Math.PI - 0.5;
                const otherHandX = shoulderX + Math.cos(trailAngle) * 10;
                const otherHandY = shoulderY + Math.sin(trailAngle) * 10;
                ctx.beginPath();
                ctx.moveTo(shoulderX, shoulderY);
                ctx.lineTo(otherHandX, otherHandY);
                ctx.strokeStyle = "#dc2626";
                ctx.lineWidth = 3.5;
                ctx.stroke();
            } else {
                const flap = Math.sin(t / 70) * 8 * (Math.PI / 180);
                for (const side of [1, -1]) {
                    const armAngle = angle + Math.PI + side * (0.55 + flap);
                    const handX = shoulderX + Math.cos(armAngle) * 12;
                    const handY = shoulderY + Math.sin(armAngle) * 12;
                    ctx.beginPath();
                    ctx.moveTo(shoulderX, shoulderY);
                    ctx.lineTo(handX, handY);
                    ctx.strokeStyle = "#dc2626";
                    ctx.lineWidth = 3.5;
                    ctx.stroke();
                }
            }

            // Torso
            ctx.beginPath();
            ctx.moveTo(shoulderX, shoulderY);
            ctx.lineTo(hipX, hipY);
            ctx.strokeStyle = "#dc2626";
            ctx.lineWidth = 6;
            ctx.stroke();

            // Head
            ctx.beginPath();
            ctx.arc(headX, headY, 6, 0, Math.PI * 2);
            ctx.fillStyle = "#b91c1c";
            ctx.fill();

            // Eye lenses
            const eyeOffsetAngle = angle + Math.PI / 2;
            const ex = Math.cos(eyeOffsetAngle) * 2.6;
            const ey = Math.sin(eyeOffsetAngle) * 2.6;
            ctx.save();
            ctx.translate(headX + fx * 1.5, headY + fy * 1.5);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.ellipse(1.5, -2.6, 2.6, 1.7, 0, 0, Math.PI * 2);
            ctx.ellipse(1.5, 2.6, 2.6, 1.7, 0, 0, Math.PI * 2);
            ctx.fillStyle = "#f8fafc";
            ctx.fill();
            ctx.restore();
            void ex;
            void ey;
        };

        const draw = (s: GameState, t: number) => {
            const cameraX = s.cameraX;
            drawBackground(s, cameraX);
            drawForeground(s, cameraX);

            const playerScreenX = s.playerWorldX - cameraX;

            if (s.swinging && s.anchor) {
                const anchorScreenX = s.anchor.x - cameraX;
                ctx.beginPath();
                ctx.moveTo(anchorScreenX, s.anchor.y);
                ctx.lineTo(playerScreenX, s.playerY);
                ctx.strokeStyle = "rgba(226, 232, 240, 0.55)";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            drawSpiderman(playerScreenX, s.playerY, s, cameraX, t);
        };

        const tick = (time: number) => {
            const s = stateRef.current;
            if (!lastTimeRef.current) lastTimeRef.current = time;
            let frameDt = (time - lastTimeRef.current) / 1000;
            frameDt = Math.min(frameDt, 0.1);
            lastTimeRef.current = time;

            if (s.running && s.started) {
                accumulatorRef.current += frameDt;
                let steps = 0;
                while (accumulatorRef.current >= FIXED_DT && steps < MAX_SUBSTEPS) {
                    stepPhysics(s, FIXED_DT);
                    accumulatorRef.current -= FIXED_DT;
                    steps++;
                }

                ensureAnchorsAhead(s);

                const newScore = Math.floor(s.playerWorldX / 10);
                if (newScore !== displayScoreRef.current) {
                    displayScoreRef.current = newScore;
                    setDisplayScore(newScore);
                }

                if (s.playerY > s.height + 40) {
                    s.running = false;
                    setGameOver(true);
                    setBestScore((prev) => {
                        const next = Math.max(prev, displayScoreRef.current);
                        try {
                            window.localStorage.setItem("web-swing-best-score", String(next));
                        } catch {
                            // ignore
                        }
                        return next;
                    });
                }
            }

            // Smooth camera follow (frame-rate independent easing)
            const targetCameraX = s.playerWorldX - s.width * PLAYER_SCREEN_X_RATIO;
            const smoothing = 1 - Math.exp(-CAMERA_SMOOTHING * frameDt);
            s.cameraX += (targetCameraX - s.cameraX) * smoothing;

            draw(s, time);
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        if (gameOver || !started) {
            resetGame();
            return;
        }
        handleAction();
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-white/10 select-none touch-none"
            onPointerDown={onPointerDown}
        >
            <canvas ref={canvasRef} className="block w-full h-full cursor-pointer" />

            <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
                <div className="text-2xl font-bold text-white tabular-nums">{displayScore}m</div>
                <div className="text-xs text-neutral-400">Best: {bestScore}m</div>
            </div>

            {!started && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <SpiderWebBackdrop />
                    <div className="relative z-10 text-center px-6">
                        <p className="text-white text-lg font-semibold mb-2">Click / tap to shoot a web</p>
                        <p className="text-neutral-300 text-sm">Click again to let go and fly. Time your release to swing further.</p>
                        <p className="text-cyan-400 text-sm mt-4">Click to start</p>
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <SpiderWebBackdrop />
                    <div className="relative z-10 text-center px-6">
                        <p className="text-white text-2xl font-bold mb-1">Web snapped!</p>
                        <p className="text-neutral-300 mb-1">You swung {displayScore}m</p>
                        <p className="text-neutral-500 text-sm mb-4">Best: {bestScore}m</p>
                        <p className="text-cyan-400 text-sm">Click to try again</p>
                    </div>
                </div>
            )}
        </div>
    );
}
