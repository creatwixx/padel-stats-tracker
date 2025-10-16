import { DataSource, DeepPartial } from 'typeorm';
import { Match } from '../matches/entities/match.entity';

export const seed = async (dataSource: DataSource) => {
  const matchRepo = dataSource.getRepository(Match);

  const existingCount = await matchRepo.count();
  if (existingCount > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  console.log('Connected to database, seeding data...');

  const matches: DeepPartial<Match>[] = [
    {
      date: new Date('2025-10-10'),
      location: 'Padel Arena Varna',
      partner: 'Ivan Petrov',
      result: 'win',
      score: '6-4, 6-3',
    },
    {
      date: new Date('2025-10-11'),
      location: 'Padel Sofia Club',
      partner: 'Georgi Dimitrov',
      result: 'loss',
      score: '4-6, 3-6',
    },
    {
      date: new Date('2025-10-12'),
      location: 'Padel Burgas Court',
      partner: 'Petar Iliev',
      result: 'win',
      score: '7-5, 6-4',
    },
  ];

  await matchRepo.save(matches);
  console.log('Database seeded successfully!');
};
