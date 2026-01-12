import { services } from '../../constant/data'
import { Github, Linkedin, Mail, Award } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className="h-screen py-12 lg:py-0 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-secondary/20 dark:bg-accent-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-tertiary/20 dark:bg-accent-tertiary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Profile Image Section */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="relative">
                            <div className="w-56 h-56 md:w-72 lg:w-[380px] lg:h-[380px] border-4 border-accent-secondary/30 rounded-3xl flex items-center justify-center glass-vibrant transform hover:rotate-3 transition-transform duration-300 overflow-hidden shadow-2xl">
                                <div className="relative w-full h-full p-8 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10 rounded-3xl">
                                    <Image
                                        src="/logo.png"
                                        alt="Mustak Lebrown"
                                        fill
                                        priority
                                        className="object-contain p-4 drop-shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/40 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Floating Experience Badge */}
                            <motion.div
                                animate={{
                                    y: [0, -15]
                                }}
                                transition={{
                                    y: {
                                        duration: 0.8,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeOut"
                                    }
                                }}
                                className="absolute -top-4 -right-4 md:-top-8 md:-right-8 z-20 glass-deep p-3 md:p-4 rounded-2xl flex items-center gap-2 hover:scale-110 transition-transform cursor-default group"
                            >
                                <div className="p-1.5 bg-accent-primary/20 rounded-lg text-accent-primary group-hover:bg-accent-primary/30 transition-colors">
                                    <Award size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg md:text-xl font-bold text-gradient-brand leading-none">3+</span>
                                    <span className="text-[8px] md:text-[10px] font-semibold text-surface-muted uppercase tracking-wider">Years Exp.</span>
                                </div>
                            </motion.div>

                            {/* Decorative Background Border */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 border-2 border-accent-tertiary/20 rounded-3xl transform rotate-12 -z-10 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 md:space-y-5">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 bg-accent-secondary rounded-full animate-pulse"></div>
                                <span className="text-accent-secondary text-[10px] md:text-xs font-medium uppercase tracking-widest">Available for work</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                Creative
                                <br />
                                <span className="text-gradient-brand">
                                    Developer
                                </span>
                            </h1>
                        </div>

                        <div className="space-y-1.5 text-surface-muted">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-0.5 bg-gradient-to-r from-accent-secondary to-transparent mt-2.5"></div>
                                <p className="text-sm md:text-base lg:text-lg">Building exceptional digital experiences</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-0.5 bg-gradient-to-r from-accent-tertiary to-transparent mt-2.5"></div>
                                <p className="text-sm md:text-base lg:text-lg">Specialized in modern web technologies</p>
                            </div>
                        </div>

                        {/* Quick Services - Compact */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            {services.map((service, index) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const Icon = (Icons as any)[service.icon] || Icons.Code;
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-3 glass rounded-xl hover:border-accent-secondary/50 transition-all cursor-pointer group flex items-start gap-2.5"
                                    >
                                        <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-accent-secondary/10 to-accent-tertiary/10 rounded-lg flex items-center justify-center text-accent-secondary group-hover:from-accent-secondary group-hover:to-accent-tertiary group-hover:text-white transition-all">
                                            <Icon size={16} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-xs truncate">{service.title}</h3>
                                            <p className="text-[10px] text-surface-muted truncate uppercase tracking-tight">Active Service</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-3">
                            {[
                                { icon: Github, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Mail, href: "#" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="p-2.5 glass rounded-xl hover:bg-accent-secondary/20 transition-all hover:scale-110 border border-surface-border">
                                    <social.icon className="w-4 h-4 text-surface-text" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero