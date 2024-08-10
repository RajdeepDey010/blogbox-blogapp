import { IsEmail } from "class-validator";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../../core/basemodel";

@Entity()
export class User extends BaseModel {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  dob: Date

  @Column()
  @IsEmail({}, {message: "Invalid email format"})
  email: string

  @Column()
  password: string

  @Column({default: false})
  emailVerified?: boolean
}