import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model.user';
import { Chat } from './chat/model.chat';
import { Message } from './message/model.message';
import { UserModule } from './user/user.module';
import { messageModule } from './message/message.module';
import { chatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'chat-project1', 
      models: [User,Chat,Message],
      autoLoadModels:true
    }),
    UserModule,
    messageModule,
    chatModule,
    AuthModule
  ],
})
export class AppModule {}
