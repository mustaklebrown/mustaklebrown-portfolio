
"use client"
import { services } from '../constant/data'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

const Services = () => {
    return (
        <section id="services" className="py-10 px-4 md:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent-primary/5 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-secondary/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-accent-secondary text-sm font-semibold uppercase tracking-widest bg-accent-secondary/10 px-4 py-1.5 rounded-full">
                            What I Offer
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Premium <span className="text-gradient-brand">Digital Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-surface-muted max-w-2xl mx-auto text-lg"
                    >
                        I combine technical expertise with creative vision to deliver solutions that are not just functional, but exceptional.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Icon = (Icons as any)[service.icon] || Icons.Code;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-8 glass-vibrant rounded-3xl border border-surface-border hover:border-accent-secondary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-secondary/10 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>

                                <div className="relative z-10 space-y-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-accent-secondary/20 to-accent-tertiary/20 rounded-2xl flex items-center justify-center text-accent-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:from-accent-secondary group-hover:to-accent-tertiary group-hover:text-white shadow-lg">
                                        <Icon size={28} />
                                    </div>

                                    <h3 className="text-xl font-bold group-hover:text-accent-secondary transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-surface-muted text-sm leading-relaxed group-hover:text-surface-text/80 transition-colors">
                                        {service.desc}
                                    </p>

                                    <div className="pt-4 flex items-center gap-2 text-accent-secondary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                        Learn more <Icons.ChevronRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
