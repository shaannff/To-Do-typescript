import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_tick from '../assets/delete.png'



interface TodoProp {
    text: string; 
    id:number;
    status:boolean;
    deletTodo: (id: number) => void;
    changeStatus: (id: number) => void
  }

const TodoItems:React.FC<TodoProp> = ({text,id,status,deletTodo,changeStatus}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{changeStatus(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={status ?tick:not_tick} alt="" />
            <p className={`text-slate-600 ml-4 text-[17px] ${status?'line-through':''}`}>{text}</p>

        </div>

        <div>
            <img onClick={()=>{deletTodo(id)}} src={delete_tick} alt="" className='w-3.5 cursor-pointer' />
        </div>

    </div>
  )
}

export default TodoItems