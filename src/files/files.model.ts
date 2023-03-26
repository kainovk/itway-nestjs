import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttributes {
    name: string;
    essenceTable: string;
    essenceId: number;
}

@Table({tableName: 'files'})
export class File extends Model<File, FileCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    essenceTable: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    essenceId: number;
}
