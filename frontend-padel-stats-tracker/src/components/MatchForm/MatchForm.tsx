import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Paper, Box } from '@mui/material';
import { useCreateMatch } from '../../api/hooks/useMatches';
import { validSet } from '../../schemas/matchSchema';

const matchSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  partner: z.string().optional(),
  result: z.enum(['win', 'loss']).refine((val) => !!val, {
    message: 'Result is required',
  }),
  set1: validSet,
  set2: validSet,
  set3: validSet.optional().or(z.literal('')),
});

type MatchFormData = z.infer<typeof matchSchema>;

const todayStr = () => new Date().toISOString().slice(0, 10);

export const MatchForm = () => {
  const { mutate: addMatch, isPending } = useCreateMatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      date: todayStr(),
      location: '',
      partner: '',
      result: 'win',
      set1: '',
      set2: '',
      set3: '',
    },
  });

  const onSubmit = (data: MatchFormData) => {
    const { set1, set2, set3, ...rest } = data;

    const score = [set1, set2, set3].filter(Boolean).join(', ');

    addMatch(
      {
        ...rest,
        date: new Date(data.date),
        score,
      },
      {
        onSuccess: () =>
          reset({
            date: todayStr(),
            location: '',
            partner: '',
            result: 'win',
            set1: '',
            set2: '',
            set3: '',
          }),
      },
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        maxWidth: 900,
        mx: 'auto',
        minHeight: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.900',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 2,
        }}
      >
        <TextField
          label="Date"
          type="date"
          {...register('date')}
          error={!!errors.date}
          helperText={errors.date?.message}
        />
        <TextField
          label="Location"
          {...register('location')}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <TextField
          label="Partner"
          {...register('partner')}
          error={!!errors.partner}
          helperText={errors.partner?.message}
        />
        <TextField
          select
          label="Result"
          {...register('result')}
          error={!!errors.result}
          helperText={errors.result?.message}
          defaultValue="win"
          style={{ minWidth: 120, textAlign: 'left' }}
        >
          <MenuItem value="win">Win</MenuItem>
          <MenuItem value="loss">Loss</MenuItem>
        </TextField>
        <TextField
          label="Set 1"
          {...register('set1')}
          error={!!errors.set1}
          helperText={errors.set1?.message}
          placeholder="Example 6-4"
        />
        <TextField
          label="Set 2"
          {...register('set2')}
          error={!!errors.set2}
          helperText={errors.set2?.message}
          placeholder="Example 6-4"
        />
        <TextField
          label="Set 3 (optional)"
          {...register('set3')}
          error={!!errors.set3}
          helperText={errors.set3?.message}
          placeholder="Example 6-4"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPending ? 'Adding...' : 'Add match'}
        </Button>
      </Box>
    </Paper>
  );
};
