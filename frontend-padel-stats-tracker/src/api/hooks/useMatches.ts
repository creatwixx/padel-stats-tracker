import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../client';
import type { CreateMatch, Match, UpdateMatch } from '../../types/match';

const QUERY_KEY = ['matches'];

export const useMatches = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => apiFetch<Match[]>('/matches'),
  });

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMatch) => apiFetch<Match>('/matches', { method: 'POST', body: dto }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateMatch }) =>
      apiFetch<Match>(`/matches/${id}`, { method: 'PUT', body: dto }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiFetch<{ affected: number }>(`/matches/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};
