
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString} from 'class-validator'




export class UpdateUserDto {
  @ApiProperty({
  required: false,
})
@IsOptional()
@IsString()
email?: string ;
@ApiProperty({
  required: false,
})
@IsOptional()
@IsString()
password?: string ;
@ApiProperty({
  required: false,
})
@IsOptional()
@IsString()
name?: string ;
@ApiProperty({
  required: false,
})
@IsOptional()
@IsString()
avatar?: string ;
@ApiProperty({
  required: false,
})
@IsOptional()
@IsString()
location?: string ;
}
