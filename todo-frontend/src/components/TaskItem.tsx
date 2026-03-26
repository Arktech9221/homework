import React from 'react';
import { ListItem, ListItemText, ListItemIcon, Checkbox, Chip, IconButton } from '@mui/material';
import { Task } from '../api/tasksApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface TaskItemProps {
  task: Task;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'normal':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleCheckboxChange = () => {
    if (onToggle) {
      onToggle(task.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={task.isDone} onChange={handleCheckboxChange} />
      </ListItemIcon>
      <ListItemText
        primary={task.title}
        secondary={`ID: ${task.id}`}
        sx={{ textDecoration: task.isDone ? 'line-through' : 'none' }}
      />
      <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" sx={{ mr: 1 }} />
      <IconButton size="small" color="primary">
        <EditIcon />
      </IconButton>
      <IconButton size="small" color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;
