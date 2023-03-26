import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "../roles/dto/add-role.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
