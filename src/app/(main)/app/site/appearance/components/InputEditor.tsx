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
import { IconUpload, IconX } from "@tabler/icons-react";
import type { ComponentInput } from "@/templates/types";

interface InputEditorProps {
    input: ComponentInput;
    value: unknown;
    defaultValue: unknown;
    isModified: boolean;
    onChange: (value: unknown) => void;
    onReset: () => void;
}

export function InputEditor({ input, value, defaultValue, isModified, onChange, onReset }: InputEditorProps) {
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
                        className="resize-y"
                    />
                );
            }
            return (
                <Input 
                    value={strValue} 
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder={typeof defaultValue === 'string' ? defaultValue : ''}
                />
            );
        }

        if (input.type.kind === "boolean") {
            return (
                <div className="flex items-center space-x-2 h-10">
                    <Switch 
                        checked={!!value} 
                        onCheckedChange={onChange} 
                        id={`input-${input.key}`}
                    />
                </div>
            );
        }

        if (input.type.kind === "select") {
            const strValue = typeof value === 'string' ? value : '';
            return (
                <Select value={strValue} onValueChange={onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                        {input.type.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
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
                />
            );
        }

        if (input.type.kind === "file") {
            const strValue = typeof value === 'string' ? value : '';
            return (
                <div className="flex items-center gap-3">
                    {strValue && (
                        <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-muted border">
                            {input.type.accepts === 'image' && (
                                <img src={strValue} alt="" className="h-full w-full object-cover" />
                            )}
                        </div>
                    )}
                    <Button variant="outline" className="w-full" onClick={() => {
                        // TODO: wire to media picker
                        const promptVal = prompt("Enter file URL (TODO: Media Picker integration)", strValue);
                        if (promptVal !== null) onChange(promptVal);
                    }}>
                        <IconUpload className="w-4 h-4 mr-2" />
                        {strValue ? "Change File" : "Upload File"}
                    </Button>
                </div>
            );
        }

        return <div className="text-sm text-destructive">Unsupported input type</div>;
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor={`input-${input.key}`} className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    {input.label}
                    {isModified && (
                        <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded font-semibold">
                            Modified
                        </span>
                    )}
                </Label>
                {isModified && (
                    <button 
                        onClick={onReset}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                        title="Reset to default"
                    >
                        <IconX className="w-3 h-3" />
                    </button>
                )}
            </div>
            {renderControl()}
        </div>
    );
}
