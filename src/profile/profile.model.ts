import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface ProfileCreationAttributes {
    first_name: string;
    last_name: string;
    phone_number: string;
    userId: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    first_name: string;

    @Column({type: DataType.STRING})
    last_name: string;

    @Column({type: DataType.STRING})
    phone_number: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
