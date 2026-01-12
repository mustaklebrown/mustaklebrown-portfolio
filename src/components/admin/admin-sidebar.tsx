"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderGit2, Briefcase, Wrench, LogOut, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const sidebarItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills", href: "/admin/skills", icon: Wrench },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-deep border-r border-surface-border hidden lg:flex flex-col z-50">
            {/* Logo area */}
            <div className="p-8 border-b border-surface-border">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-lg group-hover:shadow-accent-primary/20 transition-all duration-300">
                        <Image width={50} height={50} src="/logo.png" alt="Mustak Lebrown" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight text-surface-text">Admin</h1>
                        <p className="text-xs text-surface-muted">Portfolio Manager</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold text-surface-muted uppercase tracking-widest px-4 py-2 opacity-50">Menu</div>
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                                isActive
                                    ? "text-white shadow-lg"
                                    : "text-surface-muted hover:text-surface-text hover:bg-surface-text/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-accent-primary rounded-xl -z-10 shadow-[0_4px_12px_rgba(249,115,22,0.3)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon size={20} className={cn("relative z-10", isActive ? "text-white" : "group-hover:text-accent-primary transition-colors")} />
                            <span className="relative z-10 font-bold text-sm tracking-tight">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-surface-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-300">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

// Mobile Toggle (Can be added later or integrated into a top bar)
