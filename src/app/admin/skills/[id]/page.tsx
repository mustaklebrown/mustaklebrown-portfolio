import { getSkillById } from "@/actions";
import { SkillForm } from "@/components/admin/skill-form";
import { notFound } from "next/navigation";

export default async function EditSkillPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const result = await getSkillById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Edit Skill</h1>
                <p className="text-surface-muted">Update skill details.</p>
            </div>
            <SkillForm initialData={result.data} />
        </div>
    );
}
