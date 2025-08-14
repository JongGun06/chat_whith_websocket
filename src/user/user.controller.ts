import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/jwt.guard";

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAllUser()
    }

    @UseGuards(AuthGuard)
    @Get(':username')
    getUser(@Param('username') username:string){
        return this.userService.getUser(username)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getUserById(@Param('id') id:number){
        return this.userService.getUserById(id)
    }
}