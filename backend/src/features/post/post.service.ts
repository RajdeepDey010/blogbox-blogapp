import { User } from "../user/user.model";
import { EditPostDto, GetPostDto, PostDto } from "./post.dto";
import { Post } from "./post.model";

export async function postCreateService(data: PostDto): Promise<GetPostDto | Error> {
    try {
        const user = await User.findOne({ where: { id: data.userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const post = new Post();
        post.title = data.title;
        post.content = data.content;
        post.user = user;
        Post.create(post);
        await Post.save(post);
        return ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            userId: post.user.id,
            firstName: post.user.firstName,
            lastName: post.user.lastName
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function postAllReadService(): Promise<GetPostDto[] | Error> {
    try {
        const posts = await Post.find({ relations: ["user"] });
        return posts.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            userId: item.user.id,
            firstName: item.user.firstName,
            lastName: item.user.lastName
        }))
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function postMyReadService(userId: string): Promise<GetPostDto[] | Error> {
    try {
        const user = await User.findOne({ where: { id: userId }, relations: ['posts'] });
        if (!user) {
            throw new Error('User not found');
        }
        console.log(user)
        return user.posts.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function postUpdateService(data: EditPostDto): Promise<Post | Error> {
    console.log(data)
    try {
        const user = await User.findOne({ where: { id: data.userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const post = await Post.findOne({ where: { id: data.postId, user: user } });
        if (!post) {
            throw new Error('Post not found or does not belong to the user');
        }
        post.title = data.title;
        post.content = data.content;
        post.updatedAt = new Date()
        // post.user = user;
        return await Post.save(post);
    } catch (error: any) {
        throw new Error(error);
    }

}

export async function postDelService(userId: string, postId: string): Promise<string | Error> {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const post = await Post.findOne({ where: { id: postId, user: user } });
        if (!post) {
            throw new Error('Post does not belong to the user!');
        }
        await Post.remove(post);
        return 'Post delete success';
    } catch (error: any) {
        throw new Error(error);
    }

}