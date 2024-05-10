import { useEffect, useRef, useState } from 'react'
import './CSS/todo.css'
import { TodoItems } from './TodoItems';

let count = 0;
export const Todo = () => {

  const [todos,SetTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
      SetTodos([...todos,{no:count++,text:inputRef.current.value,display:""}]);
      inputRef.current.value = "";
      localStorage.setItem("todos_count",count)
  }

  useEffect(()=> {
    SetTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("");
  },[])
  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos",JSON.stringify(todos))
    },100);
  },[todos])

  return (
    <div className='todo'>
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input'></input>
        <div onClick={()=>{add()}} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todos.map((item,index) => {
          return <TodoItems key={index} setTodos = {SetTodos} no={item.no} display={item.display} text={item.text}></TodoItems>
        })}
      </div>
    </div>
  )
}
