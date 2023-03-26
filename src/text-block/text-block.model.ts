import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TextBlockCreationAttributes {
    search_name: string;
    name: string;
    image_name: string;
    text: string;
    group: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    search_name: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING})
    image_name: string;

    @Column({type: DataType.STRING})
    text: string;

    @Column({type: DataType.STRING})
    group: string;
}
