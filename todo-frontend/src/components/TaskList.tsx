import React from 'react';
import { List, ListSubheader } from '@mui/material';
import { Task } from '../api/tasksApi';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title, onToggle, onDelete }) => {
  return (
    <>
      {title && <ListSubheader>{title}</ListSubheader>}
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </List>
    </>
  );
};

export default TaskList;
