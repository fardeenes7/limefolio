import { PageProps } from "@/lib/template-types";

/**
 * Default Theme - Single Project Page Component
 * Uses shadcn color variables for consistent theming
 */
export default function DefaultSingleProject({ data }: PageProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
                <div className="flex flex-col gap-6 w-full">
                    <h1 className="text-4xl font-bold text-foreground">
                        {data?.project?.title ||
                            "Default Theme - Single Project"}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {data?.project?.description ||
                            "This is the default single project template."}
                    </p>
                    <div className="bg-muted p-6 rounded-lg border border-border">
                        <pre className="text-sm text-foreground overflow-auto">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </div>
            </main>
        </div>
    );
}
