import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "src/chat/model.chat";
import { User } from "src/user/model.user";

interface mess {
     chatId:number 
     title:string
     img:string
     authorId:number
}


@Table({tableName:"Message"})
export class Message extends Model<Message,mess>{
    @Column({type:DataType.INTEGER, autoIncrement:true,primaryKey:true,unique:true})
    declare id:number

    @ForeignKey(() => Chat)
    @Column({type:DataType.INTEGER})
    declare chatId:number

    @Column({type:DataType.STRING})
    declare title:string

    @Column({type:DataType.STRING})
    declare img?:string

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    declare authorId:number

    @BelongsTo(() => User)
    author:User

    @BelongsTo(() => Chat)
    chat:Chat
}