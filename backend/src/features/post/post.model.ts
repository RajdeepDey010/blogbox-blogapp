//the db schema for post is maintained here.
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "../../core/basemodel";
import { User } from "../user/user.model";

@Entity()
export class Post extends BaseModel {
    @Column()
    title: string

    @Column({ type: "longtext" })
    content: string

    //Foreign key refernce from User table.
    @ManyToOne(() => User, (user) => user.posts)
    user: User
}