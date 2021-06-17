import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'E-Mail'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: 'Invalid email address'})
    readonly email: string;

    @ApiProperty({example: '123', description: 'Password'})
    @IsString({message: 'Must be a string'})
    @Length(3, 16, {message: 'Not less than 3 and not more than 16'})
    readonly password: string;
}