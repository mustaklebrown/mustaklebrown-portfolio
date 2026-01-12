import { getExperienceById } from "@/actions";
import { ExperienceForm } from "@/components/admin/experience-form";
import { notFound } from "next/navigation";

export default async function EditExperiencePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const result = await getExperienceById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Edit Experience</h1>
                <p className="text-surface-muted">Update role details.</p>
            </div>
            <ExperienceForm initialData={result.data} />
        </div>
    );
}
