import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    © {new Date().getFullYear()} Mustak. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
