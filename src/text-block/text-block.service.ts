import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {UpdateTextBlockDto} from "./dto/update-text-block.dto";

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlock) readonly textBlockRepository: typeof TextBlock) {
    }

    async createTextBlock(dto: CreateTextBlockDto) {
        const textBlockExist = await this.textBlockRepository.findOne({where: {search_name: dto.search_name}});
        if (textBlockExist) {
            throw new HttpException('Текстовый блок с таким названием для поиска уже существует', HttpStatus.BAD_REQUEST);
        }
        return await this.textBlockRepository.create(dto);
    }

    async getAllTextBlocks() {
        return await this.textBlockRepository.findAll();
    }

    async getTextBlocksByGroup(group: any) {
        return this.textBlockRepository.findAll({where: {group}})
    }

    async getTextBlockBySearchName(name: string) {
        return this.textBlockRepository.findOne({where: {search_name: name}});
    }

    async updateTextBlock(dto: UpdateTextBlockDto) {
        const textBlock = await this.textBlockRepository.findByPk(dto.id);
        if (!textBlock) {
            throw new HttpException('Текстовый блок не найден', HttpStatus.NOT_FOUND)
        }

        await this.textBlockRepository.update({
            name: dto.name,
            image: dto.image,
            text: dto.text,
            group: dto.group
        }, {where: {id: dto.id}});
        return 'Тестовый блок обновлен обновлен!';
    }

    async deleteTextBlockById(id: number) {
        const textBlock = await this.textBlockRepository.findByPk(id);
        if (!textBlock) {
            throw new HttpException('Текстовый блок не найден', HttpStatus.NOT_FOUND)
        }
        await this.textBlockRepository.destroy({where: {id}})
        return 'Текстовый блок удален';
    }
}
