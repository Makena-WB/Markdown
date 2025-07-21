import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";

function App() {
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
        <Route path="/new" element={<NewNote/>} />
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
