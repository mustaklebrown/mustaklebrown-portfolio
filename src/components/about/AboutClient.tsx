"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icons';
import { Calendar, MapPin, Zap } from 'lucide-react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedPercentage = ({ value, delay = 0 }: { value: number; delay?: number }) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const controls = animate(count, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => setDisplayValue(Math.round(latest))
            });
            return () => controls.stop();
        }, delay * 1000 + 500);
        return () => clearTimeout(timeout);
    }, [value, count, delay]);

    return <span>{displayValue}%</span>;
};

interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string | null;
    proficiency: number | null;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
    location: string | null;
}

interface AboutClientProps {
    skills: Skill[];
    experiences: Experience[];
}

const AboutClient: React.FC<AboutClientProps> = ({ skills, experiences }) => {
    // Group skills by category
    const categories = Array.from(new Set(skills.map(s => s.category)));

    return (
        <div className="space-y-24">
            {/* Skills Section */}
            <section className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-accent-primary"></div>
                        <span className="text-accent-primary font-bold uppercase tracking-widest text-xs">Expertise</span>
                    </div>
                    <h2 className="text-4xl font-bold">Technical <span className="text-gradient-brand">Skills</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-vibrant p-8 rounded-[32px] border border-surface-text/5 dark:border-white/5 space-y-6 shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-accent-secondary flex items-center gap-3">
                                {category}
                            </h3>
                            <div className="space-y-4">
                                {skills.filter(s => s.category === category).map(skill => {
                                    const Icon = getIcon(skill.icon);
                                    return (
                                        <div key={skill.id} className="space-y-3 group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="p-1.5 rounded-lg bg-surface-text/5 dark:bg-white/5 group-hover:bg-accent-primary/10 transition-colors">
                                                        <Icon size={14} className="text-surface-muted group-hover:text-accent-primary transition-colors" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-surface-text/90 group-hover:text-surface-text transition-colors">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                {skill.proficiency && (
                                                    <div className="text-xs font-bold text-accent-primary bg-accent-primary/5 px-2 py-0.5 rounded-full border border-accent-primary/10">
                                                        <AnimatedPercentage value={skill.proficiency} delay={idx * 0.1} />
                                                    </div>
                                                )}
                                            </div>
                                            {skill.proficiency && (
                                                <div className="relative h-2 w-full bg-surface-text/10 dark:bg-white/5 rounded-full overflow-hidden border border-surface-text/5 dark:border-white/5">
                                                    {/* Background Glow */}
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.proficiency}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 2, delay: idx * 0.1 + 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                                        className="absolute inset-0 h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-20 blur-sm"
                                                    />

                                                    {/* Main Bar */}
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.proficiency}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 2, delay: idx * 0.1 + 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                                        className="relative h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary rounded-full"
                                                    >
                                                        {/* Shine Effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />

                                                        {/* Rocket/End indicator */}
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-accent-tertiary"></div>
                        <span className="text-accent-tertiary font-bold uppercase tracking-widest text-xs">Journey</span>
                    </div>
                    <h2 className="text-4xl font-bold">Professional <span className="text-gradient-brand">Experience</span></h2>
                </motion.div>

                <div className="relative space-y-8 before:absolute before:inset-0 before:left-8 before:w-px before:bg-gradient-to-b before:from-accent-primary/50 before:via-accent-tertiary/50 before:to-transparent before:hidden md:before:block">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-0 md:pl-20"
                        >
                            {/* Dot on timeline */}
                            <div className="absolute left-8 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-primary border-4 border-surface-bg hidden md:block" />

                            <div className="glass-deep p-8 rounded-[32px] border border-surface-text/5 dark:border-white/5 hover:border-accent-primary/20 transition-all group shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-surface-text group-hover:text-accent-primary transition-colors">
                                            {exp.position}
                                        </h3>
                                        <p className="text-accent-secondary font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm text-surface-muted">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>
                                                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                                                {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                            </span>
                                        </div>
                                        {exp.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} />
                                                <span>{exp.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-surface-muted leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutClient;
