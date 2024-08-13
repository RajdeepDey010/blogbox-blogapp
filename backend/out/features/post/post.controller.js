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
exports.postRouter = void 0;
//below are the routes for the posts.
const express_1 = require("express");
const core_1 = require("../../config/core");
const post_dto_1 = require("./post.dto");
const post_service_1 = require("./post.service");
const class_validator_1 = require("class-validator");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const util_1 = require("../../utils/util");
exports.postRouter = (0, express_1.Router)();
//adding a post, api
exports.postRouter.post(core_1.RoutePaths.createpost, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = new post_dto_1.PostDto();
    postData.title = req.body.title;
    postData.content = req.body.content;
    postData.userId = req.body.userId;
    const errors = yield (0, class_validator_1.validate)(postData);
    if (errors.length) {
        res.status(400).json((0, util_1.getErrorDetails)(errors));
        return;
    }
    try {
        const response = yield (0, post_service_1.postCreateService)(postData);
        res.send(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
//view all posts, api
exports.postRouter.get(core_1.RoutePaths.allpost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, post_service_1.postAllReadService)();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
//view user posts, api
exports.postRouter.get(core_1.RoutePaths.userpost, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield (0, post_service_1.postMyReadService)(userId);
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
//to update a user post, api
exports.postRouter.put(core_1.RoutePaths.editpost, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = new post_dto_1.EditPostDto();
        postData.title = req.body.title;
        postData.content = req.body.content;
        postData.userId = req.body.userId;
        postData.postId = req.body.postId;
        const errors = yield (0, class_validator_1.validate)(postData);
        if (errors.length) {
            res.status(400).json((0, util_1.getErrorDetails)(errors));
            return;
        }
        const response = yield (0, post_service_1.postUpdateService)(postData);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
//to delete a user post, api
exports.postRouter.delete(core_1.RoutePaths.delpost, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const response = yield (0, post_service_1.postDelService)(userId, postId);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
