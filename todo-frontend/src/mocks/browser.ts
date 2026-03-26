import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:8000';

const storedTasks = localStorage.getItem('tasks');
let tasks: Array<{ id: number; title: string; priority: string; isDone: boolean }> = storedTasks 
  ? JSON.parse(storedTasks) 
  : [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const worker = setupWorker(
  http.get(`${API_BASE_URL}/tasks`, () => {
    return HttpResponse.json(tasks);
  }),

  http.post(`${API_BASE_URL}/tasks`, async ({ request }) => {
    const body = await request.json() as { title: string; priority: string };
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = {
      id: nextId,
      title: body.title,
      priority: body.priority,
      isDone: false,
    };
    tasks.push(newTask);
    saveTasks();
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.post(`${API_BASE_URL}/tasks/:id/complete`, ({ params }) => {
    const id = Number(params.id);
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }
    
    task.isDone = true;
    saveTasks();
    return new HttpResponse(null, { status: 200 });
  }),
);
