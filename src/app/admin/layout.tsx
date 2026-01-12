import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin Dashboard | Mustak Portfolio",
    description: "Manage portfolio content",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/sign-in");
    }

    if (session.user.role !== "admin") {
        return redirect("/");
    }

    return (
        <div className="min-h-screen bg-surface-bg text-surface-text selection:bg-accent-primary/30 transition-colors duration-500 relative">
            {/* Background Image & Overlays (Similar to main site but maybe distinct tone if desired, keeping same for consistency) */}
            <div className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-5 dark:opacity-10 transition-opacity duration-700 hue-rotate-15" />
            {/* Added hue-rotate to distinguish slightly */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-surface-bg via-surface-bg/95 to-accent-primary/5 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen overflow-x-hidden w-full">
                <AdminSidebar />

                <main className="flex-1 w-full lg:pl-64 pt-16 lg:pt-0 min-h-screen relative overflow-x-hidden">
                    <div className="px-4 py-8 sm:p-8 lg:p-12 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
