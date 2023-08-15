import { ApiProperty } from '@nestjs/swagger';

export class SingInDto {
  @ApiProperty({ description: 'username', type: 'string' })
  username: string;

  @ApiProperty({ description: 'Password', type: 'string' })
  password: string;
}
export default SingInDto;
