import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconShield } from "@tabler/icons-react";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Learn how Limefolio collects, uses, and protects your personal data.",
};

const lastUpdated = "February 19, 2026";

const sections = [
    {
        id: "introduction",
        title: "1. Introduction",
        body: `Limefolio ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website and services (collectively, the "Service").

Please read this Privacy Policy carefully. By using the Service, you acknowledge that you have read, understood, and agree to be bound by the practices described herein. If you disagree with any part of this Policy, please discontinue use of the Service.`,
    },
    {
        id: "information-we-collect",
        title: "2. Information We Collect",
        body: `We collect information that you provide directly to us and information collected automatically when you use the Service.

**Information you provide:**
• Account information (name, email address, password) when you register.
• Profile information (bio, photo, social links) that you add to your portfolio.
• Portfolio content (projects, experience, skills) you create on the platform.
• Payment information processed via our third-party payment provider (we do not store full card details).
• Communications you send us (support requests, feedback).

**Information collected automatically:**
• Log data (IP address, browser type, pages visited, timestamps).
• Device information (operating system, hardware model).
• Usage data (features used, clicks, scroll depth).
• Cookies and similar tracking technologies (see Section 6).

**Information from third parties:**
• If you sign in via Google or another OAuth provider, we receive basic profile information (name, email, profile picture) as permitted by your privacy settings on that platform.`,
    },
    {
        id: "how-we-use",
        title: "3. How We Use Your Information",
        body: `We use the information we collect to:

• Provide, maintain, and improve the Service.
• Create and manage your account.
• Process payments and manage subscriptions.
• Send transactional emails (account verification, password resets, invoices).
• Send service-related announcements and product updates (you may opt out at any time).
• Respond to your comments and support requests.
• Monitor and analyse usage patterns to enhance user experience.
• Detect, investigate, and prevent fraudulent transactions and other illegal activities.
• Comply with legal obligations.

We will not sell your personal data to third parties.`,
    },
    {
        id: "legal-basis",
        title: "4. Legal Basis for Processing (EEA / UK Users)",
        body: `If you are located in the European Economic Area or the United Kingdom, we process your personal data under the following legal bases:

• **Contract performance** — processing necessary to fulfil the contract we have with you (e.g. providing the Service, managing your account).
• **Legitimate interests** — processing for our legitimate business interests, such as improving the Service and preventing fraud, provided these are not overridden by your rights.
• **Consent** — where you have given us explicit consent (e.g. marketing emails). You may withdraw consent at any time.
• **Legal obligation** — where we must process your data to comply with applicable law.`,
    },
    {
        id: "sharing",
        title: "5. How We Share Your Information",
        body: `We may share your information with:

• **Service providers** — trusted vendors who help us operate the Service (hosting, payment processing, email delivery, analytics). They are authorised to use your information only as necessary to provide services to us.
• **Business transfers** — if Limefolio is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
• **Law enforcement** — where required by law, court order, or governmental authority.
• **With your consent** — for any other purpose with your explicit consent.

We require all third parties to respect the security of your personal data and treat it in accordance with applicable law.`,
    },
    {
        id: "cookies",
        title: "6. Cookies and Tracking Technologies",
        body: `We use cookies and similar technologies to:

• Keep you signed in across sessions (essential cookies).
• Remember your preferences.
• Analyse how you use the Service (analytics cookies).
• Measure the effectiveness of our communications.

**Types of cookies we use:**
• *Essential cookies* — strictly necessary for the Service to function. These cannot be disabled.
• *Analytics cookies* — help us understand usage patterns (e.g. Google Analytics). You may opt out via your browser settings or our cookie banner.
• *Preference cookies* — remember your settings (e.g. theme selection).

You can control cookies through your browser settings. Disabling non-essential cookies will not affect your access to core features but may reduce convenience.`,
    },
    {
        id: "data-retention",
        title: "7. Data Retention",
        body: `We retain your personal data for as long as your account is active or as necessary to provide the Service. Specifically:

• Account data is retained for the lifetime of your account plus a grace period of 30 days after deletion.
• Portfolio content is permanently deleted within 30 days of account termination.
• Billing records are retained for 7 years to comply with financial regulations.
• Server logs are retained for 90 days.

You may request deletion of your data at any time (see Section 9).`,
    },
    {
        id: "security",
        title: "8. Data Security",
        body: `We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These include:

• Encryption of data in transit (TLS/HTTPS).
• Encryption of sensitive data at rest.
• Access controls limiting who can access personal data.
• Regular security audits and vulnerability assessments.

However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security and encourage you to use a strong, unique password and enable two-factor authentication where available.`,
    },
    {
        id: "your-rights",
        title: "9. Your Rights",
        body: `Depending on your location, you may have the following rights regarding your personal data:

• **Access** — Request a copy of the personal data we hold about you.
• **Rectification** — Request correction of inaccurate or incomplete data.
• **Erasure** — Request deletion of your personal data ("right to be forgotten").
• **Restriction** — Request that we limit the processing of your data in certain circumstances.
• **Portability** — Receive your data in a structured, machine-readable format.
• **Objection** — Object to processing based on legitimate interests or for direct marketing.
• **Withdraw consent** — Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.

To exercise any of these rights, please contact us at privacy@limefolio.com. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.`,
    },
    {
        id: "children",
        title: "10. Children's Privacy",
        body: `The Service is not directed at children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such information, please contact us immediately at privacy@limefolio.com and we will delete it promptly.`,
    },
    {
        id: "international-transfers",
        title: "11. International Data Transfers",
        body: `Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from those in your country.

When we transfer personal data from the EEA/UK to third countries, we ensure appropriate safeguards are in place (e.g. Standard Contractual Clauses approved by the European Commission, or adequacy decisions).`,
    },
    {
        id: "third-party-links",
        title: "12. Third-Party Links",
        body: `Your public portfolio pages may link to external websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies before sharing personal information with them.`,
    },
    {
        id: "changes",
        title: "13. Changes to This Policy",
        body: `We may update this Privacy Policy from time to time. When we do, we will post the updated Policy on this page and update the "Last Updated" date. For material changes, we will also notify you by email or via a prominent notice in the Service at least 14 days before the change takes effect.

Your continued use of the Service after the effective date of the revised Policy constitutes your acceptance of the changes.`,
    },
    {
        id: "contact",
        title: "14. Contact Us",
        body: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

• Email: privacy@limefolio.com
• Support: support@limefolio.com
• Address: Limefolio, [Registered Address]

For EEA/UK residents, our Data Protection Representative can be reached at the email address above.`,
    },
];

export default function PrivacyPage() {
    return (
        <div className="py-16 md:py-24">
            <div className="container px-6 max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <Badge variant="secondary" className="gap-1.5">
                        <IconShield className="size-3" />
                        Legal
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated:{" "}
                        <span className="font-medium text-foreground">
                            {lastUpdated}
                        </span>
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Your privacy matters to us. This Policy explains exactly
                        what data we collect, why we collect it, and how you can
                        control it.
                    </p>
                </div>

                <Separator className="mb-12" />

                {/* Table of Contents */}
                <nav className="mb-12 rounded-xl border border-border bg-muted/30 p-6 space-y-2">
                    <p className="text-sm font-semibold text-foreground mb-4">
                        Table of Contents
                    </p>
                    <ol className="space-y-2">
                        {sections.map(({ id, title }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                >
                                    {title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map(({ id, title, body }) => (
                        <section
                            key={id}
                            id={id}
                            className="scroll-mt-24 space-y-4"
                        >
                            <h2 className="text-xl font-semibold text-foreground">
                                {title}
                            </h2>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base [&_strong]:font-semibold [&_strong]:text-foreground">
                                {body
                                    .split(/(\*\*[^*]+\*\*)/)
                                    .map((part, i) => {
                                        if (
                                            part.startsWith("**") &&
                                            part.endsWith("**")
                                        ) {
                                            return (
                                                <strong key={i}>
                                                    {part.slice(2, -2)}
                                                </strong>
                                            );
                                        }
                                        return part;
                                    })}
                            </div>
                        </section>
                    ))}
                </div>

                <Separator className="my-12" />

                <p className="text-sm text-muted-foreground text-center">
                    Questions about your privacy? Email us at{" "}
                    <a
                        href="mailto:privacy@limefolio.com"
                        className="font-medium text-primary hover:underline"
                    >
                        privacy@limefolio.com
                    </a>
                </p>
            </div>
        </div>
    );
}
