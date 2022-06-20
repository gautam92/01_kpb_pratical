import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  data: object;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isError: boolean;
}
