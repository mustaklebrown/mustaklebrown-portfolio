import { getExperiences, deleteExperience } from "@/actions";
import Link from "next/link";
import { Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminExperiencePage() {
    const { data: experiences } = await getExperiences();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Experience</h1>
                    <p className="text-surface-muted">Manage your professional timeline.</p>
                </div>
                <Link
                    href="/admin/experience/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-xl font-medium transition-all shadow-lg shadow-accent-primary/20"
                >
                    <Plus size={18} />
                    <span>Add Experience</span>
                </Link>
            </div>

            <div className="space-y-6 relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-surface-border hidden md:block" />

                {experiences?.map((exp) => (
                    <div
                        key={exp.id}
                        className="glass p-6 rounded-3xl border border-surface-border hover:border-accent-primary/20 transition-all group flex flex-col md:flex-row gap-6 relative md:ml-12 shadow-lg hover:shadow-xl"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[31px] top-8 w-4 h-4 rounded-full bg-accent-primary border-4 border-surface-bg hidden md:block shadow-lg shadow-accent-primary/50" />

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-surface-text">{exp.position}</h3>
                                    <div className="text-accent-secondary font-black uppercase text-xs tracking-widest">{exp.company}</div>
                                </div>
                                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-surface-muted">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border">
                                        <Calendar size={14} className="text-accent-primary" />
                                        <span>
                                            {new Date(exp.startDate).getFullYear()} -
                                            {exp.endDate ? new Date(exp.endDate).getFullYear() : " Present"}
                                        </span>
                                    </div>
                                    {exp.location && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border">
                                            <MapPin size={14} className="text-accent-primary" />
                                            <span>{exp.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-surface-muted leading-relaxed whitespace-pre-wrap pt-4 border-t border-surface-border mt-4">
                                {exp.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:self-start pt-2">
                            <Link
                                href={`/admin/experience/${exp.id}`}
                                title="Edit"
                                className="p-3 rounded-xl bg-surface-card border border-surface-border text-surface-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all shadow-sm"
                            >
                                <Pencil size={18} />
                            </Link>

                            <form action={async () => {
                                "use server";
                                await deleteExperience(exp.id);
                            }}>
                                <button
                                    title="Delete"
                                    className="p-3 rounded-xl bg-surface-card border border-surface-border text-surface-muted hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
