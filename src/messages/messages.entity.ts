import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../users/users.entity';
// import UserEntity from '../users/users.entity';

@Entity('messages')
class MessageEntity {
  @ApiProperty({ description: 'id as uuid', type: 'string' })
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty({ description: 'Mensaje de un usuario', type: 'string' })
  @Column()
  public message: string;

  @ApiProperty({
    description: 'Usuario que envio el mensaje',
    type: UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.messages)
  public sender: UserEntity;
}

export default MessageEntity;
