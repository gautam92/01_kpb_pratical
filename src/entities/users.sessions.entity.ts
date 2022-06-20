import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from './users.entity';

@Table({
  tableName: 'usersessions',
  timestamps: true,
  updatedAt: false,
})
export class UserSessions extends Model<UserSessions> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  usersessionid: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  jwttoken: string;

  @CreatedAt
  created_date: Date;

  @BelongsTo(() => Users)
  user: Users;
}
