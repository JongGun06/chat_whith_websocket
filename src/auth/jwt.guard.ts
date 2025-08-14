import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            let req = context.switchToHttp().getRequest()

            let authHeader = req.headers.authorization
            let bearer = authHeader.split(' ')[0]
            let token = authHeader.split(' ')[1]
            if(bearer !== "Bearer" || !token){
                throw new UnauthorizedException("не зарегестрирован")
            }
            let user = this.jwtService.verify(token)
            req.user = user 
            return true
        } catch (error) {
            throw new UnauthorizedException("не зарегестрирован")
        }
    }
}