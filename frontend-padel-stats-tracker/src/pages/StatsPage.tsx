import { Typography, Box } from '@mui/material';

const StatsPage = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Stats Page
      </Typography>
      <Typography variant="body1">
        Here you’ll be able to see your match statistics soon.
      </Typography>
    </Box>
  );
};

export default StatsPage;
