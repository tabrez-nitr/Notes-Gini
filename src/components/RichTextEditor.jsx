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
    <div className=" p-2 rounded-md bg-[#0C1C2C] space-y-2">
      

      {/* ✏️ Editor */}
      <EditorContent editor={editor} className="max-h-[150px] min-h-[150px] overflow-y-auto text-white/75 " />
      {/* ✨ Toolbar */}
      <div className='flex justify-between'>
      <div className="flex gap-2">
        <button type='button' onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active-btn' : 'btn'}
            style={{
                color : '#F5F5DC',
                background : editor.isActive('bold') ? '#91BFFF' : 'none',

                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
          <i className="ri-bold text-[20px] font-bold" 
           style={{color : editor.isActive('bold')? 'black' : 'white'}}
          ></i>
        </button>
        <button type='button'  onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active-btn' : 'btn'}
             style={{
                color : '#F5F5DC',
                background : editor.isActive('italic') ? '#91BFFF' : 'none',
                
                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
          <i className="ri-italic text-[20px] font-bold"
          style={{color : editor.isActive('italic')? 'black' : 'white'}}
          ></i>
        </button>
        <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active-btn' : 'btn'}
            style={{
                color : '#F5F5DC',
                background : editor.isActive('strike') ? '#91BFFF' : 'none',
                
                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
          <i className="ri-strikethrough text-[20px] font-bold"
          style={{color : editor.isActive('strike')? 'black' : 'white'}}
          ></i>
        </button>
       <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}className={editor.isActive('underline') ? 'active-btn' : 'btn'}
         style={{
                color : '#F5F5DC',
                background : editor.isActive('underline') ? '#91BFFF' : 'none',
                
                borderRadius : '50%',
                padding : '0px 8px',
            }}
        >
         <i className="ri-underline text-[20px] font-bold"
         style={{color : editor.isActive('underline')? 'black' : 'white'}}
         ></i>
       </button>
      </div>
      <button><i className="ri-add-large-fill  text-4xl  p-2 text-[#F5F5DC]"></i></button>
      </div>
    </div>
  );
};

export default RichTextEditor;