import React, { useState, useEffect } from 'react'


function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTasks = localStorage.getItem('todoTasks');
        console.log('Loading from localStorage:', savedTasks);
        if(savedTasks) {
            setTasks(JSON.parse(savedTasks));
            console.log('Tasks loaded:', JSON.parse(savedTasks));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            console.log('Saving tasks to localStorage:', tasks);
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

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
            <button className="blue-button" onClick={addTask}>
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
                            <button className="save-button" onClick={() => saveEditedTask(index)}>Save</button>
                            <button className="red-button" onClick={() => cancelEdit(index)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="blue-button" onClick={() => startEditing(index)}>
                                ✏️
                            </button>
                            <span className="text">{task}</span>
                            <button className="move-button" onClick={() => moveTaskUp(index)}>
                                ⬆️
                            </button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}>
                                ⬇️
                            </button>
                            <button className="red-button" onClick={() => deleteTask(index)}>
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