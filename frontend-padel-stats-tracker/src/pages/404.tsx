import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Page not found
      </Typography>
      <Button variant="contained" component={Link} to="/matches">
        Back to Matches
      </Button>
    </Box>
  );
};

export default NotFoundPage;
