import React, { useState } from "react";
import './Todo.css'

const Todo = () => {
    const [inputValue, setInputValue] = useState('')
    const [todo, setTodo] = useState([])
    const [editMode,setEditMode]=useState(false)
    const [editId,setEditId]=useState(null)
    const [editValue,setEditValue]=useState('')
    
    const addTodo = () => {
        if(inputValue.trim() !== ''){
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue
            }
            setTodo([...todo, newTodo]);
            setInputValue('')
        }
    }

    const deleteTodo = (id) => {
        const updateTodo = todo.filter((work) => work.id !== id)
        setTodo(updateTodo)
    }
    const updateList = (id, text) => {
        setEditMode(true)
        setEditId(id)
        setEditValue(text)
    }

    const updateTodo = () => {
        const updatedTodo = todo.map((work) => {
            if (work.id === editId) {
                return {...work,text:editValue}
            }
            return work;
        })
        setTodo(updatedTodo)
        setEditMode(false)
        setEditId(null)
        setEditValue('')
    }
  return (
    <div className="todo-container">
      <h2>ToDo list</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}

      <ul>
        {todo.map((work) => (
          <li key={work.id}>
            {work.text}
            <button onClick={() => deleteTodo(work.id)}>Delete</button>
            <button onClick={() => updateList(work.id, work.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
