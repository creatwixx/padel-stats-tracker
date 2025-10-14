import { DataSource, DeepPartial } from 'typeorm';
import { Match } from '../matches/entities/match.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'padel_user',
  password: process.env.DB_PASSWORD || 'padel_pass',
  database: process.env.DB_NAME || 'padel_stats',
  entities: [Match],
  synchronize: false,
});

const seed = async () => {
  await AppDataSource.initialize();

  console.log('Connected to database, seeding data...');

  const matchRepo = AppDataSource.getRepository(Match);

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

  const entities = matchRepo.create(matches);
  await matchRepo.save(entities);

  console.log('Seed completed successfully!');
  await AppDataSource.destroy();
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
