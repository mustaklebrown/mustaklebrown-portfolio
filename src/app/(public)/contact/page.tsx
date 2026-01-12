"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section className="min-h-screen py-20 lg:py-0 flex items-center justify-center relative">
            {/* Background Glows - matching Hero */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-tertiary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gradient-brand inline-block">Get In Touch</h2>
                            <p className="text-surface-muted text-base md:text-lg">
                                Have a project in mind? Let's talk.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email', value: 'hello@mustak.dev' },
                                { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
                                { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-accent-primary/5 transition-all group">
                                    <div className="p-2.5 bg-accent-primary/10 rounded-xl text-accent-primary group-hover:scale-110 transition-transform">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-surface-muted uppercase tracking-widest mb-0.5">{item.label}</p>
                                        <p className="text-sm md:text-base font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4 md:space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-surface-muted uppercase tracking-widest">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent-secondary transition-all focus:bg-surface-bg/50 placeholder:text-surface-muted/50"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-surface-muted uppercase tracking-widest">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent-secondary transition-all focus:bg-surface-bg/50 placeholder:text-surface-muted/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-surface-muted uppercase tracking-widest">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full bg-surface-bg/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent-secondary transition-all focus:bg-surface-bg/50 placeholder:text-surface-muted/50"
                                placeholder="Message..."
                            />
                        </div>
                        <button className="w-full py-4 bg-accent-primary rounded-2xl font-bold text-white shadow-lg shadow-accent-primary/20 hover:bg-accent-primary-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group">
                            Send Message
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
export default Contact;
