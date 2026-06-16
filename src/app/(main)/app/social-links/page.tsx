import { getSocialLinkList } from "@/lib/actions";
import { SocialLinksClient } from "./social-links-client";

export default async function SocialLinksPage() {
    const response = await getSocialLinkList();
    const socialLinks = response.ok && response.data ? response.data : [];

    return <SocialLinksClient initialLinks={socialLinks} />;
}
