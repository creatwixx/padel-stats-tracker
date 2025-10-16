import { Button } from '@mui/material';
import { GenericTable, type Column } from '../common/Table/GenericTable';
import { formatDate } from '../../utils/date-formatter';
import type { Match } from '../../types/match';
import { useDeleteMatch } from '../../api/hooks/useMatches';

export const MatchesTable = ({ matches }: { matches: Match[] }) => {
  const { mutate: deleteMatch, isPending } = useDeleteMatch();

  const columns: Column<Match>[] = [
    { key: 'location', header: 'Location', accessor: 'location' },
    { key: 'partner', header: 'Partner', accessor: 'partner' },
    {
      key: 'result',
      header: 'Result',
      getValue: (row) => (
        <span style={{ color: row.result === 'win' ? '#4caf50' : '#f44336', fontWeight: 600 }}>
          {row.result.toUpperCase()}
        </span>
      ),
    },
    { key: 'score', header: 'Score', accessor: 'score' },
    {
      key: 'date',
      header: 'Date',
      getValue: (row) => formatDate(row.date),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      getValue: (row) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          disabled={isPending}
          onClick={() => deleteMatch(row.id)}
        >
          {isPending ? '...' : 'Delete'}
        </Button>
      ),
    },
  ];

  return <GenericTable columns={columns} data={matches} getRowKey={(row) => (row as Match).id} />;
};
