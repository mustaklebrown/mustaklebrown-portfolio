import { getProjectById } from "@/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const result = await getProjectById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
                <p className="text-surface-muted">Update project details.</p>
            </div>
            <ProjectForm initialData={result.data} />
        </div>
    );
}
