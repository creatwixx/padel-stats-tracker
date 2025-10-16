export type MatchResult = 'win' | 'loss';

export interface Match {
  id: number;
  date: Date;
  location: string;
  partner?: string;
  result: MatchResult;
  score?: string;
  created_at: string;
}

export interface CreateMatch {
  date: Date;
  location: string;
  partner?: string;
  result: MatchResult;
  score?: string;
}

export type UpdateMatch = Partial<CreateMatch>;
