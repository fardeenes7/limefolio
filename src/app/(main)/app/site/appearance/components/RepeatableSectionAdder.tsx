import React from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection } from "@/templates/types";

interface RepeatableSectionAdderProps {
    sections: ResolvedSection[];
    onAddSection: (componentKey: string) => void;
}

export function RepeatableSectionAdder({ sections, onAddSection }: RepeatableSectionAdderProps) {
    // Find components that are repeatable and currently rendered in the list
    // We only show "+ Add another [Component]" if the component is repeatable
    // and there is at least one instance of it already in the list (so we place it below the last one).
    // Actually, the prompt says: "show an '+ Add another [label]' button below the last instance of that component in the list."

    // Group sections by componentKey to find the last index
    const lastIndices: Record<string, number> = {};
    sections.forEach((sec, idx) => {
        lastIndices[sec.componentKey] = idx;
    });

    // We shouldn't render the adders here in a bulk list at the bottom. 
    // The prompt implies rendering it "below the last instance of that component in the list."
    // It's better to export a component that checks if a section is the last of its kind,
    // and renders the button if so.

    return null;
}

// Alternatively, let's just make a small button component we can insert directly in the map loop.
export function AddAnotherButton({ componentKey, onClick }: { componentKey: string, onClick: () => void }) {
    const schema = ComponentRegistry[componentKey];
    if (!schema || !schema.repeatable) return null;

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-muted-foreground border border-dashed border-border mb-2 h-10"
            onClick={onClick}
        >
            <IconPlus className="w-4 h-4 mr-2" />
            Add another {schema.label}
        </Button>
    );
}
