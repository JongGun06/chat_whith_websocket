import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { createUserDto } from "src/user/dto/create.user.dto";
import { UserService } from "src/user/user.service";
import * as bcryptjs from 'bcryptjs'
import { User } from "src/user/model.user";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private userService:UserService,private jwtService:JwtService){}

    async login(dto:createUserDto){
        let user = await this.validate(dto)
        if(user){
            return this.generateToken(user)
        }
    }

    async registration(dto:createUserDto){
        let user = await this.userService.getUser(dto.username)
        if(user){
            throw new HttpException("такой пользовтель есть", HttpStatus.BAD_REQUEST)
        }
        let passwordHash = await bcryptjs.hash(dto.password,5)
        let newUser = await this.userService.create({...dto, password:passwordHash})
        return this.generateToken(newUser)
    }

    private generateToken(user:User){
        let payload = {id: user.id, username: user.username }
        return{
            token: this.jwtService.sign(payload)
        }
    }

    private async validate(dto:createUserDto){
        let user = await this.userService.getUser(dto.username)
        if(user){
            let validate = await bcryptjs.compare(dto.password, user.password)
            if(validate && user){
                return user
            } 
        }
    }
}