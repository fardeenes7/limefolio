import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconFileText } from "@tabler/icons-react";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description:
        "Read the Limefolio Terms and Conditions to understand the rules governing the use of our platform.",
};

const lastUpdated = "February 19, 2026";

const sections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        body: `By accessing or using Limefolio (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of the Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and Limefolio ("we", "us", or "our").

We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Service after any changes constitutes your acceptance of the revised Terms.`,
    },
    {
        id: "eligibility",
        title: "2. Eligibility",
        body: `You must be at least 16 years of age to use the Service. By using Limefolio you represent and warrant that you meet this requirement. If you are using the Service on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.`,
    },
    {
        id: "accounts",
        title: "3. Accounts and Registration",
        body: `To access certain features of the Service you must create an account. You agree to:

• Provide accurate, current, and complete information during registration.
• Maintain the security of your password and accept all risks of unauthorised access to your account.
• Notify us immediately at support@limefolio.com if you discover any unauthorised use of your account.
• Take responsibility for all activities that occur under your account.

We reserve the right to terminate accounts, remove or edit content, or cancel orders in our sole discretion.`,
    },
    {
        id: "acceptable-use",
        title: "4. Acceptable Use",
        body: `You agree not to use the Service to:

• Violate any applicable laws or regulations.
• Infringe the intellectual property rights of others.
• Upload, post, or transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable.
• Distribute spam, chain letters, or unsolicited bulk email.
• Attempt to gain unauthorised access to any part of the Service or its related systems.
• Interfere with or disrupt the integrity or performance of the Service.
• Reverse engineer, decompile, or disassemble any portion of the Service.

We may investigate and take appropriate legal action against anyone who, in our sole discretion, violates these provisions.`,
    },
    {
        id: "content",
        title: "5. User Content",
        body: `You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). By posting User Content, you grant Limefolio a worldwide, non-exclusive, royalty-free, sublicensable licence to use, reproduce, modify, adapt, publish, and display such content solely for the purpose of operating and improving the Service.

You represent and warrant that:
• You own or have the necessary rights to your User Content.
• Your User Content does not infringe the rights of any third party.
• Your User Content complies with these Terms and all applicable laws.

We do not endorse, support, or guarantee the completeness, truthfulness, accuracy, or reliability of any User Content.`,
    },
    {
        id: "subscription",
        title: "6. Subscriptions and Payment",
        body: `Some features of the Service are available on a paid subscription basis. By selecting a paid plan you agree to pay the applicable fees.

• Fees are charged in advance on a monthly or annual basis depending on your chosen plan.
• All fees are non-refundable except as expressly stated in our Refund Policy or required by applicable law.
• We may change subscription fees at any time. We will provide at least 30 days' advance notice of any price change.
• If your payment fails, we may suspend or terminate your access to paid features.
• You can cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.`,
    },
    {
        id: "intellectual-property",
        title: "7. Intellectual Property",
        body: `The Service and all content, features, and functionality (including but not limited to all information, software, text, displays, images, and the design, selection, and arrangement thereof) are owned by Limefolio or its licensors and are protected by applicable intellectual property laws.

You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Service strictly in accordance with these Terms. You must not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any portion of the Service without our prior written consent.`,
    },
    {
        id: "third-party",
        title: "8. Third-Party Services",
        body: `The Service may contain links to third-party websites or services that are not owned or controlled by Limefolio. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We strongly advise you to read the terms and privacy policy of any third-party service you visit.`,
    },
    {
        id: "disclaimer",
        title: "9. Disclaimers",
        body: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

We do not warrant that:
• The Service will be uninterrupted, timely, or error-free.
• Any errors or defects will be corrected.
• The Service is free of viruses or other harmful components.

Some jurisdictions do not allow the exclusion of implied warranties, so the above may not apply to you.`,
    },
    {
        id: "limitation",
        title: "10. Limitation of Liability",
        body: `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LIMEFOLIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:

• Your use of or inability to use the Service.
• Any unauthorised access to or use of our servers and/or personal information stored therein.
• Any interruption or cessation of transmission to or from the Service.
• Any bugs, viruses, or other harmful code transmitted through the Service.

Our total liability to you for all claims arising out of or relating to these Terms or the Service shall not exceed the amount paid by you to Limefolio in the twelve (12) months preceding the event giving rise to the claim.`,
    },
    {
        id: "termination",
        title: "11. Termination",
        body: `We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.

You may terminate your account at any time by contacting us at support@limefolio.com or through your account settings. Termination does not entitle you to a refund of any prepaid fees.`,
    },
    {
        id: "governing-law",
        title: "12. Governing Law",
        body: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Limefolio is registered, without regard to its conflict of law provisions. Any dispute arising under or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in that jurisdiction.`,
    },
    {
        id: "contact",
        title: "13. Contact Us",
        body: `If you have any questions about these Terms and Conditions, please contact us:

• Email: legal@limefolio.com
• Address: Limefolio, [Registered Address]
• Support: support@limefolio.com`,
    },
];

export default function TermsPage() {
    return (
        <div className="py-16 md:py-24">
            <div className="container px-6 max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <Badge variant="secondary" className="gap-1.5">
                        <IconFileText className="size-3" />
                        Legal
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Terms and Conditions
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated:{" "}
                        <span className="font-medium text-foreground">
                            {lastUpdated}
                        </span>
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Please read these Terms and Conditions carefully before
                        using Limefolio. By accessing the platform you agree to
                        be bound by the following rules.
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
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                                {body}
                            </div>
                        </section>
                    ))}
                </div>

                <Separator className="my-12" />

                <p className="text-sm text-muted-foreground text-center">
                    Questions? Email us at{" "}
                    <a
                        href="mailto:legal@limefolio.com"
                        className="font-medium text-primary hover:underline"
                    >
                        legal@limefolio.com
                    </a>
                </p>
            </div>
        </div>
    );
}
