//the db schema for user is maintained here.
import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../core/basemodel";
import { Post } from "../post/post.model";

@Entity()
export class User extends BaseModel {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  dob: string

  @Column()
  @IsEmail({}, {message: "Invalid email format"})
  email: string

  @Column()
  password: string

  @Column({default: false})
  emailVerified?: boolean

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}