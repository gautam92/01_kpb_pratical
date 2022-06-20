import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';

/**
 * Create contact request DTO
 */
export class ContactCreateRequestDto {
  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty()
  @Max(999999999999)
  @IsNumber()
  @IsNotEmpty()
  public readonly phone_no: number;
}
