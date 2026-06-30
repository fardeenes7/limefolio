"use client";

import { motion } from "motion/react";
import { 
    LightningIcon, 
    PaletteIcon, 
    ChartLineUpIcon, 
    GlobeIcon, 
    LinkIcon, 
    CheckCircleIcon, 
    DeviceMobileCameraIcon, 
    CodeIcon, 
    TextAaIcon 
} from "@phosphor-icons/react";


const features = [
    {
        title: "Lightning Fast",
        description: "Built on Next.js App Router for instant page loads and perfect Lighthouse scores. We sweat the performance details so you don't have to.",
        icon: <LightningIcon weight="duotone" className="w-8 h-8 text-primary" />,
        colSpan: "md:col-span-2",
        bg: "bg-muted"
    },
    {
        title: "30+ Color Themes",
        description: "Switch your entire brand identity in one click. From stark minimal to vibrant neon.",
        icon: <PaletteIcon weight="duotone" className="w-8 h-8 text-primary" />,
        colSpan: "md:col-span-1",
        bg: "bg-muted"
    },
    {
        title: "GDPR Analytics",
        description: "Privacy-first analytics built-in. Know who is viewing your work without invading their privacy.",
        icon: <ChartLineUpIcon weight="duotone" className="w-8 h-8 text-primary" />,
        colSpan: "md:col-span-1",
        bg: "bg-muted"
    },
    {
        title: "Custom Domains",
        description: "Connect your own domain or use our premium free subdomains. SSL certificates included automatically.",
        icon: <GlobeIcon weight="duotone" className="w-8 h-8 text-primary" />,
        colSpan: "md:col-span-2",
        bg: "bg-muted"
    },
];

const listFeatures = [
    { name: "Rich Animations", icon: <CodeIcon weight="bold" /> },
    { name: "Responsive Everywhere", icon: <DeviceMobileCameraIcon weight="bold" /> },
    { name: "Custom SEO Metadata", icon: <TextAaIcon weight="bold" /> },
    { name: "Trackable Links", icon: <LinkIcon weight="bold" /> },
    { name: "Lower Pricing", icon: <CheckCircleIcon weight="bold" /> },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-dvh pt-32 pb-24 bg-background selection:bg-primary/20">
            <div className="container px-4 max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]"
                    >
                        Everything you need.<br/>
                        <span className="text-muted-foreground italic">Nothing you don't.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                    >
                        Limefolio was engineered specifically for creatives. We stripped away the bloat of generic website builders and focused entirely on the features that help you win clients.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`${feature.colSpan} ${feature.bg} rounded-3xl p-8 md:p-12 relative overflow-hidden group border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500`}
                        >
                            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                                <div className="bg-background/80 backdrop-blur p-4 rounded-2xl w-fit shadow-sm border border-border/50 text-foreground group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-[40ch]">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Decorative ambient gradient */}
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* More Features List */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-12">
                        And the details that matter.
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {listFeatures.map((item, i) => (
                            <div 
                                key={i}
                                className="flex items-center gap-3 px-6 py-4 rounded-full bg-muted/50 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 hover:bg-muted transition-all cursor-default"
                            >
                                <span className="text-primary">{item.icon}</span>
                                <span className="font-medium text-foreground">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
