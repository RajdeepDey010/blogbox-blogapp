import { User } from "../user/user.model";
import { PostDto } from "./post.dto";
import { Post } from "./post.model";

export async function postCreateService(data: PostDto, userId: string): Promise<Post | Error> {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return new Error('User not found');
        }

        const post = new Post();
        post.title = data.title;
        post.content = data.content;
        post.user = user;
        Post.create(post);
        return Post.save(post);
    } catch (error: any) {
        return new Error(error);
    }
}

export async function postReadService(): Promise<Post[] | Error> {
    try {
        return Post.find();
    } catch (error: any) {
        return new Error(error);
    }
}

export async function postMyReadService(userId: string): Promise<Post[] | Error> {
    try {
        const user = await User.findOne({ where: { id: userId }, relations: ['posts']});
        if (!user) {
            return new Error('User not found');
        }
        return user.posts;
    }catch (error: any) {
        return new Error(error);
    }
}

export function postUpdateService() { }
export function postDelService() { }