import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "./model.message";
import { createMessDto } from "./dto/create.message.dto";


@Injectable()
export class MessageService{
    constructor(@InjectModel(Message) private MessRepo:typeof Message){}

    async create(dto:createMessDto){
        let message = await this.MessRepo.create(dto)
        return message
    }

    async getMessage(chatId:number){
        let messages = await this.MessRepo.findAll({where:{chatId}})
        return messages
    }
}