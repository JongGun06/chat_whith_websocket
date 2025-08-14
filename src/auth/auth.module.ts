import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./jwt.guard";
import { Message } from "src/message/model.message";
import { Chat } from "src/chat/model.chat";
import { User } from "src/user/model.user";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "src/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    controllers:[AuthController],
    providers:[AuthService,AuthGuard],
    imports:[
        SequelizeModule.forFeature([User,Chat,Message]),
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: 'hi bro', 
            signOptions: { expiresIn: '24h' },
        }),
    ],
    exports:[
        AuthGuard,
        AuthService,
        JwtModule
    ]
})
export class AuthModule{}