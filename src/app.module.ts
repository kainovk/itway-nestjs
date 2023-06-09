import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {ProfileModule} from './profile/profile.module';
import {Profile} from "./profile/profile.model";
import { TextBlockModule } from './text-block/text-block.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Profile],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfileModule,
        TextBlockModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
