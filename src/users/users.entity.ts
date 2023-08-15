import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('users')
class UserEntity {
  @ApiProperty({ description: 'id as uuid', type: 'string' })
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty({ description: 'username', type: 'string' })
  @Column({ unique: true })
  public username: string;

  @ApiHideProperty()
  @Column({ select: false })
  public password: string;
}

export default UserEntity;
