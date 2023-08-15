import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'username', type: 'string' })
  username: string;

  @ApiProperty({ description: 'Password', type: 'string' })
  password: string;
}
export default RegisterDto;
