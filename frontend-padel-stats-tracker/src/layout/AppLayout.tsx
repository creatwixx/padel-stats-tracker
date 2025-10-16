import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { routes } from '../routes/Routes.config';

export const AppLayout = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          top: 0,
          left: 0,
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'grey.900',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 600,
            }}
          >
            🎾 Padel Stats Tracker
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {routes.map((r) => (
              <Button
                key={r.path}
                color={location.pathname === r.path ? 'secondary' : 'inherit'}
                component={Link}
                to={r.to}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: location.pathname === r.path ? 600 : 400,
                }}
              >
                {r.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
