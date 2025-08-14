import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "src/user/dto/create.user.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/login')
    login(@Body() dto:createUserDto){
        return this.authService.login(dto)
    }

    @Post('/registration')
    registration(@Body() dto:createUserDto){
        return this.authService.registration(dto)
    }
}