import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {File} from "./files.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateFileDto} from "./dto/create-file.dto";
import {UpdateFileDto} from "./dto/update-file.dto";

@Injectable()
export class FilesService {
    constructor(@InjectModel(File) readonly fileRepository: typeof File) {
    }

    async createFile(dto: CreateFileDto): Promise<string> {
        const fileExist = await this.fileRepository.findOne({where: {name: dto.name}});
        if (fileExist) {
            throw new HttpException('Файл с таким названием уже существует', HttpStatus.BAD_REQUEST);
        }
        try {
            // запись файла
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            const fileName = dto.name + '.jpg';
            fs.writeFileSync(path.join(filePath, fileName), dto.file.buffer);

            await this.fileRepository.create({
                name: dto.name,
                essenceTable: dto.essenceTable,
                essenceId: dto.essenceId
            });

            return dto.name;
        } catch (e) {
            throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUnused() {
        const files = await this.fileRepository.findAll();
        const filesToDelete = files.filter(file => {
            const unused = file.essenceTable.length === 0 || file.essenceId === null;
            const deadlineDate = new Date(file.createdAt);
            deadlineDate.setHours(deadlineDate.getHours() + 1)
            const olderAnHour = new Date() > deadlineDate;
            return unused || olderAnHour;
        })
        const count = filesToDelete.length;
        for (const file of filesToDelete) {
            await this.fileRepository.destroy({where: {id: file.id}});
        }
        return `Удалено ${count} файлов`;
    }

    async deleteAllRelated(essenceTable: string, essenceId: number) {
        await this.fileRepository.destroy({where: {essenceTable, essenceId}});
    }

    async updateFile(dto: UpdateFileDto) {
        const file = await this.fileRepository.findOne({where: {id: dto.id}});
        if (!file) {
            throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
        }

        const updatedFile = await this.fileRepository.update({
            name: dto.name
        }, {where: {id: dto.id}});
        return updatedFile;
    }
}
