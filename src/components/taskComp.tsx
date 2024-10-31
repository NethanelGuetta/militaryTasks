import React, { useState, useEffect } from "react";
import { getTasks, postTask, deleteTask, updateTask } from "../services/fetch";
import { Task } from "../types/task";
import './style.css'

const TaskComp = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ name: '', status: '', priority: '', description: '' });
    const [errorMessage, setErrorMessage] = useState<string>(''); // State to store error message
    const [isChange, setIsChange] = useState<number>(1);

    useEffect(() => {
        const loadTasks = async () => {
            setErrorMessage('');
            try {
                const newImages = await getTasks();
                setTasks(newImages);
            } catch (error) {
                setErrorMessage('Failed to load tasks');
            }
        };
        loadTasks();
    }, [isChange]);

    const handleChange = e => {
        const { name, value } = e.target;
        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const addTask = async () => {
            setErrorMessage('');
            try {
                await postTask(newTask);
            } catch (error) {
                setErrorMessage('Failed to load tasks');
            }
            finally {
                setIsChange(isChange + 1);
            }
        };
        addTask();
    };

    const handleDelete = (id: number) => {
        const removeTask = async () => {
            setErrorMessage('');
            try {
                await deleteTask(id);
            } catch (error) {
                setErrorMessage('Failed to delete tasks');
            }
            finally {
                setIsChange(isChange + 1);
            }
        };
        removeTask();
    };

    const handleProgress = (id: number) => {
        const progressTask = async () => {
            setErrorMessage('');
            try {
                await updateTask(id);
            } catch (error) {
                setErrorMessage('Failed to progress tasks');
            }
            finally {
                setIsChange(isChange + 1);
            }
        };
        progressTask();
    };

    return (
        <div id="todo-container">
            <div id="header">
                <h1>Military Missions</h1>
            </div>
            <div id="todo-form">
                <form >
                    <input name="name" value={newTask.name} type="text" placeholder="Name" onChange={handleChange} />
                    <select value={newTask.status} name="status" id="" onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select value={newTask.priority} name="priority" id="" onChange={handleChange}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <input name="description" value={newTask.description} type="text" placeholder="Description" onChange={handleChange} />
                    <button id="input-button" onClick={handleSubmit}>Add Task</button>
                </form>
            </div>
            <ul id="list-container">
                {tasks.map(task => (
                    <li key={task._id} style={{ backgroundColor: task.status === 'Completed' ? 'green' : task.status === 'Pending' ? 'red' : 'orange' }}>
                        <span>
                            <h3>Nme: {task.name}</h3>
                            <p>Status: {task.status}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Description: {task.description}</p>
                        </span>
                        <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
                        {
                            task.status !== 'Completed' &&
                            <button className="update-button" onClick={() => handleProgress(task._id)}>Progress</button>
                        }
                    </li>
                ))}
            </ul>
            <div>
            </div>
        </div>
    )
}

export default TaskComp