"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
    IconBold,
    IconItalic,
    IconUnderline,
    IconStrikethrough,
    IconCode,
    IconH1,
    IconH2,
    IconH3,
    IconList,
    IconListNumbers,
    IconBlockquote,
    IconSeparator,
    IconLink,
    IconLinkOff,
    IconPhoto,
    IconAlignLeft,
    IconAlignCenter,
    IconAlignRight,
    IconAlignJustified,
    IconSourceCode,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconEraser,
} from "@tabler/icons-react";

const lowlight = createLowlight(common);

// ── Toolbar Button ────────────────────────────────────────────────────────────

interface ToolbarButtonProps {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            className={cn(
                "inline-flex items-center justify-center size-8 rounded-md text-sm transition-all duration-150",
                "hover:bg-muted hover:text-foreground",
                "disabled:pointer-events-none disabled:opacity-40",
                active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground",
            )}
        >
            {children}
        </button>
    );
}

function ToolbarSeparator() {
    return <div className="w-px h-5 bg-border mx-0.5 shrink-0" />;
}

// ── Link Dialog ───────────────────────────────────────────────────────────────

interface LinkDialogProps {
    editor: Editor;
    onClose: () => void;
}

function LinkDialog({ editor, onClose }: LinkDialogProps) {
    const existingUrl = editor.getAttributes("link").href ?? "";
    const [url, setUrl] = useState(existingUrl);

    const apply = () => {
        if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
        }
        onClose();
    };

    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-popover border border-border rounded-xl shadow-lg">
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") apply();
                    if (e.key === "Escape") onClose();
                }}
                placeholder="https://example.com"
                autoFocus
                className="text-sm bg-transparent outline-none min-w-64 text-foreground placeholder:text-muted-foreground"
            />
            <button
                type="button"
                onClick={apply}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
            >
                Apply
            </button>
            <button
                type="button"
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
            >
                Cancel
            </button>
        </div>
    );
}

// ── Main Toolbar ──────────────────────────────────────────────────────────────

interface EditorToolbarProps {
    editor: Editor;
}

function EditorToolbar({ editor }: EditorToolbarProps) {
    const [showLinkDialog, setShowLinkDialog] = useState(false);

    const addImage = useCallback(() => {
        const url = window.prompt("Image URL:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <div className="flex flex-col border-b border-border bg-muted/40">
            {showLinkDialog && (
                <div className="px-2 py-2 border-b border-border">
                    <LinkDialog editor={editor} onClose={() => setShowLinkDialog(false)} />
                </div>
            )}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
                {/* History */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo (Ctrl+Z)"
                >
                    <IconArrowBackUp className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo (Ctrl+Y)"
                >
                    <IconArrowForwardUp className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Headings */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                >
                    <IconH1 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                >
                    <IconH2 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                >
                    <IconH3 className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Marks */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Bold (Ctrl+B)"
                >
                    <IconBold className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Italic (Ctrl+I)"
                >
                    <IconItalic className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                    title="Underline (Ctrl+U)"
                >
                    <IconUnderline className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive("strike")}
                    title="Strikethrough"
                >
                    <IconStrikethrough className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive("code")}
                    title="Inline Code"
                >
                    <IconCode className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <IconList className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                    title="Numbered List"
                >
                    <IconListNumbers className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    active={editor.isActive({ textAlign: "left" })}
                    title="Align Left"
                >
                    <IconAlignLeft className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    active={editor.isActive({ textAlign: "center" })}
                    title="Align Center"
                >
                    <IconAlignCenter className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    active={editor.isActive({ textAlign: "right" })}
                    title="Align Right"
                >
                    <IconAlignRight className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    active={editor.isActive({ textAlign: "justify" })}
                    title="Justify"
                >
                    <IconAlignJustified className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Blocks */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive("blockquote")}
                    title="Blockquote"
                >
                    <IconBlockquote className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive("codeBlock")}
                    title="Code Block"
                >
                    <IconSourceCode className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <IconSeparator className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Links & Media */}
                <ToolbarButton
                    onClick={() => setShowLinkDialog((v) => !v)}
                    active={editor.isActive("link") || showLinkDialog}
                    title="Insert Link (Ctrl+K)"
                >
                    <IconLink className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                    title="Remove Link"
                >
                    <IconLinkOff className="size-4" />
                </ToolbarButton>
                <ToolbarButton onClick={addImage} title="Insert Image">
                    <IconPhoto className="size-4" />
                </ToolbarButton>

                <ToolbarSeparator />

                {/* Clear */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    title="Clear Formatting"
                >
                    <IconEraser className="size-4" />
                </ToolbarButton>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
    value?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
    className?: string;
    editorClassName?: string;
    minHeight?: string;
    "aria-invalid"?: boolean;
    id?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something amazing...",
    className,
    editorClassName,
    minHeight = "320px",
    "aria-invalid": ariaInvalid,
    id,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // replaced by lowlight version
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: "is-editor-empty",
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-2 cursor-pointer",
                    rel: "noopener noreferrer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto my-2",
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: "bg-muted rounded-lg p-4 font-mono text-sm my-2 overflow-x-auto",
                },
            }),
        ],
        content: value || "",
        editorProps: {
            attributes: {
                id: id ?? "",
                class: cn(
                    "outline-none min-h-[--editor-min-h] px-4 py-4",
                    "prose prose-sm max-w-none",
                    "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
                    editorClassName,
                ),
                style: `--editor-min-h: ${minHeight}`,
            },
        },
        onUpdate({ editor }) {
            const html = editor.isEmpty ? "" : editor.getHTML();
            onChange?.(html);
        },
        immediatelyRender: false,
    });

    return (
        <div
            data-slot="rich-text-editor"
            aria-invalid={ariaInvalid}
            className={cn(
                "bg-input/30 border border-input rounded-xl overflow-hidden",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
                "aria-invalid:ring-[3px]",
                "transition-all duration-150",
                className,
            )}
        >
            {editor && (
                <>
                    <EditorToolbar editor={editor} />

                    {/* Bubble menu for quick formatting on selected text */}
                    <BubbleMenu
                        editor={editor}
                        shouldShow={({ from, to }: { from: number; to: number }) => {
                            return from !== to && !editor.isActive("codeBlock") && !editor.isActive("image");
                        }}
                    >
                        <div className="flex items-center gap-0.5 px-1.5 py-1 bg-popover border border-border rounded-xl shadow-lg">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                active={editor.isActive("bold")}
                                title="Bold"
                            >
                                <IconBold className="size-3.5" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                active={editor.isActive("italic")}
                                title="Italic"
                            >
                                <IconItalic className="size-3.5" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                active={editor.isActive("underline")}
                                title="Underline"
                            >
                                <IconUnderline className="size-3.5" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                active={editor.isActive("strike")}
                                title="Strikethrough"
                            >
                                <IconStrikethrough className="size-3.5" />
                            </ToolbarButton>
                            <div className="w-px h-4 bg-border mx-0.5" />
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                active={editor.isActive("code")}
                                title="Code"
                            >
                                <IconCode className="size-3.5" />
                            </ToolbarButton>
                        </div>
                    </BubbleMenu>

                    <EditorContent editor={editor} />
                </>
            )}
        </div>
    );
}
