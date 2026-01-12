"use client";
import { getProjects, getExperiences, getSkills } from "@/actions";
import Link from "next/link";
import { FolderGit2, Briefcase, Wrench, ArrowRight, Plus, Calendar, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [p, e, s] = await Promise.all([
                getProjects(),
                getExperiences(),
                getSkills(),
            ]);
            if (p.success) setProjects(p.data ?? []);
            if (e.success) setExperiences(e.data ?? []);
            if (s.success) setSkills(s.data ?? []);
            setLoading(false);
        };
        fetchData();
    }, []);

    const stats = [
        {
            label: "Total Projects",
            value: projects?.length || 0,
            icon: FolderGit2,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            href: "/admin/projects",
            description: `${projects?.filter(p => p.featured).length || 0} Featured`,
        },
        {
            label: "Experience",
            value: experiences?.length || 0,
            icon: Briefcase,
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            href: "/admin/experience",
            description: "Journey Milestones",
        },
        {
            label: "Total Skills",
            value: skills?.length || 0,
            icon: Wrench,
            color: "text-orange-300",
            bg: "bg-orange-300/10",
            href: "/admin/skills",
            description: `${Array.from(new Set(skills?.map(s => s.category))).length || 0} Categories`,
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-1"
                >
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
                        Dashboard <span className="text-gradient-brand">Overview</span>
                    </h1>
                    <p className="text-surface-muted text-base sm:text-lg font-medium">Manage your digital presence and portfolio content.</p>
                </motion.div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end px-4 border-r border-surface-border uppercase tracking-widest leading-none">
                        <span className="text-[10px] font-bold text-surface-muted mb-1">Status</span>
                        <span className="text-xs font-bold text-accent-secondary">Live Portfolio</span>
                    </div>
                    <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-2xl shadow-inner uppercase font-black text-xs">
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group"
                    >
                        {/* Interactive Spotlight Effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-accent-primary/50 via-transparent to-accent-secondary/50 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[2px]" />

                        <Link
                            href={stat.href}
                            className="relative flex flex-col h-full glass-deep rounded-[32px] border border-surface-border p-6 sm:p-8 overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)]"
                        >
                            {/* Animated Background Pulse */}
                            <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full ${stat.bg} blur-[60px] group-hover:scale-150 transition-transform duration-700 opacity-50`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-6 sm:mb-8">
                                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                                        <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                                        <stat.icon size={28} className="relative z-10" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1 text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] bg-accent-primary/10 px-2 py-0.5 rounded-full mb-1">
                                            <TrendingUp size={10} />
                                            <span>Active</span>
                                        </div>
                                        <div className="p-2 rounded-xl glass border border-surface-border text-surface-muted group-hover:text-surface-text transition-all group-hover:bg-accent-primary group-hover:text-white">
                                            <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-surface-text group-hover:text-gradient-brand transition-all duration-500">
                                            {stat.value}
                                        </h3>
                                        <div className="h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-surface-text uppercase tracking-widest leading-none">
                                            {stat.label}
                                        </p>
                                        <p className="text-xs text-surface-muted font-bold pt-2 flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-surface-muted" />
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Subtle Bottom Progress Line (Decorative) */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-border overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "circOut" }}
                                        className={`h-full bg-gradient-to-r from-transparent via-accent-primary to-transparent w-full opacity-50`}
                                    />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Recent Projects & Content Insights */}
                <div className="space-y-8">
                    {/* Recent Projects Preview */}
                    <div className="glass-vibrant p-5 sm:p-8 rounded-[40px] border border-surface-border space-y-6 sm:space-y-8 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-accent-secondary rounded-full" />
                                <h2 className="text-2xl font-bold text-surface-text">Recent Projects</h2>
                            </div>
                            <Link href="/admin/projects" className="text-sm font-bold text-accent-secondary hover:text-accent-secondary-hover transition-colors uppercase tracking-widest">
                                Manage All
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {projects?.slice(0, 4).map((project) => (
                                <div key={project.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-card/40 border border-surface-border hover:border-accent-secondary/30 transition-all group shadow-sm">
                                    <div className="w-16 h-16 rounded-xl bg-surface-bg border border-surface-border flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                        {project.imageUrl ? (
                                            <Image width={400} height={400} src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <FolderGit2 size={24} className="text-surface-muted" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-lg truncate text-surface-text group-hover:text-accent-secondary transition-colors">{project.title}</h4>
                                            {project.featured && <Star size={14} className="text-orange-500 fill-orange-500" />}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, 3).map((tag: string) => (
                                                <span key={tag} className="text-[10px] font-bold text-surface-muted uppercase">{tag}</span>
                                            ))}
                                            {project.tags.length > 3 && <span className="text-[10px] font-bold text-surface-muted">+{project.tags.length - 3}</span>}
                                        </div>
                                    </div>
                                    <Link href={`/admin/projects/${project.id}`} className="p-2.5 rounded-xl glass-deep text-surface-muted hover:text-accent-secondary transition-colors">
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            ))}
                            {(!projects || projects.length === 0) && (
                                <div className="text-center py-10 glass-deep rounded-3xl border border-surface-border border-dashed">
                                    <p className="text-surface-muted">No projects found in your database.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Add Section */}
                    <div className="glass p-5 sm:p-8 rounded-[40px] border border-surface-border shadow-xl bg-gradient-to-br from-accent-primary/5 to-transparent">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-surface-text">Quick Add</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/admin/projects/new" className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-surface-bg/50 border border-surface-border hover:border-accent-secondary/50 hover:bg-accent-secondary/5 transition-all group text-center shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-accent-secondary/10 text-accent-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                    <FolderGit2 size={24} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-surface-muted group-hover:text-surface-text">Project</span>
                            </Link>

                            <Link href="/admin/experience/new" className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-surface-bg/50 border border-surface-border hover:border-accent-tertiary/50 hover:bg-accent-tertiary/5 transition-all group text-center shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-accent-tertiary/10 text-accent-tertiary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                    <Briefcase size={24} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-surface-muted group-hover:text-surface-text">Experience</span>
                            </Link>

                            <Link href="/admin/skills/new" className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-surface-bg/50 border border-surface-border hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all group text-center shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                    <Wrench size={24} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-surface-muted group-hover:text-surface-text">Skill</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Experience & Skills Snapshot */}
                <div className="space-y-8">
                    {/* Recent Experience Entry */}
                    <div className="glass p-5 sm:p-8 rounded-[40px] border border-surface-border shadow-2xl space-y-6 sm:space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-accent-tertiary rounded-full" />
                                <h2 className="text-xl sm:text-2xl font-bold text-surface-text">Latest Milestone</h2>
                            </div>
                            <Link href="/admin/experience" className="text-sm font-bold text-accent-tertiary hover:text-accent-tertiary-hover transition-colors uppercase tracking-widest">
                                View Timeline
                            </Link>
                        </div>

                        {experiences && experiences[0] ? (
                            <div className="relative p-6 rounded-3xl bg-accent-tertiary/5 border border-accent-tertiary/10 group overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 p-6 text-accent-tertiary/10">
                                    <Briefcase size={80} />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-2 text-accent-tertiary text-[10px] font-black uppercase tracking-widest">
                                        <Calendar size={14} />
                                        <span>Current Position</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 text-surface-text leading-tight">{experiences[0].position}</h3>
                                        <p className="text-lg text-surface-muted italic font-medium">{experiences[0].company}</p>
                                    </div>
                                    <p className="text-sm text-surface-muted line-clamp-3 leading-relaxed">
                                        {experiences[0].description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-10 text-center glass-deep rounded-3xl border border-surface-border border-dashed">
                                <p className="text-surface-muted">No experience entries found.</p>
                            </div>
                        )}
                    </div>

                    {/* Skills Summary / Cloud Preview */}
                    <div className="glass p-5 sm:p-8 rounded-[40px] border border-surface-border shadow-2xl space-y-6 sm:space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-accent-primary rounded-full" />
                                <h2 className="text-xl sm:text-2xl font-bold text-surface-text">Skill Cloud</h2>
                            </div>
                            <Link href="/admin/skills" className="text-sm font-bold text-accent-primary hover:text-accent-primary-hover transition-colors uppercase tracking-widest">
                                Update Skills
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {skills?.slice(0, 15).map((skill) => (
                                <div key={skill.id} className="px-4 py-2 rounded-xl glass-deep border border-surface-border text-xs font-bold uppercase tracking-tight text-surface-text hover:border-accent-primary/30 hover:text-accent-primary transition-all shadow-sm">
                                    {skill.name}
                                </div>
                            ))}
                            {skills && skills.length > 15 && (
                                <div className="px-4 py-2 rounded-xl glass-deep border border-surface-border text-xs font-black text-surface-muted uppercase tracking-widest">
                                    +{skills.length - 15} more
                                </div>
                            )}
                            {(!skills || skills.length === 0) && (
                                <div className="w-full py-10 text-center rounded-3xl border border-surface-border border-dashed">
                                    <p className="text-surface-muted">No skills mapped yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
