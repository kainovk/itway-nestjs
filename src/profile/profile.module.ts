import {Module} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {ProfileController} from './profile.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Profile} from "./profile.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [
        SequelizeModule.forFeature([User, Profile]),
        UsersModule,
        AuthModule
    ],
    exports: [
        ProfileService
    ]
})
export class ProfileModule {
}
