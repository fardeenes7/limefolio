import { redirect } from "next/navigation";

export default function DomainsPage() {
    redirect("/app/site?tab=domains");
}


export const metadata = {
    title: "Site Domains",
};
