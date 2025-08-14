import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model.user";
import { Chat } from "src/chat/model.chat";
import { Message } from "src/message/model.message";
import { AuthModule } from "src/auth/auth.module";


@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:[
        SequelizeModule.forFeature([User,Chat,Message]),
        AuthModule
    ],
    exports:[
        UserService,
    ]
})
export class UserModule {

}