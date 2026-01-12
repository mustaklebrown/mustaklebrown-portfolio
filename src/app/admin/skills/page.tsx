import { getSkills, deleteSkill } from "@/actions";
import Link from "next/link";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import * as Icons from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage() {
    const { data: skills } = await getSkills();

    // Group skills by category
    const groupedSkills = skills?.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Skills</h1>
                    <p className="text-surface-muted">Manage your technical expertise.</p>
                </div>
                <Link
                    href="/admin/skills/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20 w-fit"
                >
                    <Plus size={18} />
                    <span>Add Skill</span>
                </Link>
            </div>

            <div className="grid gap-10">
                {Object.entries(groupedSkills || {}).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black text-surface-text uppercase tracking-widest">{category}</h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-accent-primary/20 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categorySkills?.map((skill) => {
                                // Dynamic Icon rendering
                                const IconComponent = (Icons as any)[skill.icon || ''] || Icons.Circle;

                                return (
                                    <div
                                        key={skill.id}
                                        className="glass p-4 sm:p-5 rounded-2xl border border-surface-border hover:border-accent-primary/20 transition-all group flex items-center justify-between gap-4 shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="p-2.5 rounded-xl bg-accent-primary/10 text-accent-primary shrink-0">
                                                <IconComponent size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-surface-text truncate mb-1">{skill.name}</h3>
                                                {skill.proficiency && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1 bg-surface-bg rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-accent-primary rounded-full transition-all duration-500"
                                                                style={{ width: `${skill.proficiency}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-surface-muted italic">{skill.proficiency}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all">
                                            <Link
                                                href={`/admin/skills/${skill.id}`}
                                                className="p-2 rounded-lg hover:bg-surface-bg text-surface-muted hover:text-accent-primary transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <form action={async () => {
                                                "use server";
                                                await deleteSkill(skill.id);
                                            }}>
                                                <button className="p-2 rounded-lg hover:bg-surface-bg text-surface-muted hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {(!skills || skills.length === 0) && (
                    <div className="p-16 text-center glass rounded-[40px] border border-surface-border border-dashed shadow-inner">
                        <div className="w-16 h-16 bg-surface-text/5 rounded-full flex items-center justify-center mx-auto mb-6 text-surface-muted">
                            <Wrench size={32} />
                        </div>
                        <p className="text-surface-muted mb-8 font-medium italic">No skills found. Start building your portfolio!</p>
                        <Link
                            href="/admin/skills/new"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent-primary/20"
                        >
                            <Plus size={18} />
                            <span>Add First Skill</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
