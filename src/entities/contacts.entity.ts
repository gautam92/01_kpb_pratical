import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Users } from './users.entity';

@Table({
  tableName: 'contacts',
  timestamps: true,
  paranoid: true,
})
export class Contacts extends Model<Contacts> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  phone_no: number;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date;

  @BelongsTo(() => Users)
  user: Users;
}
