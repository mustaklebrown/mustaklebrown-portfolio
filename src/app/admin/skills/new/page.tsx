import { SkillForm } from "@/components/admin/skill-form";

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Add Skill</h1>
                <p className="text-surface-muted">Add a new technical skill.</p>
            </div>
            <SkillForm />
        </div>
    );
}
