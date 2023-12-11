
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString} from 'class-validator'




export class CreateUserDto {
  @ApiProperty()
@IsNotEmpty()
@IsString()
email: string ;
@ApiProperty()
@IsNotEmpty()
@IsString()
password: string ;
@ApiProperty()
@IsNotEmpty()
@IsString()
name: string ;
@ApiProperty()
@IsNotEmpty()
@IsString()
avatar: string ;
@ApiProperty()
@IsNotEmpty()
@IsString()
location: string ;
}
