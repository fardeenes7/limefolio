import React from "react";
import { ComponentInput } from "@/templates/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorTokenSelect } from "./ColorTokenSelect";

interface DynamicInputProps {
    inputDef: ComponentInput;
    value: any;
    onChange: (value: any) => void;
}

export function DynamicInput({ inputDef, value, onChange }: DynamicInputProps) {
    const { type, label } = inputDef;
    const actualValue = value ?? inputDef.default;

    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            
            {type.kind === "text" && (
                <Input
                    type="text"
                    value={actualValue || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={inputDef.default as string}
                />
            )}

            {type.kind === "boolean" && (
                <div className="flex items-center h-9">
                    <Switch
                        checked={Boolean(actualValue)}
                        onCheckedChange={onChange}
                    />
                </div>
            )}

            {type.kind === "select" && (
                <Select value={actualValue} onValueChange={onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        {type.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {type.kind === "token" && type.category === "color" && (
                <ColorTokenSelect value={actualValue} onChange={onChange} />
            )}

            {type.kind === "file" && (
                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept={type.accepts === "image" ? "image/*" : type.accepts === "video" ? "video/*" : ".pdf,.doc,.docx"}
                        // Simplistic file handling for now. In a real app, this uploads and sets the URL.
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                // Mock behavior: just store a fake URL or create object URL
                                onChange(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}
