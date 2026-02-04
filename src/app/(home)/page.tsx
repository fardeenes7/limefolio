"use client";

import { LimefolioLIcon } from "@/lib/icons";
import { IconSparkles } from "@tabler/icons-react";

export default function Home() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-zinc-950 via-black to-zinc-900">
            {/* Animated gradient orbs */}

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-lime-400/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
                {/* Logo */}
                <div className="mb-8 animate-fade-in">
                    <div className="size-24 transition-transform hover:scale-110 duration-500">
                        <LimefolioLIcon className="size-24" />
                    </div>
                </div>

                {/* Main heading */}
                <div className="text-center space-y-6 mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 backdrop-blur-sm">
                        <IconSparkles className="w-4 h-4 text-lime-400 animate-pulse" />
                        <span className="text-sm font-medium text-lime-400">
                            Coming Soon
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span className="bg-linear-to-r from-white via-lime-100 to-lime-400 bg-clip-text text-transparent">
                            Limefolio
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Create stunning portfolio websites in minutes.{" "}
                    </p>

                    <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
                        We're crafting the ultimate platform for designers,
                        developers, and creators to showcase their work
                        beautifully.
                    </p>
                </div>

                {/* Email subscription form */}
                {/* <div className="w-full max-w-md mb-16 animate-fade-in-up delay-200">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-lime-500 to-emerald-500 rounded-full opacity-30 group-hover:opacity-50 blur transition duration-300" />
                            <div className="relative flex items-center">
                                <IconMail className="absolute left-4 w-5 h-5 text-zinc-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-12 pr-32 py-4 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-lime-500/50 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className="absolute right-2 px-6 py-2.5 bg-linear-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-medium rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitted
                                        ? "✓ Subscribed!"
                                        : "Notify Me"}
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-xs text-zinc-600 text-center mt-3">
                        Join the waitlist to get early access and exclusive
                        updates
                    </p>
                </div> */}

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16 animate-fade-in-up delay-300">
                    {[
                        {
                            title: "Beautiful Templates",
                            desc: "Choose from stunning pre-designed templates",
                        },
                        {
                            title: "Custom Domains",
                            desc: "Use your own domain or get a free subdomain",
                        },
                        {
                            title: "Analytics Built-in",
                            desc: "Track your portfolio performance effortlessly",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="group relative p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-lime-500/30 transition-all duration-300 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-lime-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="relative text-sm text-zinc-400">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 text-center">
                    <p className="text-sm text-zinc-600">
                        © 2026 Limefolio. Launching soon.
                    </p>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(20px);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-float {
                    animation: float linear infinite;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }

                .delay-300 {
                    animation-delay: 300ms;
                }

                .delay-400 {
                    animation-delay: 400ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}
