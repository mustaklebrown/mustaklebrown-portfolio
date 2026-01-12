import { getProjects, deleteProject, toggleProjectFeatured } from "@/actions";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star, ExternalLink, Github, FolderGit2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const { data: projects } = await getProjects();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Projects</h1>
                    <p className="text-surface-muted">Manage your project showcase.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-xl font-medium transition-all shadow-lg shadow-accent-primary/20"
                >
                    <Plus size={18} />
                    <span>Add Project</span>
                </Link>
            </div>

            <div className="grid gap-4">
                {projects?.map((project) => (
                    <div
                        key={project.id}
                        className="glass p-6 rounded-3xl border border-surface-border hover:border-accent-primary/20 transition-all group flex flex-col md:flex-row gap-6 items-start md:items-center shadow-lg hover:shadow-xl"
                    >
                        {/* Image / Icon */}
                        <div className="w-full md:w-24 h-24 rounded-2xl bg-surface-bg border border-surface-border flex items-center justify-center overflow-hidden shrink-0 relative">
                            {project.imageUrl ? (
                                <Image width={400} height={400} src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <FolderGit2 size={32} className="text-surface-muted" />
                            )}
                            {project.featured && (
                                <div className="absolute top-2 right-2 text-orange-500 bg-surface-bg/80 dark:bg-black/50 rounded-full p-1.5 backdrop-blur-sm shadow-md">
                                    <Star size={12} fill="currentColor" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold truncate text-surface-text">{project.title}</h3>
                                {project.featured && (
                                    <span className="text-[10px] font-black bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full border border-orange-500/20 uppercase tracking-widest">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-surface-muted line-clamp-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-surface-card border border-surface-border text-surface-muted uppercase tracking-tight">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-surface-border justify-end">
                            {/* Toggle Featured Form Action */}
                            <form action={async () => {
                                "use server";
                                await toggleProjectFeatured(project.id);
                            }}>
                                <button
                                    title="Toggle Featured"
                                    className={`p-3 rounded-xl transition-all border shadow-sm ${project.featured ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' : 'bg-surface-bg border-surface-border text-surface-muted hover:text-orange-500 hover:bg-orange-500/5'}`}
                                >
                                    <Star size={18} fill={project.featured ? "currentColor" : "none"} />
                                </button>
                            </form>

                            <Link
                                href={`/admin/projects/${project.id}`}
                                title="Edit"
                                className="p-3 rounded-xl bg-surface-bg border border-surface-border text-surface-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all shadow-sm"
                            >
                                <Pencil size={18} />
                            </Link>

                            <form action={async () => {
                                "use server";
                                await deleteProject(project.id);
                            }}>
                                <button
                                    title="Delete"
                                    className="p-3 rounded-xl bg-surface-bg border border-surface-border text-surface-muted hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {(!projects || projects.length === 0) && (
                    <div className="p-16 text-center glass rounded-[40px] border border-surface-border border-dashed shadow-inner">
                        <div className="w-16 h-16 bg-surface-text/5 rounded-full flex items-center justify-center mx-auto mb-6 text-surface-muted">
                            <FolderGit2 size={32} />
                        </div>
                        <p className="text-surface-muted mb-8 font-medium italic">No projects found. Start building your portfolio!</p>
                        <Link
                            href="/admin/projects/new"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent-primary/20"
                        >
                            <Plus size={18} />
                            <span>Add First Project</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
