import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

async function initApp() {
  // Проверяем, запущен ли реальный сервер
  const isRealServerAvailable = await fetch('http://localhost:8000/tasks')
    .then(() => true)
    .catch(() => false);

  // Если сервер недоступен, используем моки
  if (!isRealServerAvailable) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

initApp();
