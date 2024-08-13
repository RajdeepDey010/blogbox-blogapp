"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateService = postCreateService;
exports.postAllReadService = postAllReadService;
exports.postMyReadService = postMyReadService;
exports.postUpdateService = postUpdateService;
exports.postDelService = postDelService;
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
function postCreateService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.User.findOne({ where: { id: data.userId } });
            if (!user) {
                throw new Error('User not found');
            }
            const post = new post_model_1.Post();
            post.title = data.title;
            post.content = data.content;
            post.user = user;
            post_model_1.Post.create(post);
            yield post_model_1.Post.save(post);
            return ({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                userId: post.user.id,
                firstName: post.user.firstName,
                lastName: post.user.lastName
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function postAllReadService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield post_model_1.Post.find({ relations: ["user"] });
            return posts.map((item) => ({
                id: item.id,
                title: item.title,
                content: item.content,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                userId: item.user.id,
                firstName: item.user.firstName,
                lastName: item.user.lastName
            }));
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function postMyReadService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.User.findOne({ where: { id: userId }, relations: ['posts'] });
            if (!user) {
                throw new Error('User not found');
            }
            console.log(user);
            return user.posts.map((item) => ({
                id: item.id,
                title: item.title,
                content: item.content,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }));
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function postUpdateService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        try {
            const user = yield user_model_1.User.findOne({ where: { id: data.userId } });
            if (!user) {
                throw new Error('User not found');
            }
            const post = yield post_model_1.Post.findOne({ where: { id: data.postId, user: user } });
            if (!post) {
                throw new Error('Post not found or does not belong to the user');
            }
            post.title = data.title;
            post.content = data.content;
            post.updatedAt = new Date();
            // post.user = user;
            return yield post_model_1.Post.save(post);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function postDelService(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            const post = yield post_model_1.Post.findOne({ where: { id: postId, user: user } });
            if (!post) {
                throw new Error('Post does not belong to the user!');
            }
            yield post_model_1.Post.remove(post);
            return 'Post delete success';
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
