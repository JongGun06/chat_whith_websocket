import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chat } from "./model.chat";
import { or } from "sequelize";
import { Op } from "sequelize";
import { Message } from "src/message/model.message";


@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat) private chatRepo:typeof Chat){}

    async findOrCreateChat(myId:number, otherUserId:number){
        if (typeof myId !== 'number' || typeof otherUserId !== 'number') {
            throw new Error('Invalid user IDs');
        }
            let chat = await this.chatRepo.findOne({
                where:{
                    [Op.or]:[
                        { user1Id: myId, user2Id: otherUserId },
                        { user1Id: otherUserId, user2Id: myId }
                    ]
                },
                include:{model:Message}
            })
            if(chat){
                return chat
            }

        let newChat = await this.chatRepo.create({user1Id: myId, user2Id: otherUserId})
        return newChat
    }
}