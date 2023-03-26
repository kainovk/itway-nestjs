import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Post()
    createProfile(@Body() dto: CreateProfileDto) {
        return this.profileService.createProfile(dto);
    }

    @Get('/:userId')
    getUserProfile(@Param('userId') userId: number) {
        return this.profileService.getUserProfile(userId);
    }
}
