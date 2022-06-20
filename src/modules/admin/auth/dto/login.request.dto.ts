import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { validateEmail } from '../../../../validations/decorator/email';

export class LoginRequestDto {
  @ApiProperty()
  @Transform(value => value.trim())
  @MaxLength(255)
  @validateEmail({ message: 'Invalid email format' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @Transform(value => value.trim())
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
