import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date

  @Column({default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date

  @Column({default: () => "CURRENT_TIMESTAMP"})
  deletedAt: Date
}