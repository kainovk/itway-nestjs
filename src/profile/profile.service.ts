import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {User} from "../users/users.model";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) readonly profileRepository: typeof Profile,
                @InjectModel(User) readonly userRepository: typeof User) {
    }

    async createProfile(dto: CreateProfileDto) {
        const userId = dto.userId;
        const profileExist = await this.profileRepository.findOne({where: {userId}});
        if (profileExist) {
            throw new HttpException('У этого пользователя уже есть профиль', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const profile = await this.profileRepository.create(dto);
        await profile.$set('user', [user.id])
        profile.user = user;
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
}
