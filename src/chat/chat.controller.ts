import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/auth/jwt.guard";

@Controller('/chat')
export class ChatController{
    constructor(private chatService:ChatService){}

    @UseGuards(AuthGuard)
    @Post('')
    async findOrCreateChat(@Body() body: {otherId:number}, @Req() req){
        let myId = req.user.id 
        return this.chatService.findOrCreateChat(myId,body.otherId)
    }
}