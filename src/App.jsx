import { useState } from "react";
import ToDoItem from "./components/ToDoItem";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [newTodo, setNewTodo] = useState("");
  // const [todoList, setTodoList] = useState([])
  const [todoList, setTodoList] = useLocalStorage('TODOS', [])

  function handleAddTodo(){
    if(newTodo === '') return
    setTodoList(currentList => {
      return [...currentList, {text: newTodo, id: crypto.randomUUID(), checked: false}]
    })
    setNewTodo('')
  }

  function handleDeleteTodo(id){
    const filteredArray = todoList.filter(item => {
      return item.id !== id
    })
    console.log(filteredArray)
    setTodoList(() => {
      return filteredArray
    })
  }

  function toggleTodo(id, checked){
    console.log(id, checked)
    setTodoList(currentTodoList => {
      return currentTodoList.map(todo => {
        if(todo.id === id) return {...todo, checked}

        return todo
      })
    })
  }

  console.log(todoList)

  return (
    <div className="site-wrap">
      <header className="site-header">
        <h1>TO-DO LIST</h1>
      </header>
      <div className="input-bar">
        <input className="input-field" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button className="add-todo-btn" onClick={handleAddTodo}>ADD TODO</button>
      </div>

      <ul className="todo-list">
        {todoList.length === 0 ? <p>No todos</p> : 
        todoList.map(todo =>{
          return <ToDoItem todo={todo.text} id={todo.id} key={todo.id} checked={todo.checked} toggleTodo={toggleTodo} onDelete={handleDeleteTodo}/>
        })
        }
      </ul>
    </div>
  );
}

export default App;
