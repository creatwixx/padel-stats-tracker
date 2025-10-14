import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MatchesService } from '../services/matches.services';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { CreateMatchDto } from '../dto/create-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMatchDto) {
    return this.matchesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.matchesService.delete(id);
  }
}
