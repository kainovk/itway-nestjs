import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {UpdateTextBlockDto} from "./dto/update-text-block.dto";
import {FilesService} from "../files/files.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('text-block')
export class TextBlockController {
    constructor(private readonly textBlockService: TextBlockService,
                private readonly fileService: FilesService) {
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async createTextBlock(@Body() textBlockDto: CreateTextBlockDto,
                          @UploadedFile() image) {
        const textBlock = await this.textBlockService.createTextBlock(textBlockDto);
        const fileName = await this.fileService.createFile({
            file: image,
            name: textBlock.image_name,
            essenceTable: 'text_block',
            essenceId: textBlock.id
        });
        return `Файл создан. Имя файла на диске: ${fileName}`;
    }

    @Delete('/unused-files')
    deleteUnusedFiles() {
        return this.fileService.deleteUnused();
    }

    @Get()
    getAllTextBlocks() {
        return this.textBlockService.getAllTextBlocks();
    }

    @Get('/by-name')
    getTextBlockBySearchName(@Query('name') name: string) {
        return this.textBlockService.getTextBlockBySearchName(name);
    }

    @Get('/by-group')
    getTextBlocksByGroup(@Query('group') group: string) {
        return this.textBlockService.getTextBlocksByGroup(group);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image'))
    @Put()
    async updateTextBlock(@Body() dto: UpdateTextBlockDto,
                          @UploadedFile() image) {
        if (image) {
            await this.fileService.updateFile({
                id: dto.file_id,
                file: image,
                name: dto.image_name
            });
        }
        return this.textBlockService.updateTextBlock(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete('/:id')
    deleteTextBlockById(@Param('id') id: number) {
        this.fileService.deleteAllRelated('text_block', id);
        return this.textBlockService.deleteTextBlockById(id);
    }
}
