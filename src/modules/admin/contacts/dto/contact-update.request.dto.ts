import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isNotEmpty, IsNumber, IsString, Max, MaxLength, ValidateIf } from 'class-validator';

/**
 * Update contact request DTO
 */
export class UpdateContactRequestDto {
  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(50)
  @IsString()
  @ValidateIf(e => isNotEmpty(e.username))
  public readonly username: string;

  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(255)
  @IsString()
  @ValidateIf(e => isNotEmpty(e.email))
  public readonly email: string;

  @ApiProperty()
  @Max(999999999999)
  @IsNumber()
  @ValidateIf(e => isNotEmpty(e.phone_no))
  public readonly phone_no: number;
}
