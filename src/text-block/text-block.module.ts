import {Module} from '@nestjs/common';
import {TextBlockService} from './text-block.service';
import {TextBlockController} from './text-block.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [TextBlockService],
    controllers: [TextBlockController],
    imports: [
        SequelizeModule.forFeature([TextBlock]),
        AuthModule
    ], exports: [
        TextBlockService
    ]
})
export class TextBlockModule {
}
