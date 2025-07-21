import { NoteForm } from "./NoteForm";

export function NewNote () {
    return (
        <div>
            <h1 className="mb-4">New Note</h1>
            <p>This is where you can create a new note.</p>
            <NoteForm />
        </div>
    );
}