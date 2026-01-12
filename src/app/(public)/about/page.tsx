
import React from 'react';
import { getSkills } from '@/actions/skill.actions';
import { getExperiences } from '@/actions/experience.actions';
import AboutClient from '@/components/about/AboutClient';
import AboutHero from '@/components/about/AboutHero';

const AboutPage = async () => {
    const { data: skills = [] } = await getSkills();
    const { data: experiences = [] } = await getExperiences();

    // Helper to format Date objects if they come back as strings or plain objects from the server action
    const formattedExperiences = experiences?.map(exp => ({
        ...exp,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : null
    })) || [];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-tertiary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full px-6 md:px-12 py-24">
                {/* Hero / Intro Section */}
                <AboutHero />

                {/* Animated Sections Component */}
                <AboutClient
                    skills={skills || []}
                    experiences={formattedExperiences}
                />
            </div>
        </div>
    );
};

export default AboutPage;
