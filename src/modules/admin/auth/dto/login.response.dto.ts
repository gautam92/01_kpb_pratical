import { Users } from '../../../../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly username: string;

  constructor(user: Users, token: string) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.token = token;
  }
}
