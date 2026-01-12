import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/shared/sidenav";
import { ThemeToggle } from "@/components/shared/theme-toggle";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mustaklebrown-portfolio.vercel.app/'),
    title: "Mustak Lebrown - Creative Developer Portfolio",
    description: "Personal portfolio of Mustak Lebrown, a creative web developer specialized in modern web technologies, premium UI design, and interactive experiences.",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
    openGraph: {
        title: "Mustak Lebrown - Creative Developer Portfolio",
        description: "Explore the works and expertise of Mustak Lebrown, featuring premium web applications and creative designs.",
        url: "https://mustaklebrown-portfolio.vercel.app/", // Update to actual URL if known
        siteName: "Mustak Lebrown Portfolio",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Mustak Lebrown Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mustak Lebrown - Creative Developer Portfolio",
        description: "Creative web developer specialized in modern web technologies and premium UI design.",
        images: ["/logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-surface-bg text-surface-text selection:bg-accent-primary/30 transition-colors duration-500 relative">
                        {/* Background Image & Overlays */}
                        <div className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10 dark:opacity-20 transition-opacity duration-700" />
                        <div className="fixed inset-0 z-0 bg-gradient-to-br from-surface-bg via-surface-bg/90 to-accent-primary/10 transition-colors duration-700" />

                        {/* Content */}
                        <div className="relative z-10">
                            <ThemeToggle />

                            <main className="w-full min-h-screen relative overflow-hidden">
                                {children}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
