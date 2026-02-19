import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";
import { Separator } from "@/components/ui/separator";
import {
    IconBrandX,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

const footerLinks = [
    {
        label: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Changelog", href: "/changelog" },
        ],
    },
    {
        label: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Templates", href: "/templates" },
            { label: "Blog", href: "/blog" },
            { label: "Support", href: "/support" },
        ],
    },
    {
        label: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

const socialLinks = [
    { label: "X (Twitter)", href: "https://x.com/limefolio", icon: IconBrandX },
    {
        label: "GitHub",
        href: "https://github.com/limefolio",
        icon: IconBrandGithub,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/company/limefolio",
        icon: IconBrandLinkedin,
    },
];

export function HomeFooter() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
                    {/* Brand column */}
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5">
                            <LimefolioLIcon className="size-7" />
                            <span className="font-semibold text-base tracking-tight">
                                Limefolio
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            The fastest way to create a professional portfolio
                            that actually gets you hired. Trusted by thousands
                            of designers and developers.
                        </p>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                                >
                                    <Icon className="size-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map(({ label, links }) => (
                        <div key={label} className="space-y-4">
                            <h4 className="text-sm font-semibold text-foreground">
                                {label}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map(({ label: linkLabel, href }) => (
                                    <li key={linkLabel}>
                                        <Link
                                            href={href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                        >
                                            {linkLabel}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Limefolio. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Made with
                        <span className="text-primary">♥</span>
                        for creators everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}
