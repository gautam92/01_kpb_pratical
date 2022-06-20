import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash: string;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date;
}
