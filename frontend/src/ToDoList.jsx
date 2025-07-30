import React, { useState } from 'react'

function ToDoList(){
    const [tasks, setTasks] = useState(["Exercise", "Code something", "Sleep around 12"]);
    const [newTask, setNewTask] = useState("");
    
    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        console.log("Task has been added.")
    }

    function deleteTask(index){
        console.log("Task has been deleted.")
    }

    function moveTaskUp(index){
        console.log("Task has been moved up.")
    }

    function moveTaskDown(index){
        console.log("Task has been moved down.")
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
                    onclick={() => deleteTask(index)}>
                        Delete Task
                    </button>
                    <button className="move-button" 
                    onclick={() => moveTaskUp(index)}>
                        Move Up ⬆️
                    </button>
                    <button className="move-button" 
                    onclick={() => moveTaskDown(index)}>
                        Move Down ⬇️
                    </button>
                </li>
            )}
        </ol>
    </div>
    );
}

export default ToDoList