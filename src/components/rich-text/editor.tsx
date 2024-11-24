import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import EditorToolbar from './toolbar/editor-toolbar';

interface EditorProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) return <></>;

  return (
    <div className="prose max-w-none w-full border border-input bg-background dark:prose-invert">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent
          editor={editor}
          placeholder={placeholder}
          className="min-h-20"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
