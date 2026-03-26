import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Switch, FormControlLabel } from '@mui/material';
import { Task } from './api/tasksApi';
import { tasksApi } from './api/tasksApi';
import TaskList from './components/TaskList';
import AddTaskButton from './components/AddTaskButton';
import AddTaskDialog from './components/AddTaskDialog';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showOnlyUncompleted, setShowOnlyUncompleted] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const loadedTasks = await tasksApi.getAllTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    }
  };

  const handleAddTask = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTaskAdd = async (newTask: Omit<Task, 'id'>) => {
    try {
      const createdTask = await tasksApi.createTask({
        title: newTask.title,
        priority: newTask.priority,
      });
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await tasksApi.completeTask(id);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isDone: true } : task
        )
      );
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = showOnlyUncompleted
    ? tasks.filter((task) => !task.isDone)
    : tasks;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            Todo List
          </Typography>
          <AddTaskButton onClick={handleAddTask} />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyUncompleted}
              onChange={(e) => setShowOnlyUncompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Показать только невыполненные задачи"
          sx={{ mb: 2 }}
        />
        <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      </Paper>
      <AddTaskDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onAdd={handleTaskAdd}
      />
    </Container>
  );
};

export default App;
