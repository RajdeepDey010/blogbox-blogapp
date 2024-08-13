//below are the routes for the posts.
import { Request, Response, Router } from "express";
import { RoutePaths } from "../../config/core";
import { EditPostDto, PostDto } from "./post.dto";
import { postAllReadService, postCreateService, postDelService, postMyReadService, postUpdateService } from "./post.service";
import { validate } from "class-validator";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getErrorDetails } from "../../utils/util";

export const postRouter = Router();

//adding a post, api
postRouter.post(RoutePaths.createpost, authMiddleware, async (req: Request, res: Response) => {
    const postData = new PostDto()
    postData.title = req.body.title
    postData.content = req.body.content
    postData.userId = req.body.userId
    const errors = await validate(postData);
    if (errors.length) {
        res.status(400).json(getErrorDetails(errors))
        return;
    }
    try {
        const response = await postCreateService(postData);
        res.send(response)
    } catch (error) {
        res.status(400).send(getErrorDetails(error as Error))
    }
});

//view all posts, api
postRouter.get(RoutePaths.allpost, async (req: Request, res: Response) => {
    try {
        const response = await postAllReadService();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(getErrorDetails(error as Error))
    }
});

//view user posts, api
postRouter.get(RoutePaths.userpost, authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await postMyReadService(userId);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).send(getErrorDetails(error as Error))
    }
});

//to update a user post, api
postRouter.put(RoutePaths.editpost, authMiddleware, async (req: Request, res: Response) => {
    try {
        const postData = new EditPostDto()
        postData.title = req.body.title
        postData.content = req.body.content
        postData.userId = req.body.userId
        postData.postId = req.body.postId
        const errors = await validate(postData);
        if (errors.length) {
            res.status(400).json(getErrorDetails(errors))
            return;
        }

        const response = await postUpdateService(postData);
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(getErrorDetails(error as Error))
    }
});

//to delete a user post, api
postRouter.delete(RoutePaths.delpost, authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const response = await postDelService(userId, postId);
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(getErrorDetails(error as Error))
    }
});