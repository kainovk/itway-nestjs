import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {
    }

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
