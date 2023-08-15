import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ description: 'message', type: 'string' })
  message: string;

  // @ApiProperty({ description: 'user who send the message', type: 'string' })
  // user_id?: string;
}
