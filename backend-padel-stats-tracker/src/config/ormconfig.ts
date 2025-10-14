import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Match } from '../matches/entities/match.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'padel_user',
  password: process.env.DB_PASSWORD || 'padel_pass',
  database: process.env.DB_NAME || 'padel_stats',
  autoLoadEntities: true,
  synchronize: true,
};
