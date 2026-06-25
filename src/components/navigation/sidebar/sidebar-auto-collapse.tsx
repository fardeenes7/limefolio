"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

/**
 * Drop this component anywhere inside a page that lives within <SidebarProvider>
 * to automatically collapse the sidebar to icon-only mode while that page is active,
 * and restore the expanded state when navigating away.
 */
export function SidebarAutoCollapse() {
    const { setOpen, open } = useSidebar();

    useEffect(() => {
        // Capture the current state so we can restore it on unmount
        const wasOpen = open;
        setOpen(false);

        return () => {
            setOpen(wasOpen);
        };
        // Only run on mount/unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
