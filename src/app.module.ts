import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import UserEntity from './users/users.entity';
import MessageEntity from './messages/messages.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'chat-live',
      entities: [UserEntity, MessageEntity],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 5,
    }),
    AuthModule,
    ChatModule,
    MessagesModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
