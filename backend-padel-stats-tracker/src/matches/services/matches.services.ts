import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Match } from '../entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { CreateMatchDto } from '../dto/create-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  findAll() {
    return this.matchRepository.find();
  }

  create(dto: CreateMatchDto) {
    const match = this.matchRepository.create(dto);
    return this.matchRepository.save(match);
  }

  async update(id: number, dto: UpdateMatchDto) {
    await this.matchRepository.update(id, dto);
    return this.matchRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.matchRepository.delete(id);
  }
}
