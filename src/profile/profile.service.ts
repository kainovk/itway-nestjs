import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";
import {UpdateProfileDto} from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) readonly profileRepository: typeof Profile,
                @InjectModel(User) readonly userRepository: typeof User,
                private readonly userService: UsersService,
                private readonly authService: AuthService) {
    }

    async createProfile(dto: CreateProfileDto) {
        const authUser = await this.authService.registration({email: dto.email, password: dto.password});

        const profile = await this.profileRepository.create({
            first_name: dto.first_name,
            last_name: dto.last_name,
            phone_number: dto.phone_number,
            userId: authUser.user.id
        });
        await profile.$set('user', [authUser.user.id])
        profile.user = authUser.user;
        return profile;
    }

    async getUserProfile(userId: number) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const profile = await this.profileRepository.findOne({where: {userId}, include: {all: true}});
        return profile;
    }

    async updateProfileByUserId(dto: UpdateProfileDto) {
        await this.profileRepository.update({
            first_name: dto.first_name,
            last_name: dto.last_name,
            phone_number: dto.phone_number
        }, {where: {userId: dto.userId}});
        return 'Профиль обновлен!';
    }

    async deleteProfileByUserId(userId: number) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const profile = await this.profileRepository.findOne({where: {userId}});
        if (!profile) {
            throw new HttpException('Профиль не найден', HttpStatus.NOT_FOUND);
        }
        await this.profileRepository.destroy({where: {id: profile.id}});
        await this.userRepository.destroy({where: {id: userId}});
        return 'Профиль и соответствующий пользователь удалены!'
    }
}
