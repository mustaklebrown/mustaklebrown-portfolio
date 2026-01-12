"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createExperience, updateExperience } from "@/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";

// Matches schema in server actions
const formSchema = z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.string().min(1, "Start Date is required"), // Input type date returns string
    endDate: z.string().optional().or(z.literal("")),
    description: z.string().min(1, "Description is required"),
    location: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ExperienceFormProps {
    initialData?: any;
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const formatDate = (date: Date | string | null) => {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    };

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: initialData?.company || "",
            position: initialData?.position || "",
            startDate: formatDate(initialData?.startDate),
            endDate: formatDate(initialData?.endDate),
            description: initialData?.description || "",
            location: initialData?.location || "",
        },
    });

    function onSubmit(data: FormData) {
        setError(null);
        startTransition(async () => {
            try {
                const payload = {
                    ...data,
                    startDate: new Date(data.startDate),
                    endDate: data.endDate ? new Date(data.endDate) : null,
                };

                let result;
                if (initialData) {
                    result = await updateExperience(initialData.id, payload);
                } else {
                    result = await createExperience(payload);
                }

                if (result.success) {
                    router.push("/admin/experience");
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
        <div className="glass p-5 sm:p-8 rounded-3xl border border-white/5 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">{initialData ? 'Edit Experience' : 'New Experience'}</h2>
                {error && <div className="text-red-400 text-sm font-medium bg-red-400/10 px-3 py-1 rounded-lg">{error}</div>}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Company</label>
                        <input
                            {...form.register("company")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                            placeholder="Company Name"
                        />
                        {form.formState.errors.company && <p className="text-red-400 text-xs">{form.formState.errors.company.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Position</label>
                        <input
                            {...form.register("position")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                            placeholder="Job Title"
                        />
                        {form.formState.errors.position && <p className="text-red-400 text-xs">{form.formState.errors.position.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Start Date</label>
                        <input
                            type="date"
                            {...form.register("startDate")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors text-surface-muted dark:text-white [color-scheme:dark]"
                        />
                        {form.formState.errors.startDate && <p className="text-red-400 text-xs">{form.formState.errors.startDate.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">End Date</label>
                        <input
                            type="date"
                            {...form.register("endDate")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors text-surface-muted dark:text-white [color-scheme:dark]"
                        />
                        <p className="text-[10px] text-surface-muted">Leave empty if currently working here</p>
                        {form.formState.errors.endDate && <p className="text-red-400 text-xs">{form.formState.errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Location</label>
                    <input
                        {...form.register("location")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                        placeholder="City, Country"
                    />
                    {form.formState.errors.location && <p className="text-red-400 text-xs">{form.formState.errors.location.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Description</label>
                    <textarea
                        {...form.register("description")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors h-32"
                        placeholder="Roles and responsibilities..."
                    />
                    {form.formState.errors.description && <p className="text-red-400 text-xs">{form.formState.errors.description.message}</p>}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 px-8 py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? 'Update Experience' : 'Create Experience'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
