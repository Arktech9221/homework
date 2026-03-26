# Todo App

Приложение для управления списком задач (Todo List) с использованием React + TypeScript и FastAPI сервером.

## Функционал

- Создание новых задач с указанием названия и приоритета (низкий, средний, высокий)
- Просмотр списка всех задач
- Отметка задач как выполненных
- Фильтрация задач (показать только невыполненные)
- Сохранение данных в файл tasks.txt на сервере
- Эмуляция сервера через MSW в режиме разработки

## Запуск проекта

### Фронтенд

```bash
cd todo-frontend
npm install
npm run dev
```

### Бэкенд

```bash
cd ..
venv\Scripts\activate
pip install fastapi uvicorn
python main.py
```

## Деплой на GitHub Pages

1. Создайте репозиторий на GitHub

2. Измените поле `homepage` в файле `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```

3. Закоммитьте изменения и отправьте на GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

4. Задеплойте проект:
   ```bash
   npm run deploy
   ```

5. В настройках репозитория на GitHub:
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите ветку `gh-pages` и папку `/ (root)`
   - Сохраните изменения

6. Через несколько минут ваш проект будет доступен по адресу:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
   ```

## API endpoints

- `GET /tasks` — получение списка всех задач
- `POST /tasks` — создание новой задачи
- `POST /tasks/:id/complete` — отметка задачи как выполненной

## Структура задачи

```json
{
  "id": 1,
  "title": "Название задачи",
  "priority": "low",
  "isDone": false
}
```

Приоритеты:
- `low` — низкий
- `normal` — средний
- `high` — высокий
