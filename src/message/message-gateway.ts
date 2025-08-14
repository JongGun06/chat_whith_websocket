import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageService } from "./message.service";
import {Server,Socket} from 'socket.io'
import { createMessDto } from "./dto/create.message.dto";


@WebSocketGateway({cors: {origin:'*'}})
export class MessGateWay implements OnGatewayConnection,OnGatewayDisconnect {
    constructor(private messageService:MessageService){}

    @WebSocketServer()
    server:Server

    
    handleConnection(client:Socket) {
        console.log(`пользователь - ${client.id} подключился`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() body: {chatId:number},@ConnectedSocket() client:Socket){
        client.join(`${body.chatId}`)
        let messages = await this.messageService.getMessage(body.chatId)
        client.emit('addMessages',messages)
    }



    handleDisconnect(client: Socket) {
        console.log(`пользователь - ${client.id} отключился`);
    }


    @SubscribeMessage("sendMessage")
    async handleSendMessages(@MessageBody() dto:createMessDto){
        try {
            if(dto.authorId && dto.chatId && dto.title){
                let newMessage = await this.messageService.create({...dto})
                this.server.to(`${dto.chatId}`).emit('newMessage',newMessage)
                return {succes:true,newMessage}
            }else{
                throw new Error('Отсутствуют обязательные поля');
            }
        } catch (error) {
            return {succes:false,error: error.message}
        }
    }
}
