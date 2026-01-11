import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Left Side: Brand & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h3 className="text-xl font-bold tracking-wider">
                            <span className="text-cyan-400">VISHNU</span>
                            <span className="text-white ml-2">KASHYAP D</span>
                        </h3>
                        <p className="text-xs text-neutral-500">
                            © {currentYear} Vishnu Kashyap D. All rights reserved.
                        </p>
                    </div>

                    {/* Right Side: Social Icons */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://github.com/Vishnu-kashyap-D"
                            target="_blank"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/vishnu-kashyap-d"
                            target="_blank"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link
                            href="mailto:vishnukashyapd18@gmail.com"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
