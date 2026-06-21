import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ColorTokenSelect } from "./ColorTokenSelect";
import { IconUpload, IconX, IconRotate } from "@tabler/icons-react";
import type { ComponentInput } from "@/templates/types";
import { cn } from "@/lib/utils";

interface InputEditorProps {
    input: ComponentInput;
    value: unknown;
    defaultValue: unknown;
    isModified: boolean;
    onChange: (value: unknown) => void;
    onReset: () => void;
    compact?: boolean;
}

export function InputEditor({ input, value, defaultValue, isModified, onChange, onReset, compact }: InputEditorProps) {
    const isBoolean = input.type.kind === "boolean";
    const isSmallText = input.type.kind === "text" && !/bio|description|summary/.test(input.label.toLowerCase());

    const renderControl = () => {
        if (input.type.kind === "text") {
            const isTextarea = /bio|description|summary/.test(input.label.toLowerCase());
            const strValue = typeof value === 'string' ? value : '';
            
            if (isTextarea) {
                return (
                    <Textarea 
                        value={strValue} 
                        onChange={(e) => onChange(e.target.value)} 
                        placeholder={typeof defaultValue === 'string' ? defaultValue : ''}
                        className="resize-y min-h-[80px] text-xs"
                    />
                );
            }
            return (
                <Input 
                    value={strValue} 
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder={typeof defaultValue === 'string' ? defaultValue : ''}
                    className="h-8 text-xs"
                />
            );
        }

        if (input.type.kind === "boolean") {
            return (
                <div className="flex items-center justify-end h-8">
                    <Switch 
                        checked={!!value} 
                        onCheckedChange={onChange} 
                        id={`input-${input.key}`}
                        className="scale-75 origin-right"
                    />
                </div>
            );
        }

        if (input.type.kind === "select") {
            const strValue = typeof value === 'string' ? value : '';
            return (
                <Select value={strValue} onValueChange={onChange}>
                    <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        {input.type.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }

        if (input.type.kind === "token") {
            const strValue = typeof value === 'string' ? value : '';
            if (input.type.category === "color") {
                return <ColorTokenSelect value={strValue} onChange={onChange} />;
            }
            return (
                <Input 
                    value={strValue} 
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder="e.g. var(--radius)"
                    className="h-8 text-xs"
                />
            );
        }

        if (input.type.kind === "file") {
            const strValue = typeof value === 'string' ? value : '';
            return (
                <div className="flex items-center gap-2">
                    {strValue && (
                        <div className="h-8 w-8 shrink-0 rounded overflow-hidden bg-muted border">
                            {input.type.accepts === 'image' && (
                                <img src={strValue} alt="" className="h-full w-full object-cover" />
                            )}
                        </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs px-2" onClick={() => {
                        const promptVal = prompt("Enter file URL", strValue);
                        if (promptVal !== null) onChange(promptVal);
                    }}>
                        <IconUpload className="w-3 h-3 mr-1.5" />
                        {strValue ? "Change" : "Upload"}
                    </Button>
                </div>
            );
        }

        return <div className="text-[10px] text-destructive italic">Unsupported type</div>;
    };

    const labelContent = (
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <Label 
                htmlFor={`input-${input.key}`} 
                className={cn(
                    "text-[11px] font-medium text-muted-foreground truncate",
                    isModified && "text-foreground"
                )}
            >
                {input.label}
            </Label>
            {isModified && (
                <div 
                    className="w-1 h-1 rounded-full bg-primary shrink-0" 
                    title="Modified"
                />
            )}
        </div>
    );

    if (compact && (isBoolean || isSmallText)) {
        return (
            <div className="flex items-center justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                {labelContent}
                <div className="flex items-center gap-2 shrink-0">
                    <div className={cn(isBoolean ? "w-10" : "w-32")}>
                        {renderControl()}
                    </div>
                    {isModified && (
                        <button 
                            onClick={onReset}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Reset to default"
                        >
                            <IconRotate className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 py-1">
            <div className="flex items-center justify-between">
                {labelContent}
                {isModified && (
                    <button 
                        onClick={onReset}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                        title="Reset to default"
                    >
                        <IconRotate className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
            {renderControl()}
        </div>
    );
}
