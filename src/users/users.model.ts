import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
