"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CustomDomain } from "@/types";
import { CreateDomainDialog } from "./create-domain-dialog";
import {
    deleteCustomDomain,
    verifyCustomDomain
} from "@/lib/actions/custom-domains";
import { Button } from "@/components/ui/button";
import {
    Item,
    ItemContent,
    ItemGroup,
    ItemTitle,
    ItemDescription,
    ItemActions,
    ItemHeader,
    ItemSeparator
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import {
    IconWorldWww,
    IconTrash,
    IconCheck,
    IconRefresh,
    IconCopy,
    IconAlertTriangleFilled,
    IconArrowUpCircle
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface DomainsClientProps {
    initialDomains: CustomDomain[];
}

export function DomainsClient({ initialDomains }: DomainsClientProps) {
    const [domains, setDomains] = useState<CustomDomain[]>(initialDomains);
    const [loadingAction, setLoadingAction] = useState<number | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // If revalidatePath updates the page, initialDomains will change,
    // so we can synchronize state when props change.
    if (initialDomains !== domains) {
        setDomains(initialDomains);
    }

    const handleCopy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to remove this domain?")) return;
        setLoadingAction(id);
        try {
            const res = await deleteCustomDomain(id);
            if (!res.ok) {
                alert("Failed to delete domain.");
            }
        } finally {
            setLoadingAction(null);
        }
    };

    const handleVerify = async (id: number) => {
        setLoadingAction(id);
        try {
            const res = await verifyCustomDomain(id);
            if (!res.ok) {
                alert("Verification failed.");
            }
        } finally {
            setLoadingAction(null);
        }
    };

    if (domains.length === 0) {
        return (
            <Empty className="border-2">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <IconWorldWww />
                    </EmptyMedia>
                    <EmptyTitle>No custom domains yet</EmptyTitle>
                    <EmptyDescription>
                        Connect your own professional domain name to your
                        portfolio.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <CreateDomainDialog />
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <ItemGroup className="rounded-lg border bg-background text-foreground shadow-sm overflow-hidden gap-0">
            {domains.map((domain, index) => (
                <div key={domain.id}>
                    {index > 0 && <ItemSeparator className="m-0" />}
                    <Item
                        variant="default"
                        className="flex-col items-start p-6 border-0 rounded-none bg-transparent hover:bg-transparent shadow-none w-full"
                    >
                        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    {domain.status === "verified" ? (
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <IconCheck
                                                className="h-3.5 w-3.5 text-white"
                                                stroke={3}
                                            />
                                        </div>
                                    ) : (
                                        <IconAlertTriangleFilled className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium text-[15px]">
                                        {domain.domain}
                                    </div>
                                    <div className="text-sm flex items-center gap-2">
                                        {domain.status === "verified" ? (
                                            <span className="text-muted-foreground">
                                                Valid Configuration
                                            </span>
                                        ) : (
                                            <>
                                                <span className="text-red-500 bg-red-500/10 dark:bg-red-500/20 px-1.5 py-0.5 rounded text-[13px] font-medium">
                                                    Invalid Configuration
                                                </span>
                                                <span className="text-muted-foreground text-[13px] hover:underline cursor-pointer">
                                                    Learn more
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleVerify(domain.id)}
                                    disabled={loadingAction === domain.id}
                                >
                                    <IconRefresh
                                        className={cn(
                                            loadingAction == domain.id
                                                ? "animate-spin"
                                                : ""
                                        )}
                                    />
                                    Refresh
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(domain.id)}
                                    disabled={loadingAction === domain.id}
                                >
                                    <IconTrash/>
                                    Remove
                                </Button>
                            </div>
                        </div>

                        {domain.status !== "verified" && (
                            <div className="w-full mt-6 space-y-5">
                                <div className="flex gap-6 border-b border-border/50">
                                    <div className="border-b-2 border-foreground pb-2 text-[14px] font-medium cursor-pointer">
                                        DNS Records
                                    </div>
                                </div>

                                <p className="text-[14px] text-muted-foreground">
                                    The DNS records at your DNS provider must
                                    match the following records to verify and
                                    connect your domain to Limefolio.
                                </p>

                                <div className="w-full border rounded-md overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-left text-muted-foreground bg-transparent">
                                                <th className="p-4 font-normal text-[13px]">
                                                    Type
                                                </th>
                                                <th className="p-4 font-normal text-[13px]">
                                                    Name
                                                </th>
                                                <th className="p-4 font-normal text-[13px]">
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-transparent hover:bg-muted/10 transition-colors">
                                                <td className="p-4 font-medium text-[14px]">
                                                    CNAME
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 font-mono text-[13px]">
                                                        {domain.domain.startsWith(
                                                            "www."
                                                        )
                                                            ? "www"
                                                            : "@"}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-muted-foreground hover:text-foreground shrink-0 ml-1"
                                                            onClick={() =>
                                                                handleCopy(
                                                                    domain.domain.startsWith(
                                                                        "www."
                                                                    )
                                                                        ? "www"
                                                                        : "@",
                                                                    domain.id +
                                                                        "name"
                                                                )
                                                            }
                                                        >
                                                            {copied ===
                                                            domain.id +
                                                                "name" ? (
                                                                <IconCheck className="h-3.5 w-3.5 text-green-500" />
                                                            ) : (
                                                                <IconCopy className="h-3.5 w-3.5" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 font-mono text-[13px]">
                                                        cname.limefolio.com
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-muted-foreground hover:text-foreground shrink-0 ml-1"
                                                            onClick={() =>
                                                                handleCopy(
                                                                    "cname.limefolio.com",
                                                                    domain.id +
                                                                        "value"
                                                                )
                                                            }
                                                        >
                                                            {copied ===
                                                            domain.id +
                                                                "value" ? (
                                                                <IconCheck className="h-3.5 w-3.5 text-green-500" />
                                                            ) : (
                                                                <IconCopy className="h-3.5 w-3.5" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-[13px] text-muted-foreground p-3 border rounded-md bg-transparent">
                                    It might take some time for the DNS records
                                    to apply.{" "}
                                    <span className="text-blue-500 hover:underline cursor-pointer">
                                        Learn More{" "}
                                        <span className="ml-0.5 inline-block -rotate-45">
                                            →
                                        </span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </Item>
                </div>
            ))}
        </ItemGroup>
    );
}
