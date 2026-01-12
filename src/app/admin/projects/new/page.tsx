import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
                <p className="text-surface-muted">Showcase your latest work.</p>
            </div>
            <ProjectForm />
        </div>
    );
}
