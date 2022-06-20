import { ApiProperty } from '@nestjs/swagger';
import { Contacts } from '../../../../entities/contacts.entity';

export class ContactsListResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone_no: number;

  constructor(data: Contacts) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.phone_no = data.phone_no;
  }
}
