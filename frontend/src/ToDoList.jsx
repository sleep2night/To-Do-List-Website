import React, { useState } from 'react'

function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function handleKeyDown(event){
        if(event.key === 'Enter'){
            addTask();
        }
    }

    function addTask(){
        if(newTask.trim() !== ""){
            console.log("Task has been added.");
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function startEditing(index){
        setEditIndex(index);
        setEditedTask(tasks[index]);
    }

    function saveEditedTask(index){
        if(editedTask.trim() !== ""){
            const updatedTasks = [...tasks];
            updatedTasks[index] = editedTask.trim();
            setTasks(updatedTasks);
            setEditIndex(null);
            setEditedTask("");
            console.log("Task has been edited.")
        }
    }

    function cancelEdit(){
        setEditIndex(null);
        setEditedTask("");
    }

    function deleteTask(index){
        console.log("Task has been deleted.");
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            console.log("Task has been moved up.");
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            console.log("Task has been moved down.");
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index + 1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
    <div className="to-do-list">
        <h1>To Do List</h1>
        <div>
            <input
                type="text"
                placeholder="Enter a task "
                value = {newTask}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className="add-button" onClick={addTask}>
                Add
            </button>
        </div>
        <ol>
            {tasks.map((task, index)=>
                <li key={index}>
                    {editIndex === index ? (
                        <>
                            <input
                            type="text"
                            value={editedTask}
                            onChange={(e)=>setEditedTask(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key === 'Enter') saveEditedTask(index);
                            }}
                            />
                        </>
                    ) : (
                        <>
                            <button className="edit-button"
                            onClick={() => startEditing(index)}>
                                ✏️
                            </button>
                            <span className="text">{task}</span>
                            <button className="move-button" 
                            onClick={() => moveTaskUp(index)}>
                                ⬆️
                            </button>
                            <button className="move-button" 
                            onClick={() => moveTaskDown(index)}>
                                ⬇️
                            </button>
                            <button className="delete-button" 
                            onClick={() => deleteTask(index)}>
                                🗑️
                            </button>
                        </>
                    )}
                </li>
            )}
        </ol>
    </div>
    );
}

export default ToDoList