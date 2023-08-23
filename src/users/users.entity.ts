import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import MessageEntity from '../messages/messages.entity';

@Entity('users')
class UserEntity {
  @ApiProperty({ description: 'id as uuid', type: 'string' })
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty({ description: 'username', type: 'string' })
  @Column({ unique: true })
  public username: string;

  @ApiProperty({ description: 'messages of the user', type: [MessageEntity] })
  @OneToMany(() => MessageEntity, (message) => message.sender)
  public messages: MessageEntity[];

  @ApiHideProperty()
  @Column({ select: false })
  public password: string;
}

export default UserEntity;
