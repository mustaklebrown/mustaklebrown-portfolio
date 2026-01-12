"use client"
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, X, Eye, Filter, Code2, Globe } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string | null;
    demoUrl: string | null;
    repoUrl: string | null;
    featured?: boolean;
}

interface ProjectsGridProps {
    projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTag, setActiveTag] = useState<string>("All");

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        tags.add("All");
        projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags);
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeTag === "All") return projects;
        return projects.filter(p => p.tags.includes(activeTag));
    }, [projects, activeTag]);

    return (
        <div className="space-y-12">
            {/* Filter Section */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border ${activeTag === tag
                            ? "bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20 scale-105"
                            : "glass text-surface-muted border-white/5 hover:border-white/20 hover:text-surface-text"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedProject(project)}
                            className="group relative rounded-[32px] overflow-hidden glass-vibrant cursor-pointer border border-white/5 hover:border-accent-primary/30 transition-all duration-500 shadow-xl hover:shadow-accent-primary/20"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-16/10 overflow-hidden">
                                <Image
                                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?q=80&w=2000'}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Inner Glow Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-surface-bg/80 via-transparent to-transparent opacity-60" />

                                {/* Hover Reveal Actions */}
                                <div className="absolute inset-0 bg-accent-primary/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-20">
                                    <div className="p-4 glass rounded-2xl text-white shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <Eye size={24} />
                                    </div>
                                </div>

                                {/* Quick Badges */}
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    {project.featured && (
                                        <div className="px-3 py-1 glass-deep rounded-lg text-[10px] font-bold text-accent-secondary uppercase tracking-widest border border-accent-secondary/20">
                                            Featured
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-7 relative z-20">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold group-hover:text-accent-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.repoUrl && <Github size={16} className="text-surface-muted hover:text-white transition-colors" />}
                                        {project.demoUrl && <Globe size={16} className="text-surface-muted hover:text-white transition-colors" />}
                                    </div>
                                </div>

                                <p className="text-surface-muted mb-6 line-clamp-2 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xl glass text-accent-secondary border border-accent-secondary/10 group-hover:border-accent-secondary/30 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="px-3 py-1 text-[10px] font-bold text-surface-muted rounded-xl glass">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 border-2 border-accent-primary/0 group-hover:border-accent-primary/20 rounded-[32px] transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Premium Project Dialog */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 lg:p-12 overflow-hidden"
                    >
                        {/* Backdrop with Dynamic Gradient */}
                        <div
                            className="absolute inset-0 bg-surface-bg/60 backdrop-blur-3xl"
                            onClick={() => setSelectedProject(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/20 opacity-40" />
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 100, rotateX: -10 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 100, rotateX: 10 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-7xl bg-surface-bg/80 dark:bg-surface-bg/40 glass-deep rounded-[48px] overflow-hidden shadow-[0_0_150px_-20px_rgba(249,115,22,0.3)] border border-surface-border/20 dark:border-white/10 flex flex-col lg:grid lg:grid-cols-12 h-full lg:h-auto max-h-[90vh]"
                        >
                            {/* Close Button - Floating Premium */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 z-50 group"
                            >
                                <div className="p-4 glass rounded-2xl text-surface-text/50 dark:text-white/50 group-hover:text-surface-text dark:group-hover:text-white group-hover:bg-red-500/10 dark:group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-all duration-300 transform group-hover:rotate-90 group-active:scale-90">
                                    <X size={24} />
                                </div>
                            </button>

                            {/* Left Side: Visual Immersive (7 cols) */}
                            <div className="lg:col-span-12 xl:col-span-7 relative min-h-[350px] lg:min-h-[550px] group bg-surface-bg/50">
                                {/* Blurred Background to Fill Space */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?q=80&w=2000'}
                                        alt=""
                                        fill
                                        className="object-cover blur-2xl opacity-30 dark:opacity-20 scale-110"
                                    />
                                </div>

                                {/* Main Image with contain to avoid cropping */}
                                <div className="relative z-10 w-full h-full p-8 lg:p-12">
                                    <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl border border-white/10">
                                        <Image
                                            src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?q=80&w=2000'}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover lg:object-contain group-hover:scale-[1.02] transition-transform duration-700"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Sophisticated Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg dark:from-surface-bg/80 via-transparent to-transparent pointer-events-none z-20" />
                                <div className="absolute inset-4 border border-surface-text/5 dark:border-white/10 rounded-[40px] pointer-events-none z-20" />

                                {/* Image Badge */}
                                <div className="absolute bottom-10 left-10 space-y-2 z-30">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 shadow-lg">
                                        <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-surface-text dark:text-white/70">Project Visual</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Information (5 cols) */}
                            <div className="lg:col-span-12 xl:col-span-5 p-8 lg:p-14 flex flex-col bg-gradient-to-b from-surface-text/5 dark:from-white/2 to-transparent overflow-y-auto custom-scrollbar">
                                <div className="space-y-12 my-auto">
                                    {/* Project Meta */}
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-2.5">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-secondary bg-accent-secondary/10 px-3 py-1.5 rounded-lg border border-accent-secondary/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-surface-text leading-none tracking-tighter">
                                            {selectedProject.title}
                                        </h3>
                                    </div>

                                    {/* Description with enhanced typography */}
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-lg text-surface-muted leading-relaxed font-medium italic border-l-4 border-accent-primary pl-6 py-2">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Action Grid */}
                                    <div className="grid grid-cols-1 gap-4 pt-4 sm:flex sm:items-center sm:gap-4">
                                        {selectedProject.demoUrl && (
                                            <motion.a
                                                href={selectedProject.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative group overflow-hidden rounded-[20px] flex-1 min-w-[180px]"
                                            >
                                                <div className="absolute inset-0 bg-accent-primary transition-transform duration-500 group-hover:scale-110 shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)]" />
                                                <div className="relative z-10 flex items-center justify-center gap-3 px-8 py-5 text-white font-black uppercase tracking-widest text-[11px]">
                                                    <Globe size={18} />
                                                    Explore Project
                                                </div>
                                            </motion.a>
                                        )}

                                        {selectedProject.repoUrl && (
                                            <motion.a
                                                href={selectedProject.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative group overflow-hidden glass hover:bg-surface-text/5 dark:hover:bg-white/10 border border-surface-text/10 dark:border-white/10 transition-all duration-300 rounded-[20px] flex-1 min-w-[180px]"
                                            >
                                                <div className="relative z-10 flex items-center justify-center gap-3 px-8 py-5 text-surface-text dark:text-white font-black uppercase tracking-widest text-[11px]">
                                                    <Github size={18} />
                                                    View Source
                                                </div>
                                            </motion.a>
                                        )}
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="mt-16 pt-8 border-t border-surface-text/5 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-surface-muted">
                                        <Code2 size={16} className="text-accent-primary" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">High-end architecture</span>
                                    </div>
                                    <div className="text-[10px] font-bold text-surface-muted/40 uppercase tracking-[0.3em]">
                                        © 2025
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsGrid;
