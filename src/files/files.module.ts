import {Module} from '@nestjs/common';
import {File} from "./files.model";
import {FilesService} from './files.service';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    providers: [FilesService],
    imports: [
        SequelizeModule.forFeature([File])
    ],
    exports: [
        FilesService
    ]
})
export class FilesModule {
}
