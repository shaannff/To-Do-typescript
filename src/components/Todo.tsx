import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

interface TodoItem {
    id:number;
    text:string;
    status:boolean
}

export const Todo:React.FC = () => {

  const [todoList,setTodoList] = useState<TodoItem[]>(localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')!):[])

  const inputRef = useRef<HTMLInputElement>(null)



useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
}, [todoList]);



  const add =()=>{


        const inputText = inputRef.current?.value.trim()
        if(!inputText)return 

        const newTodo:TodoItem ={
            id:Date.now(),
            text:inputText,
            status:false
        }

        setTodoList((prev)=>[...prev,newTodo])
        if (inputRef.current) {
            inputRef.current.value = '';
          }
  }

const deletTodo=(id:number)=>{
    setTodoList((prevTodo)=>{
       return  prevTodo.filter((todo)=> todo.id !== id)
    })
}

const changeStatus = (id: number) => {
    setTodoList((prevTodo) => {
        return prevTodo.map((todo) => 
            todo.id === id ? { ...todo, status: !todo.status } : todo
        );
    });
};

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded xl'>

        {/* title .... */}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* inputbox....  */}

        <div className='flex items-center my-7 bg-gray-200 rounded-full '>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer' >Add +</button>
        </div>

        {/* todo list  */}
        <div>

            {todoList.map((item)=>{
                return  <TodoItems key={item.id} text={item.text} id={item.id} status={item.status} deletTodo={deletTodo} changeStatus={changeStatus} />
            })}
           
        </div>


    </div>
  )
}
export default Todo