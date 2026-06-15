"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { IconX } from "@tabler/icons-react"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const TRIGGER_KEYS = ["Enter", ",", "Tab"]

function normalize(value: string) {
  return value.trim().replace(/,+$/, "").trim()
}

// ---------------------------------------------------------------------------
// TagsInput
// ---------------------------------------------------------------------------
interface TagsInputProps {
  /** Controlled array of tag strings */
  value?: string[]
  /** Called whenever the tag list changes */
  onChange?: (tags: string[]) => void
  /** Input placeholder shown when there are no tags */
  placeholder?: string
  /** Disable all interactions */
  disabled?: boolean
  /** Extra class names applied to the outer wrapper */
  className?: string
  /** data-invalid forwarded from a Field wrapper */
  "aria-invalid"?: boolean
  id?: string
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = "Add a tag…",
      disabled = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Commit the current input value as a new tag
    const commitInput = React.useCallback(
      (raw: string) => {
        const tag = normalize(raw)
        if (!tag || value.includes(tag)) {
          setInputValue("")
          return
        }
        onChange?.([...value, tag])
        setInputValue("")
      },
      [value, onChange]
    )

    const removeTag = React.useCallback(
      (index: number) => {
        const next = value.filter((_, i) => i !== index)
        onChange?.(next)
      },
      [value, onChange]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (TRIGGER_KEYS.includes(e.key)) {
        // Prevent form submission on Enter, prevent tab navigation
        e.preventDefault()
        commitInput(inputValue)
        return
      }

      // Backspace on empty input removes the last tag
      if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        removeTag(value.length - 1)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      // If the user pastes or types a comma in the middle of a word, split it
      if (raw.includes(",")) {
        const parts = raw.split(",")
        // Everything except the last part becomes tags
        parts.slice(0, -1).forEach((p) => commitInput(p))
        setInputValue(parts[parts.length - 1])
      } else {
        setInputValue(raw)
      }
    }

    const handleBlur = () => {
      // Commit whatever is in the input when focus leaves
      if (inputValue.trim()) {
        commitInput(inputValue)
      }
    }

    // Clicking anywhere inside the container focuses the hidden input
    const handleContainerClick = () => {
      const input = containerRef.current?.querySelector("input")
      input?.focus()
    }

    return (
      <div
        ref={containerRef}
        data-slot="tags-input"
        data-disabled={disabled || undefined}
        onClick={handleContainerClick}
        className={cn(
          "bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40 aria-[invalid=true]:border-destructive",
          "flex min-h-9 w-full cursor-text flex-wrap items-center gap-1.5 rounded-4xl border px-3 py-1.5 text-sm transition-colors",
          "focus-within:ring-[3px] aria-[invalid=true]:ring-[3px]",
          "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className
        )}
        aria-invalid={props["aria-invalid"]}
      >
        {/* Existing tags */}
        {value.map((tag, i) => (
          <Badge
            key={`${tag}-${i}`}
            variant="secondary"
            className="gap-1 pr-1 text-xs font-medium border border-foreground/25"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(i)
                }}
                className="rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <IconX className="size-3" />
              </button>
            )}
          </Badge>
        ))}

        {/* Text input */}
        <input
          ref={ref}
          id={id}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[8rem] flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          autoComplete="off"
          aria-label="Add tag"
        />
      </div>
    )
  }
)
TagsInput.displayName = "TagsInput"

export { TagsInput }
export type { TagsInputProps }
