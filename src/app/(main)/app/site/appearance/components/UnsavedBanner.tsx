import React, { useState, useEffect } from "react";
import { IconX, IconAlertCircle } from "@tabler/icons-react";

interface UnsavedBannerProps {
    isDirty: boolean;
}

export function UnsavedBanner({ isDirty }: UnsavedBannerProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    // Re-show banner if dirty state changes to true
    useEffect(() => {
        if (isDirty) {
            setIsDismissed(false);
        }
    }, [isDirty]);

    if (!isDirty || isDismissed) {
        return null;
    }

    return (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-between text-amber-600 dark:text-amber-400">
            <div className="flex items-center gap-2 text-xs font-medium">
                <IconAlertCircle className="w-4 h-4 shrink-0" />
                <span>You have unsaved appearance changes.</span>
            </div>
            <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="p-1 hover:bg-amber-500/10 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Dismiss"
            >
                <IconX className="w-4 h-4" />
            </button>
        </div>
    );
}
