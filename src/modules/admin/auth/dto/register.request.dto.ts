import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validateEmail } from '../../../../validations/decorator/email';

export class RegisterRequestDto {
  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(255)
  @validateEmail({ message: 'Invalid email format' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(24)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
