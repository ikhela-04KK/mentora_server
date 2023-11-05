import { CanActivate, UnauthorizedException, Injectable, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    async CanActivate(context:ExecutionContext):Promise<boolean>{
        const request= context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }

        try{
            const payload = await this.jwtService.verifyAsync(token,{
                secret:process.env.jwtSecretKey
            });

            request['user'] = payload; // pourquoi on fournir encore le payload pour capturer la requête 

        }
        catch{
            throw new UnauthorizedException();
        }
        return true; 
    }
        // implementation de extractTokenFromHeader 
        private extractTokenFromHeader(request:Request): string | undefined{
            const [type, token] = request.headers.authorization?.split(' ') ?? []; 
            return type ==='Bearer' ? token: undefined; 
        }

}

