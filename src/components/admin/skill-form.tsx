"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSkill, updateSkill } from "@/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    icon: z.string().optional(),
    proficiency: z.number().min(0).max(100).optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface SkillFormProps {
    initialData?: any;
}

const CATEGORIES = ["Frontend", "Backend", "Tools", "Design", "Other"];

export function SkillForm({ initialData }: SkillFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            category: initialData?.category || "",
            icon: initialData?.icon || "",
            proficiency: initialData?.proficiency ?? 0,
        },
    });

    function onSubmit(data: FormData) {
        setError(null);
        startTransition(async () => {
            try {
                let result;
                if (initialData) {
                    result = await updateSkill(initialData.id, data);
                } else {
                    result = await createSkill(data);
                }

                if (result.success) {
                    router.push("/admin/skills");
                    router.refresh();
                } else {
                    setError(result.error as string);
                }
            } catch (e) {
                setError("An unexpected error occurred.");
            }
        });
    }

    return (
        <div className="glass p-5 sm:p-8 rounded-3xl border border-white/5 space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">{initialData ? 'Edit Skill' : 'New Skill'}</h2>
                {error && <div className="text-red-400 text-sm font-medium bg-red-400/10 px-3 py-1 rounded-lg">{error}</div>}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Skill Name</label>
                    <input
                        {...form.register("name")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                        placeholder="e.g. React"
                    />
                    {form.formState.errors.name && <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Category</label>
                    <div className="relative">
                        <input
                            list="categories"
                            {...form.register("category")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                            placeholder="Select or type..."
                        />
                        <datalist id="categories">
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                    </div>
                    {form.formState.errors.category && <p className="text-red-400 text-xs">{form.formState.errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Icon Name (Lucide)</label>
                    <input
                        {...form.register("icon")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                        placeholder="e.g. Code2"
                    />
                    {form.formState.errors.icon && <p className="text-red-400 text-xs">{form.formState.errors.icon.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Proficiency (%)</label>
                    <input
                        type="number"
                        {...form.register("proficiency", { valueAsNumber: true })}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                        placeholder="0-100"
                        min="0"
                        max="100"
                    />
                    {form.formState.errors.proficiency && <p className="text-red-400 text-xs">{form.formState.errors.proficiency.message}</p>}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 px-8 py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? 'Update Skill' : 'Create Skill'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
