import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// import UserEntity from '../users/users.entity';

@Entity('messages')
class MessageEntity {
  @ApiProperty({ description: 'id as uuid', type: 'string' })
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty({ description: 'id as uuid', type: 'string' })
  @Column()
  public message: string;
}

export default MessageEntity;
