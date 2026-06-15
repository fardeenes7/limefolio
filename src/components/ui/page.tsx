import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Page – outermost wrapper
// ---------------------------------------------------------------------------
function Page({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page"
      className={cn("container flex min-h-full flex-col gap-6", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageHeader – title row with optional action slot
// Automatically detects a PageAction child and switches to a two-column layout
// ---------------------------------------------------------------------------
function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-wrap items-start justify-between gap-4",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageHeading – groups title + description on the left
// ---------------------------------------------------------------------------
function PageHeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-heading"
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageTitle – the page <h1>
// ---------------------------------------------------------------------------
function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-title"
      className={cn("text-2xl font-bold tracking-tight text-foreground sm:text-3xl", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageDescription – sub-heading below the title
// ---------------------------------------------------------------------------
function PageDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageAction – right-aligned controls (buttons, menus, etc.)
// ---------------------------------------------------------------------------
function PageAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-action"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageBody – main scrollable content area; grows to fill remaining height
// ---------------------------------------------------------------------------
function PageBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-body"
      className={cn("flex flex-1 flex-col gap-6", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageFooter – optional footer with sticky / non-sticky variants
// ---------------------------------------------------------------------------
const pageFooterVariants = cva(
  "flex items-center gap-3 border-t bg-background px-0 py-4 text-sm",
  {
    variants: {
      variant: {
        /** Renders inline at the bottom of the page flow */
        default: "relative",
        /** Sticks to the bottom of the viewport */
        sticky:
          "sticky bottom-0 z-10 -mx-6 px-6 shadow-[0_-1px_0_0_hsl(var(--border))]",
      },
      align: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "end",
    },
  }
)

function PageFooter({
  className,
  variant,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageFooterVariants>) {
  return (
    <div
      data-slot="page-footer"
      data-variant={variant ?? "default"}
      className={cn(pageFooterVariants({ variant, align }), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageSeparator – a thin ruled line to split sections inside a page
// ---------------------------------------------------------------------------
function PageSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="page-separator"
      className={cn("border-border", className)}
      {...props}
    />
  )
}

export {
  Page,
  PageHeader,
  PageHeading,
  PageTitle,
  PageDescription,
  PageAction,
  PageBody,
  PageFooter,
  PageSeparator,
}
