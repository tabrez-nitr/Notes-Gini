// RichTextEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';




const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            Underline  : false,
        }),
        Underline,
       Placeholder.configure({
        placeholder: 'Write Your Note',
      }), 
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className=" p-2 rounded-md bg-white space-y-2">
      

      {/* ✏️ Editor */}
      <EditorContent editor={editor} className="max-h-[150px] min-h-[150px] overflow-y-auto " />
      {/* ✨ Toolbar */}
      <div className='flex justify-between'>
      <div className="flex gap-2">
        <button type='button' onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active-btn' : 'btn'}
            style={{
                border : editor.isActive('bold') ? '1px solid black' : 'none',
                borderRadius : '50%',
                padding : '2px 7px',
            }}
            >
          <i className="ri-bold text-[20px] font-bold"></i>
        </button>
        <button type='button'  onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active-btn' : 'btn'}
             style={{
                border : editor.isActive('italic') ? '1px solid black' : 'none',
                borderRadius : '50%',
                padding : '2px 7px',
            }}
            >
          <i className="ri-italic text-[20px] font-bold"></i>
        </button>
        <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active-btn' : 'btn'}
            style={{
                border : editor.isActive('strike') ? '1px solid black' : 'none',
                borderRadius : '50%',
                padding : '2px 7px',
            }}
            >
          <i className="ri-strikethrough text-[20px] font-bold"></i>
        </button>
       <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}className={editor.isActive('underline') ? 'active-btn' : 'btn'}
         style={{
                border : editor.isActive('underline') ? '1px solid black' : 'none',
                borderRadius : '50%',
                padding : '2px 7px',
            }}
        >
         <i className="ri-underline text-[20px] font-bold"></i>
       </button>
      </div>
      <button><i className="ri-add-large-fill  text-4xl  p-2"></i></button>
      </div>
    </div>
  );
};

export default RichTextEditor;