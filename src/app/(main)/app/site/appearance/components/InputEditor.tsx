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
import { BackgroundTypePicker, BackgroundEffectPicker } from "./BackgroundPicker";
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
                        className="resize-y min-h-[64px] text-[10px] md:text-xs"
                    />
                );
            }
            return (
                <Input 
                    value={strValue} 
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder={typeof defaultValue === 'string' ? defaultValue : ''}
                    className="h-8 text-[10px] md:text-xs"
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
                        className="scale-90 origin-right"
                    />
                </div>
            );
        }

        if (input.type.kind === "select") {
            const strValue = typeof value === 'string' ? value : '';

            // Special visual pickers for hero background controls
            if (input.key === "backgroundType") {
                return <BackgroundTypePicker value={strValue} onChange={onChange} />;
            }
            if (input.key === "backgroundEffect") {
                return <BackgroundEffectPicker value={strValue} onChange={onChange} />;
            }

            return (
                <Select value={strValue} onValueChange={onChange}>
                    <SelectTrigger className="h-8 text-[10px] md:text-[10px]">
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        {input.type.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value} className="text-[10px] md:text-[10px]">
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
                    className="h-8 text-[10px] md:text-[10px]"
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
                    <Button variant="outline" size="sm" className="w-full h-8 text-[10px] md:text-[10px] px-2" onClick={() => {
                        const promptVal = prompt("Enter file URL", strValue);
                        if (promptVal !== null) onChange(promptVal);
                    }}>
                        <IconUpload className="w-3.5 h-3.5 mr-1" />
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
                    "text-[10px] md:text-[10px] font-medium text-foreground/80 truncate",
                    isModified && "text-foreground"
                )}
            >
                {input.label}
            </Label>
            {isModified && (
                <div 
                    className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" 
                    title="Modified"
                />
            )}
        </div>
    );

    if (compact && isBoolean) {
        return (
            <div className="flex items-center justify-between gap-3 py-1 border-b border-border/40 last:border-0">
                {labelContent}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-10">
                        {renderControl()}
                    </div>
                    {isModified && (
                        <button 
                            onClick={onReset}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Reset to default"
                        >
                            <IconRotate className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 py-1.5">
            <div className="flex items-center justify-between">
                {labelContent}
                {isModified && (
                    <button 
                        onClick={onReset}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                        title="Reset to default"
                    >
                        <IconRotate className="w-4 h-4" />
                    </button>
                )}
            </div>
            {renderControl()}
        </div>
    );
}
