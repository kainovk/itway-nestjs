import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {ProfileService} from "./profile.service";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {UpdateProfileDto} from "./dto/update-profile.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Post('/register')
    createProfile(@Body() dto: CreateProfileDto) {
        return this.profileService.createProfile(dto);
    }

    @Get('/:userId')
    getUserProfile(@Param('userId') userId: number) {
        return this.profileService.getUserProfile(userId);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Put()
    updateProfile(@Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfileByUserId(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete('/:userId')
    deleteProfile(@Param('userId') userId: number) {
        return this.profileService.deleteProfileByUserId(userId);
    }
}
