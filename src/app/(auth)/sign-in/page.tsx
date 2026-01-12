"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Loader2, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authClient.signIn.email({
                email,
                password,
                callbackURL: '/admin',
            });
        } catch (err: any) {
            setError(err.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid items-center justify-center p-6 bg-surface-bg relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px] relative z-10"
            >
                <div className="glass-deep p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
                    <div className="space-y-2 text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-white rounded-[24px] mx-auto mb-6 flex items-center justify-center shadow-lg shadow-accent-primary/20 p-2"
                        >
                            <Image src="/logo.png" alt="Mustak Lebrown" width={50} height={50} className="w-full h-full object-contain" />
                        </motion.div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-surface-text">
                            Welcome <span className="text-gradient-brand">Back</span>
                        </h1>
                        <p className="text-surface-muted text-sm font-medium">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted group-focus-within:text-accent-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-accent-primary hover:text-accent-primary-hover transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted group-focus-within:text-accent-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-sm font-semibold text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white font-bold rounded-2xl shadow-lg shadow-accent-primary/20 transition-all active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-surface-muted text-xs font-medium">
                            Don't have an account?{' '}
                            <Link href="/sign-up" className="text-accent-secondary font-bold hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
