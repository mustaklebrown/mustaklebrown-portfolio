"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed top-6 right-6 z-[100] p-3 glass rounded-2xl hover:scale-110 active:scale-95 transition-all group border border-surface-border bg-surface-card/50 backdrop-blur-md shadow-lg"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-orange-400 group-hover:rotate-45 transition-transform duration-500" />
            ) : (
                <Moon className="w-5 h-5 text-accent-primary group-hover:-rotate-12 transition-transform duration-500" />
            )}
        </button>
    )
}
