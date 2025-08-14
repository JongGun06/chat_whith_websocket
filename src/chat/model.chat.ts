import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "src/message/model.message";
import { User } from "src/user/model.user";


@Table({tableName:"chat"})
export class Chat extends Model{
    @Column({type:DataType.INTEGER, autoIncrement:true,primaryKey:true,unique:true})
    declare id:number

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    declare user1Id:number

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    declare user2Id:number

    @BelongsTo(() => User,'user1Id')
    user1:User

    @BelongsTo(() => User,'user2Id')
    user2:User

    @HasMany(() => Message)
    message:Message[]
}