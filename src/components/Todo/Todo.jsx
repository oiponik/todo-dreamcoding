import React from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import styles from './Todo.module.css'

export default function Todo({todo, onUpdate, onDelete}) {
  const {id, text, status} = todo;
  const handleChange = (e) => {
    onUpdate({...todo, status:e.target.checked ? 'completed' : 'active'})
  }
  const handleDelete = () => {
    onDelete(todo)
  }
  return (
    <li className={styles.todo}>
      <input 
        className={styles.checkbox}
        type='checkbox' 
        id={id} 
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label htmlFor={id} className={styles.text}>{text}</label>
      <button 
        className={styles.button}
        onClick={handleDelete}
      >
        <BsFillTrashFill/>
      </button>
    </li>
  )
}
