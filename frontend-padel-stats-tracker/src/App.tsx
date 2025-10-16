import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#38b000' },
      background: { default: '#121212', paper: '#1e1e1e' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
