"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code2, Palette, Rocket, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/Hero";
import Services from "@/components/services";

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Home() {
    return (
        <div className="flex flex-col pr-4 pl-4 container mx-auto pt-10">

            {/* Hero Section */}
            <Hero />
            <Services />


        </div>
    );
}
