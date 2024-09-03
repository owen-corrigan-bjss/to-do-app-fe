import './App.css';
import { ToDoList } from './components/to-do-list/to-do-list';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditToDo } from './components/edit-to-do/edit-to-do'
import { Create } from './components/create/create';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ToDoList />} />
      <Route path="/todo/:id" element ={<EditToDo/>} />
      <Route path="/create" element ={<Create/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
