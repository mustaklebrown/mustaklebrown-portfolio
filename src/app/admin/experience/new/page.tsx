import { ExperienceForm } from "@/components/admin/experience-form";

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Add Experience</h1>
                <p className="text-surface-muted">Add a new role to your timeline.</p>
            </div>
            <ExperienceForm />
        </div>
    );
}
