import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date

  @Column({default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date

  @Column({nullable: true, default: null})
  deletedAt: Date
}