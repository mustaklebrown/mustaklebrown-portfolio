import React from 'react';
import { getProjects } from '@/actions/project.actions';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

const ProjectsPage = async () => {
    const { data: projects = [] } = await getProjects();

    return (
        <section className="relative py-24 overflow-hidden min-h-screen">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Immersive Glows */}
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-accent-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-accent-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
                <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-accent-tertiary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-to-b,white,transparent] opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/5 animate-bounce-slow">
                        <div className="w-2 h-2 bg-accent-secondary rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-surface-muted">My Portfolio</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
                        Featured <span className="text-gradient-brand">Projects</span>
                    </h2>
                    <p className="text-surface-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A collection of digital products, experiments, and high-performance web applications built with precision.
                    </p>
                </div>

                <ProjectsGrid projects={projects || []} />
            </div>
        </section>
    );
};

export default ProjectsPage;
