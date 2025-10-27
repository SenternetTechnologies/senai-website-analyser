import React from 'react';

const Feature: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-slate-800 rounded-lg border border-slate-700">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-slate-400 text-sm">{description}</p>
        </div>
    </div>
);


export const WelcomeScreen: React.FC = () => {
    return (
        <div className="text-center py-10 px-4">
            <h2 className="text-3xl font-bold text-white mb-3">Welcome to Sen Ai Website Analyser</h2>
            <p className="max-w-2xl mx-auto text-slate-400 mb-10">
                Enter a website URL above to begin. Our tool, powered by Senternet Technologies, will conduct a comprehensive analysis and provide you with actionable insights to boost your site's performance and search ranking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
                <Feature 
                    title="On-Page SEO Audit"
                    description="Analyse title tags, meta descriptions, header structure, and more critical on-page elements."
                    icon={<IconSeo className="w-6 h-6 text-brand-primary"/>}
                />
                <Feature 
                    title="Off-Page Insights"
                    description="Get a conceptual understanding of your backlink profile, domain authority, and social media signals."
                    icon={<IconGlobe className="w-6 h-6 text-brand-primary"/>}
                />
                <Feature 
                    title="Content Evaluation"
                    description="Assess content readability, keyword relevance, and the effectiveness of your calls-to-action."
                    icon={<IconDocument className="w-6 h-6 text-brand-primary"/>}
                />
                <Feature 
                    title="Performance Metrics"
                    description="Receive recommendations on image optimization, caching, and other factors vital for site speed."
                    icon={<IconBolt className="w-6 h-6 text-brand-primary"/>}
                />
            </div>
        </div>
    );
};

const IconSeo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
    </svg>
);

const IconGlobe = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const IconDocument = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const IconBolt = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);