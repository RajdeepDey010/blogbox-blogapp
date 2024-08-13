import { IsNotEmpty } from "class-validator"

export class PostDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string
}

export class EditPostDto extends PostDto {
    @IsNotEmpty()
    postId: string
}

export class GetPostDto {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    firstName: string
    lastName: string
}