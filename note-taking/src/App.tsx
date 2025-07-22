import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes, Navigate} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4() , tagIds: tags.map(tag => tag.id) }]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }


  return (      
      <Container className="mt-5">
        <Routes>
        <Route path="/" element={
          <div>
            <h2>Home Page</h2>
            <h1>Welcome to the Note-Taking App</h1>
            <p>This is a simple application to manage your notes.</p>
          </div>
        } />
        <Route path="/new" element={<NewNote onSubmit = {onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      </Container>
  );
}

export default App;
