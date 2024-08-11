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
        const user = await User.findOne({ where: { id: userId }, relations: ['posts'] });
        if (!user) {
            return new Error('User not found');
        }
        return user.posts;
    } catch (error: any) {
        return new Error(error);
    }
}

export async function postUpdateService(data: PostDto, userId: string, postId: string): Promise<Post | Error> {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return new Error('User not found');
        }

        const post = await Post.findOne({ where: { id: postId, user: user } });
        if (!post) {
            return new Error('Post not found or does not belong to the user');
        }
        post.title = data.title;
        post.content = data.content;
        // post.user = user;
        return Post.save(post);
    } catch (error: any) {
        return new Error(error);
    }

}

export async function postDelService(userId: string, postId: string): Promise<string | Error> {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return new Error('User not found');
        }

        const post = await Post.findOne({ where: { id: postId, user: user } });
        if (!post) {
            return new Error('Post does not belong to the user!');
        }
        await Post.remove(post);
        return 'Post delete success';
    } catch (error: any) {
        return new Error(error);
    }

}