import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Task } from '../api/tasksApi';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
}

interface FormData {
  title: string;
  priority: 'low' | 'normal' | 'high';
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    priority: 'normal',
  });

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onAdd({
        title: formData.title.trim(),
        priority: formData.priority,
        isDone: false,
      });
      setFormData({ title: '', priority: 'normal' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ title: '', priority: 'normal' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <TextField
          autoFocus
          label="Название задачи"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Приоритет</InputLabel>
          <Select
            value={formData.priority}
            label="Приоритет"
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as 'low' | 'normal' | 'high' })
            }
          >
            <MenuItem value="low">Низкий</MenuItem>
            <MenuItem value="normal">Средний</MenuItem>
            <MenuItem value="high">Высокий</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!formData.title.trim()}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
