import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import  {Request} from 'express';
import { Observable } from 'rxjs';

export class JwtGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    async CanActiavte(context:ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request); 
        if(!token){
            throw new UnauthorizedException()
        }
        try{
             const payload = await this.jwtService.verifyAsync(token,{ 
                secret:process.env.jwtSecretKey})
                request['user'] = payload; 
        }
        catch{
            throw new UnauthorizedException(); 
        }
        return true; 
    }

    private extractTokenFromHeader(request:Request){
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type == 'Bearer' ? token: undefined; 
    }
    
}