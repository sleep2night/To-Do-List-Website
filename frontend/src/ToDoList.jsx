import React, { useState } from 'react'

function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    
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
                    <span className="text">{task}</span>
                    <button className="delete-button" 
                    onClick={() => deleteTask(index)}>
                        Delete Task
                    </button>
                    <button className="move-button" 
                    onClick={() => moveTaskUp(index)}>
                        Move Up ⬆️
                    </button>
                    <button className="move-button" 
                    onClick={() => moveTaskDown(index)}>
                        Move Down ⬇️
                    </button>
                </li>
            )}
        </ol>
    </div>
    );
}

export default ToDoList