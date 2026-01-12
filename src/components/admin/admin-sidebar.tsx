"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderGit2, Briefcase, Wrench, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo area */}
            <div className="p-8 border-b border-surface-border flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-lg group-hover:shadow-accent-primary/20 transition-all duration-300">
                        <Image width={50} height={50} src="/logo.png" alt="Mustak Lebrown" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight text-surface-text">Admin</h1>
                        <p className="text-xs text-surface-muted">Portfolio Manager</p>
                    </div>
                </Link>
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-2 text-surface-muted hover:text-surface-text transition-colors"
                >
                    <X size={24} />
                </button>
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
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 glass-deep border-r border-surface-border hidden lg:flex flex-col z-50">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-surface-border z-[60] flex items-center px-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 text-surface-muted hover:text-accent-primary transition-all active:scale-95"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
                <div className="flex-1 flex justify-center lg:justify-start pr-10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Image width={32} height={32} src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                        <span className="font-bold text-lg tracking-tight">Admin</span>
                    </Link>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-screen w-[280px] bg-surface-bg glass-deep border-r border-surface-border z-[80] lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

// Mobile Toggle (Can be added later or integrated into a top bar)
