import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MatchesModule],
})
export class AppModule {}
