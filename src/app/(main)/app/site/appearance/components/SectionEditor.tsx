import React, { useMemo } from "react";
import { SectionInstance, SectionOverride } from "@/templates/types";
import { ComponentRegistry } from "@/templates/components";
import { DynamicInput } from "./DynamicInput";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SectionEditorProps {
    instance: SectionInstance;
    override?: SectionOverride;
    onChange: (newOverride: SectionOverride) => void;
}

export function SectionEditor({ instance, override = {}, onChange }: SectionEditorProps) {
    const schema = ComponentRegistry[instance.componentKey];

    if (!schema) {
        return <div className="p-4 text-destructive">Unknown component: {instance.componentKey}</div>;
    }

    const currentVariant = override.variant || instance.defaultVariant;
    const currentInputs = override.inputs || {};

    const handleVariantChange = (variant: string) => {
        onChange({ ...override, variant });
    };

    const handleInputChange = (key: string, value: any) => {
        onChange({
            ...override,
            inputs: {
                ...currentInputs,
                [key]: value,
            },
        });
    };

    // Filter variants based on allowedVariants
    const availableVariants = schema.variants.filter(
        (v) => instance.allowedVariants.includes("all") || instance.allowedVariants.includes(v.key)
    );

    // Evaluate showIf constraints
    const visibleInputs = useMemo(() => {
        return schema.inputs.filter((input) => {
            if (!input.showIf) return true;
            
            const conditionValue =
                input.showIf.input === "variant"
                    ? currentVariant
                    : currentInputs[input.showIf.input] ?? schema.inputs.find((i) => i.key === input.showIf!.input)?.default;

            return conditionValue === input.showIf.equals;
        });
    }, [schema.inputs, currentVariant, currentInputs]);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Variant</Label>
                    <Select value={currentVariant} onValueChange={handleVariantChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {availableVariants.map((v) => (
                                <SelectItem key={v.key} value={v.key}>
                                    {v.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator />

            <div className="space-y-6">
                {visibleInputs.map((input) => (
                    <DynamicInput
                        key={input.key}
                        inputDef={input}
                        value={currentInputs[input.key]}
                        onChange={(val) => handleInputChange(input.key, val)}
                    />
                ))}
                {visibleInputs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No configurable inputs for this variant.</p>
                )}
            </div>
        </div>
    );
}
