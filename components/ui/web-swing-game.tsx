"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const GRAVITY = 1500;
const SWING_ATTACH_RADIUS = 280;
const PLAYER_SCREEN_X_RATIO = 0.32;
const ANCHOR_MIN_GAP = 150;
const ANCHOR_MAX_GAP = 230;
const ANCHOR_MIN_Y_RATIO = 0.12;
const ANCHOR_MAX_Y_RATIO = 0.38;
const BUILDING_WIDTH = 90;
const START_VX = 230;

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
    };
}

export function WebSwingGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<GameState>(createInitialState(800, 420));
    const rafRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const displayScoreRef = useRef(0);

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
            // angularVel derived from current linear velocity (tangential component / radius)
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

        const draw = (s: GameState) => {
            const { width, height } = s;
            const cameraX = s.playerWorldX - width * PLAYER_SCREEN_X_RATIO;

            // Sky
            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, "#0a0a12");
            grad.addColorStop(1, "#13131f");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Buildings + anchors
            for (const a of s.anchors) {
                const screenX = a.x - cameraX;
                if (screenX < -BUILDING_WIDTH || screenX > width + BUILDING_WIDTH) continue;

                const shade = 24 + Math.floor(a.shade * 14);
                ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 8})`;
                ctx.fillRect(screenX - BUILDING_WIDTH / 2, a.y, BUILDING_WIDTH, height - a.y);

                // Anchor point glow
                ctx.beginPath();
                ctx.arc(screenX, a.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#22d3ee";
                ctx.shadowColor = "#22d3ee";
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            const playerScreenX = s.playerWorldX - cameraX;

            // Web line
            if (s.swinging && s.anchor) {
                const anchorScreenX = s.anchor.x - cameraX;
                ctx.beginPath();
                ctx.moveTo(anchorScreenX, s.anchor.y);
                ctx.lineTo(playerScreenX, s.playerY);
                ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            // Player
            ctx.beginPath();
            ctx.arc(playerScreenX, s.playerY, 10, 0, Math.PI * 2);
            ctx.fillStyle = "#dc2626";
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(playerScreenX - 3, s.playerY - 2, 3, 2, -0.3, 0, Math.PI * 2);
            ctx.ellipse(playerScreenX + 4, s.playerY - 2, 3, 2, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = "#f8fafc";
            ctx.fill();
        };

        const tick = (time: number) => {
            const s = stateRef.current;
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const dt = Math.min((time - lastTimeRef.current) / 1000, 0.032);
            lastTimeRef.current = time;

            if (s.running && s.started) {
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

            draw(s);
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="text-center px-6">
                        <p className="text-white text-lg font-semibold mb-2">Click / tap to shoot a web</p>
                        <p className="text-neutral-300 text-sm">Click again to let go and fly. Time your release to swing further.</p>
                        <p className="text-cyan-400 text-sm mt-4">Click to start</p>
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="text-center px-6">
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
