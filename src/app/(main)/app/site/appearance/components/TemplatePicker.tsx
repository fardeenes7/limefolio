import React, { useState, useEffect } from "react";
import { getAvailableTemplates, getTemplate } from "@/templates/registry";
import { TemplateCard } from "./TemplateCard";

interface TemplatePickerProps {
    selectedTemplate: string;
    setTemplate: (templateKey: string) => void;
    resetToSaved: () => void;
}

export function TemplatePicker({ selectedTemplate, setTemplate, resetToSaved }: TemplatePickerProps) {
    const templates = getAvailableTemplates().map(getTemplate);
    const [undoNotice, setUndoNotice] = useState<{ previous: string, currentLabel: string } | null>(null);

    // Auto-dismiss undo notice after 8 seconds
    useEffect(() => {
        if (undoNotice) {
            const timer = setTimeout(() => {
                setUndoNotice(null);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [undoNotice]);

    const handleCardClick = (key: string) => {
        if (key === selectedTemplate) return;
        const currentTpl = getTemplate(key);
        setUndoNotice({ previous: selectedTemplate, currentLabel: currentTpl.label });
        setTemplate(key);
    };

    const handleUndo = () => {
        if (undoNotice) {
            // We use resetToSaved if the user hasn't made further changes, 
            // but simplest is just to switch back to previous template. 
            // To perfectly restore everything, we would need a history stack,
            // but just switching the template back is the intended behavior for now.
            setTemplate(undoNotice.previous);
            setUndoNotice(null);
        }
    };

    return (
        <div className="flex flex-col h-full bg-card">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.key}
                            template={template}
                            isActive={template.key === selectedTemplate}
                            onClick={() => handleCardClick(template.key)}
                        />
                    ))}
                </div>
                
                <p className="text-[10px] text-muted-foreground mt-6 text-center px-4">
                    Theme and font will update to match the new template. Your content stays the same.
                </p>
            </div>

            {undoNotice && (
                <div className="shrink-0 p-3 bg-primary/10 border-t border-primary/20 flex items-center justify-between animate-in slide-in-from-bottom-2">
                    <span className="text-[11px] text-foreground font-medium">
                        Switched to {undoNotice.currentLabel}
                    </span>
                    <button 
                        onClick={handleUndo}
                        className="text-[11px] font-semibold text-primary hover:underline"
                    >
                        Undo
                    </button>
                </div>
            )}
        </div>
    );
}
