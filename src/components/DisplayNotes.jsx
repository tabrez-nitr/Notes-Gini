import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';

function DisplayNotes() {
  const { deleteNotes, notes, updateNote } = useNotes();
  const [isEditableId, setIsEditableId] = useState(null); // currently editing note ID
  const [editTitle, setEditTitle] = useState(""); // editing title
  const [editContent, setEditContent] = useState(""); // editing content

  const deleteNote = (id) => {
    deleteNotes(id);
  };

  // 🔧 Utility to strip HTML tags for editing plain text
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className='m-5 ml-20 mr-20'>
      <h2 className='mt-2 mb-4 text-white text-2xl'>Your Notes</h2>
      <div className='flex flex-wrap gap-4'>

        {notes.length !== 0 && notes.map((note) => {
          const isEdit = isEditableId === note.id;

          return (
            <div
              key={note.id}
              className="relative border flex flex-col border-white/20 rounded-[5px] p-4 min-w-[20vw] max-w-[20vw] min-h-[40vh]
              bg-transparent backdrop-blur-md shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)]
              transition-transform duration-300 transform hover:border-white/60 hover:shadow-md"
            >

              {isEdit ? (
                // 📝 Edit mode
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className='text-white font-semibold text-lg tracking-wide mb-2 border-b-2 border-white/40 bg-transparent w-full outline-none'
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="text-white/80 text-sm leading-relaxed max-h-[30vh] min-h-[25vh] overflow-y-auto bg-transparent w-full outline-none resize-none"
                  ></textarea>
                </div>
              ) : (
                // 👀 Display mode
                <div>
                  <h2 className="text-white font-semibold text-lg tracking-wide mb-2 border-b-2 border-white/40">
                    {note.title}
                  </h2>
                  <div
                    className="text-white/80 text-sm leading-relaxed max-h-[30vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              )}

              {/* 🔘 Buttons */}
              <br />
              <div className='flex gap-2 mt-auto'>
                <button
                  type="button"
                  className='border-1 p-1 border-white/50 hover:opacity-50'
                  onClick={() => {
                    if (isEdit) {
                      updateNote(note.id, editTitle, editContent);
                      setIsEditableId(null);
                    } else {
                      setIsEditableId(note.id);
                      setEditTitle(note.title);
                      setEditContent(stripHtmlTags(note.content)); // ✨ clean content for editing
                    }
                  }}
                >
                  {isEdit ? "Update" : "Edit"}
                </button>

                <button
                  type='button'
                  className='border-1 p-1 border-white/50 hover:opacity-50'
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayNotes;