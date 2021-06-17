import {Body, Controller, UseGuards, Post, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';
import {UsersService} from './users.service';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles-auth.decorator';
import {AddRoleDto} from './dto/add-role.dto';
import {BanUserDto} from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Create a user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Assign a role'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban a user'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }
}
