"use client";

import Image from 'next/image';
import React from 'react';

const AboutHero = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="flex justify-center lg:justify-start">
                <div className="relative">
                    <div className="w-64 h-80 md:w-80 md:h-[400px] lg:w-[400px] lg:h-[500px] border-4 border-accent-secondary/30 rounded-[40px] glass-vibrant transform hover:rotate-2 transition-transform duration-500 overflow-hidden shadow-2xl bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/20">
                        <Image
                            src="/mustak.png"
                            alt="About Me"
                            width={400}
                            height={500}
                            className="w-full h-full object-cover p-4 rounded-[40px] drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute -bottom-6 -right-6 glass-deep p-6 rounded-3xl shadow-2xl border border-white/10">
                        <span className="block text-3xl font-bold text-gradient-brand">3+</span>
                        <span className="text-[10px] font-bold text-surface-muted uppercase tracking-wider">Years Exp.</span>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-accent-primary"></div>
                        <span className="text-accent-primary font-bold uppercase tracking-widest text-xs">Who I Am</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                        Dedication <br />
                        <span className="text-gradient-brand">Meets Design</span>
                    </h2>
                </div>

                <div className="space-y-6 text-surface-muted text-lg leading-relaxed max-w-xl">
                    <p>
                        I'm a <span className="text-surface-text font-semibold">Creative Full-Stack Developer</span> passionate about
                        building digital experiences that are as functional as they are beautiful.
                    </p>
                    <p>
                        With expertise in the <span className="text-accent-secondary font-medium">Modern Web Ecosystem</span>,
                        I help brands and businesses turn complex problems into elegant solutions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
