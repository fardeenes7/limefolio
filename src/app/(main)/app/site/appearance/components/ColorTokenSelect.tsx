import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ColorTokenSelectProps {
    value?: string;
    onChange: (value: string) => void;
}

const COLOR_TOKENS = [
    { label: "Default (Background)", value: "bg-background" },
    { label: "Primary", value: "bg-primary" },
    { label: "Secondary", value: "bg-secondary" },
    { label: "Muted", value: "bg-muted" },
    { label: "Accent", value: "bg-accent" },
    { label: "Card", value: "bg-card" },
    { label: "Destructive", value: "bg-destructive" },
];

export function ColorTokenSelect({ value = "bg-background", onChange }: ColorTokenSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color token" />
            </SelectTrigger>
            <SelectContent>
                {COLOR_TOKENS.map((token) => (
                    <SelectItem key={token.value} value={token.value}>
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-4 h-4 rounded-full border border-black/10 dark:border-white/10 ${token.value}`}
                                aria-hidden
                            />
                            {token.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
