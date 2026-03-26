import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number;
  title: string;
  priority: 'low' | 'normal' | 'high';
  isDone: boolean;
}

export interface CreateTaskDto {
  title: string;
  priority: 'low' | 'normal' | 'high';
}

export const tasksApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  completeTask: async (id: number): Promise<void> => {
    await api.post(`/tasks/${id}/complete`);
  },
};
