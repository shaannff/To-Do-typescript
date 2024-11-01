import React, { useState } from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_tick from '../assets/delete.png';
import { CiEdit } from "react-icons/ci";

interface TodoProp {
    text: string; 
    id: number;
    status: boolean;
    deletTodo: (id: number) => void;
    changeStatus: (id: number) => void;
    editTodo: (id: number, newText: string) => void; // New prop for editing
}

const TodoItems: React.FC<TodoProp> = ({ text, id, status, deletTodo, changeStatus, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);

    const handleSave = () => {
        editTodo(id, inputValue);
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className='flex items-center my-3 gap-2'>
            <div className='flex flex-1 items-center cursor-pointer' onClick={() => { !isEditing && changeStatus(id); }}>
                <img src={status ? tick : not_tick} alt="" />
                {isEditing ? (
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        className='ml-4 border rounded'
                    />
                ) : (
                    <p className={`text-slate-600 ml-4 text-[17px] ${status ? 'line-through' : ''}`}>{text}</p>
                )}
            </div>

            {isEditing ? (
                <button onClick={handleSave} className='w-4.5 cursor-pointer'>
                    Save
                </button>
            ) : (
                <button className='w-4.5 cursor-pointer' onClick={() => setIsEditing(true)}>
                    <CiEdit />
                </button>
            )}

            <div>
                <img onClick={() => { deletTodo(id) }} src={delete_tick} alt="" className='w-3.5 cursor-pointer' />
            </div>
        </div>
    );
};

export default TodoItems;
