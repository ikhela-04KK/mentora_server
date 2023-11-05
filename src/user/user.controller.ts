import { Controller, Get, Param } from '@nestjs/common';
import{ UserService} from "./user.service"


// creation d'une api qui retourne le profile utilisateur 
@Controller('user')
export class UserController {
    constructor (private userService:UserService){}
    @Get(":id")
    async getUserProfile(@Param("id") id:number){
        return await this.userService.findById(id);
    }
}
