import React, { useState } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import styles from './TodoList.module.css'
import { useEffect } from 'react';

export default function TodoList({filter}) {
  const [todos, setTodos] = useState(() => readTodoFLS())
  //콜백 함수를 사용해야 계속 함수가 호출되지 않음
  const handleAdd = (todo) => {
    setTodos([...todos, todo])
    
  }
  const handleUpdate = (updated) => 
    setTodos(todos.map( (t) => (t.id === updated.id ? updated : t)))

  const handleDelete = (deleted) => 
    setTodos(todos.filter( (t) => (t.id !== deleted.id)))

  const filtered = getFilteredItems(todos, filter)

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {
          filtered.map((item)=> (
            <Todo
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        }
      </ul>
      <AddTodo onAdd={handleAdd}></AddTodo>
    </section>
  )
}
function readTodoFLS(){
  const todo = JSON.parse(localStorage.getItem("todos"))
  return todo ? todo : []

}
function getFilteredItems(todos, filter){
  if(filter === 'all'){
    return todos
  }
  return todos.filter(todo => todo.status === filter);
}

