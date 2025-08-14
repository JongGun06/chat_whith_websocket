import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model.user";
import { createUserDto } from "./dto/create.user.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepo:typeof User){}

    async create(dto:createUserDto){
        let user = await this.userRepo.create(dto)
        return user
    }


    async getAllUser(){
        let users = await this.userRepo.findAll()
        return users
    }

    async getUser(username:string){
        let user = await this.userRepo.findOne({where:{username}})
        return user
    }

    async getUserById(id:number){
        let user = await this.userRepo.findByPk(id)
        return user
    }
}