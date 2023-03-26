import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {UpdateTextBlockDto} from "./dto/update-text-block.dto";

@Controller('text-block')
export class TextBlockController {
    constructor(private readonly textBlockService: TextBlockService) {
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post()
    createTextBlock(@Body() dto: CreateTextBlockDto) {
        return this.textBlockService.createTextBlock(dto);
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
    @Put()
    updateTextBlock(@Body() dto: UpdateTextBlockDto) {
        return this.textBlockService.updateTextBlock(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete('/:id')
    deleteTextBlockById(@Param('id') id: number) {
        return this.textBlockService.deleteTextBlockById(id);
    }
}
