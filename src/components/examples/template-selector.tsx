"use client";

import { useState, useEffect } from "react";

interface Template {
    name: string;
    slug: string;
    description?: string;
}

/**
 * Example component showing how to fetch and display available templates
 * This can be used in a template selector UI in the dashboard
 */
export function TemplateSelector() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

    useEffect(() => {
        async function fetchTemplates() {
            try {
                // Using Next.js API route that automatically reads from Templates registry
                const response = await fetch("/api/templates");
                const data = await response.json();
                setTemplates(data);
            } catch (error) {
                console.error("Failed to fetch templates:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTemplates();
    }, []);

    if (loading) {
        return <div>Loading templates...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.slug}
                        onClick={() => setSelectedTemplate(template.slug)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                            selectedTemplate === template.slug
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                        }`}
                    >
                        <h3 className="font-semibold text-lg">
                            {template.name}
                        </h3>
                        {template.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {template.description}
                            </p>
                        )}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                    Selected template: <strong>{selectedTemplate}</strong>
                </p>
            </div>
        </div>
    );
}
