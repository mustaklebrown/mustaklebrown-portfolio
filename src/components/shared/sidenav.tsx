"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Home, FolderGit2, User, Mail, LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    id: string;
    label: string;
    path: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '/', icon: Home },
    { id: 'projects', label: 'Projects', path: '/projects', icon: FolderGit2 },
    { id: 'about', label: 'About', path: '/about', icon: User },
    { id: 'contact', label: 'Contact', path: '/contact', icon: Mail },
];

const SideNav: React.FC = () => {

    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-8 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 z-50">
            <nav className="flex flex-row lg:flex-col gap-2 md:gap-4 lg:gap-6 p-2 md:p-3 lg:p-4 glass-deep rounded-full shadow-2xl items-center">
                {navItems.map((item) => {
                    const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={
                                clsx(
                                    'relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-500 group',
                                    isActive
                                        ? 'bg-accent-primary shadow-lg shadow-accent-primary/40 text-white scale-110'
                                        : 'text-surface-muted hover:text-accent-primary hover:bg-accent-primary/5'
                                )
                            }
                        >
                            {/* Icon */}
                            <item.icon className="w-5 h-5 md:w-[22px] md:h-[22px] relative z-10 transition-transform duration-300 group-hover:scale-110" />

                            {/* Floating Label (Desktop Only) */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="hidden lg:block absolute left-full ml-6 px-4 py-2 glass rounded-xl text-sm font-semibold whitespace-nowrap text-surface-text opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 shadow-xl"
                            >
                                <div className="relative">
                                    {item.label}
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-3 h-3 bg-inherit border-l border-b border-inherit rotate-45" />
                                </div>
                            </motion.div>

                            {/* Active Indicator Glow */}
                            <div className={clsx(
                                "absolute inset-0 rounded-full transition-colors duration-500",
                                isActive ? "bg-accent-primary/0" : "bg-accent-primary/0 group-hover:bg-accent-primary/5"
                            )} />
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default SideNav;