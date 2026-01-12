"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProject, updateProject, type ProjectFormData, projectSchema } from "@/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Plus, X, Save } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface ProjectFormValues {
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
    tags?: string[];
    featured?: boolean;
}

interface ProjectFormProps {
    initialData?: any;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            content: initialData?.content || "",
            imageUrl: initialData?.imageUrl || "",
            demoUrl: initialData?.demoUrl || "",
            repoUrl: initialData?.repoUrl || "",
            tags: initialData?.tags || [],
            featured: initialData?.featured || false,
        },
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        // @ts-ignore - react-hook-form typing quirk with simple arrays
        control: form.control,
        name: "tags" as never,
    });

    // Tag input state management
    const [tagInput, setTagInput] = useState("");

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            // @ts-ignore
            appendTag(tagInput.trim());
            setTagInput("");
        }
    };


    function onSubmit(data: ProjectFormValues) {
        setError(null);
        startTransition(async () => {
            try {
                let result;
                if (initialData) {
                    result = await updateProject(initialData.id, data as any);
                } else {
                    result = await createProject(data as any);
                }

                if (result.success) {
                    router.push("/admin/projects");
                    router.refresh();
                } else {
                    setError(result.error as string);
                }
            } catch (e) {
                setError("An unexpected error occurred.");
            }
        });
    }

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        form.setValue('title', title);
        if (!initialData) { // Only auto-update slug on create
            form.setValue('slug', slug);
        }
    };

    return (
        <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">{initialData ? 'Edit Project' : 'New Project'}</h2>
                {error && <div className="text-red-400 text-sm font-medium bg-red-400/10 px-3 py-1 rounded-lg">{error}</div>}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Title</label>
                        <input
                            {...form.register("title")}
                            onChange={handleTitleChange}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors"
                            placeholder="Project Title"
                        />
                        {form.formState.errors.title && <p className="text-red-400 text-xs">{form.formState.errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Slug</label>
                        <input
                            {...form.register("slug")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors font-mono text-sm"
                            placeholder="project-slug"
                        />
                        {form.formState.errors.slug && <p className="text-red-400 text-xs">{form.formState.errors.slug.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Description</label>
                    <textarea
                        {...form.register("description")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors h-24"
                        placeholder="Short description for the card view..."
                    />
                    {form.formState.errors.description && <p className="text-red-400 text-xs">{form.formState.errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Content (Markdown)</label>
                    <textarea
                        {...form.register("content")}
                        className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors h-64 font-mono text-sm"
                        placeholder="# Project Details..."
                    />
                    {form.formState.errors.content && <p className="text-red-400 text-xs">{form.formState.errors.content.message}</p>}
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-widest">Project Cover Image</label>
                    <ImageUpload
                        value={form.watch("imageUrl") || ""}
                        onChange={(url) => form.setValue("imageUrl", url)}
                        onRemove={() => form.setValue("imageUrl", "")}
                    />
                    {form.formState.errors.imageUrl && <p className="text-red-400 text-xs">{form.formState.errors.imageUrl.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Demo URL</label>
                        <input
                            {...form.register("demoUrl")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors text-sm"
                            placeholder="https://..."
                        />
                        {form.formState.errors.demoUrl && <p className="text-red-400 text-xs">{form.formState.errors.demoUrl.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Repo URL</label>
                        <input
                            {...form.register("repoUrl")}
                            className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus:border-accent-primary focus:outline-none transition-colors text-sm"
                            placeholder="https://github.com/..."
                        />
                        {form.formState.errors.repoUrl && <p className="text-red-400 text-xs">{form.formState.errors.repoUrl.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-muted uppercase tracking-wider">Tags</label>
                    <div className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 focus-within:border-accent-primary transition-colors flex flex-wrap gap-2 min-h-[50px]">
                        {form.watch("tags")?.map((tag, index) => (
                            <span key={index} className="flex items-center gap-1 bg-accent-primary/20 text-accent-primary px-2 py-1 rounded-md text-xs font-medium">
                                {tag}
                                <button type="button" onClick={() => {
                                    const currentTags = form.getValues("tags") || [];
                                    form.setValue("tags", currentTags.filter((_, i) => i !== index));
                                }} className="hover:text-white"><X size={12} /></button>
                            </span>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (tagInput.trim()) {
                                        const currentTags = form.getValues("tags") || [];
                                        form.setValue("tags", [...currentTags, tagInput.trim()]);
                                        setTagInput("");
                                    }
                                }
                            }}
                            className="bg-transparent outline-none flex-1 min-w-[100px] text-sm"
                            placeholder="Type tag & press Enter..."
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            {...form.register("featured")}
                            className="w-5 h-5 rounded border-white/20 bg-surface-bg/30 checked:bg-accent-secondary"
                        />
                        <span className="font-medium group-hover:text-accent-secondary transition-colors">Featured Project</span>
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 px-8 py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? 'Update Project' : 'Create Project'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
