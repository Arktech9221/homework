import json
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

TASKS_FILE = "tasks.txt"


class Task(BaseModel):
    id: int
    title: str
    priority: str
    isDone: bool = False


class TaskCreate(BaseModel):
    title: str
    priority: str


# Хранилище задач в памяти
tasks: List[Task] = []
next_id: int = 1


def load_tasks():
    """Загрузка задач из файла при старте сервера."""
    global tasks, next_id
    
    if not os.path.exists(TASKS_FILE):
        return
    
    try:
        with open(TASKS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            tasks = [Task(**task) for task in data]
            if tasks:
                next_id = max(task.id for task in tasks) + 1
    except (json.JSONDecodeError, IOError):
        tasks = []
        next_id = 1


def save_tasks():
    """Сохранение задач в файл."""
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump([task.dict() for task in tasks], f, ensure_ascii=False, indent=2)


@app.on_event("startup")
async def startup_event():
    """Загрузка задач при старте сервера."""
    load_tasks()


@app.post("/tasks", response_model=Task)
def create_task(task_create: TaskCreate):
    """Создание новой задачи."""
    global next_id
    
    task = Task(
        id=next_id,
        title=task_create.title,
        priority=task_create.priority,
        isDone=False
    )
    tasks.append(task)
    next_id += 1
    
    save_tasks()
    return task


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    """Получение списка всех задач."""
    return tasks


@app.post("/tasks/{task_id}/complete")
def complete_task(task_id: int):
    """Отметка задачи как выполненной."""
    for task in tasks:
        if task.id == task_id:
            task.isDone = True
            save_tasks()
            return {}
    
    raise HTTPException(status_code=404, detail="Task not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
