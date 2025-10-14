import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsDateString()
  date!: Date;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  partner?: string;

  @IsEnum(['win', 'loss'])
  result!: 'win' | 'loss';

  @IsOptional()
  @IsString()
  score?: string;
}
