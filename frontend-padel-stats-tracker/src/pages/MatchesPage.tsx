import { useMatches } from '../api/hooks/useMatches';
import { MatchForm } from '../components/MatchForm/MatchForm';
import { MatchesTable } from '../components/MatchTable/MatchesTable';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

const MatchesPage = () => {
  const { data, isLoading, isError } = useMatches();

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (isError) return <Typography>Error loading matches</Typography>;

  if (!data?.length) return <Typography>No matches yet — add your first one!</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        🎾 Padel Matches
      </Typography>
      <Box mb={4}>
        <MatchForm />
      </Box>
      <Box mb={4}>
        <MatchesTable matches={data} />
      </Box>
    </Container>
  );
};

export default MatchesPage;
