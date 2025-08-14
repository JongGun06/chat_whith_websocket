import { forwardRef, Module } from "@nestjs/common";
import { User } from "src/user/model.user";
import { Chat } from "./model.chat";
import { Message } from "src/message/model.message";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";


@Module({
    controllers:[ChatController],
    providers:[ChatService],
    imports:[
        SequelizeModule.forFeature([User,Chat,Message]),
        forwardRef(() => AuthModule)
    ],
    exports:[
        
    ]
})
export class chatModule {
    
}