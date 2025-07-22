import type { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewNote ({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <div>
            <h1 className="mb-4">New Note</h1>
            <p>This is where you can create a new note.</p>
            <NoteForm  onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} 
             />
        </div>
    );
}