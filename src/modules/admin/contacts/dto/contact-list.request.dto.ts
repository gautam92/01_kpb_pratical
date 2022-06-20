import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationRequestDto } from '../../../../dto/pagination.request.dto';

/**
 * List contact request DTO
 */
export class ContactListRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @Transform(value => value.trim())
  @MaxLength(50)
  @IsString()
  @IsOptional()
  public readonly search: string;
}
