import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "src/message/model.message";

interface usert {
    username:string
    password:string
}

@Table({tableName:"user"})
export class User extends Model<User,usert>{
    @Column({type:DataType.INTEGER, autoIncrement:true,primaryKey:true,unique:true})
    declare id:number

    @Column({type:DataType.STRING, unique:true,allowNull:false})
    declare username:string 

    @Column({type:DataType.STRING,allowNull:false})
    declare password:string 

    @Column({type:DataType.STRING,allowNull:true})
    declare logo:string | null

    @HasMany(() => Message)
    message:Message[]
}