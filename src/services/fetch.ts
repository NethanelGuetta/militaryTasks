import axios from "axios";
import {Task} from "../types/task";

const BASE_URL = "https://reactexambackend.onrender.com/missions/:8609312";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const postTask = async (body:any) => {
    try {
        const response = await axios.post(BASE_URL, body);
        console.log(response);
        
    } catch (error) {
        throw new Error('Failed to add task');
    }
}

export const deleteTask = async (id: number) => {
    console.log(id);
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error('Failed to delete task');
    }
}

export const updateTask = async (id: number) => {
    try {
        await axios.post(`${BASE_URL}/progress/${id}`);
    } catch (error) {
        throw new Error('Failed to update task');
    }
}