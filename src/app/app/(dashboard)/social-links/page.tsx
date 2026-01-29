import { getSocialLinkList } from "@/lib/actions";
import { SocialLinksClient } from "./social-links-client";

export default async function SocialLinksPage() {
    const response = await getSocialLinkList();
    const socialLinks = response.ok && response.data ? response.data : [];

    return (
        <div className="container flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Social Links
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your social media profiles and links
                    </p>
                </div>
            </div>

            <SocialLinksClient initialLinks={socialLinks} />
        </div>
    );
}
