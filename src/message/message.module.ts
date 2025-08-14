import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "src/chat/model.chat";
import { User } from "src/user/model.user";
import { Message } from "./model.message";
import { MessageService } from "./message.service";
import { MessGateWay } from "./message-gateway";


@Module({
    controllers:[],
    providers:[MessageService,MessGateWay],
    imports:[
        SequelizeModule.forFeature([User,Chat,Message])
    ],
    exports:[
    ]
})
export class messageModule {
    
}