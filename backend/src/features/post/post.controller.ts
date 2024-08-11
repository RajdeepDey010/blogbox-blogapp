//below are the routes for the posts.
import { Request, Response, Router } from "express";
import { RoutePaths } from "../../config/core";
import { PostDto } from "./post.dto";
import { postCreateService, postMyReadService, postReadService } from "./post.service";
import { validate } from "class-validator";

export const postRouter = Router();

//adding a post api
postRouter.post(RoutePaths.createpost, async (req: Request, res: Response) => {
    const postData = new PostDto()
    postData.title = req.body.title
    postData.content = req.body.content
    const errors = await validate(postData);
    if (errors.length) {
        res.status(400).send(errors.map(item => item.toString()))
        return;
    }
    try {
        const userId = req.body.userId;
        const response = await postCreateService(postData, userId);
        if (response instanceof Error)
            res.status(400).send(response.message)
        else
            res.status(200).send(response)
    } catch (error) {
        res.status(400).send("Error")
    }
})

//view all posts api
postRouter.get(RoutePaths.allpost, async (req: Request, res: Response) =>{
    try{
        const response = await postReadService();
        if (response instanceof Error)
            res.status(400).send(response.message)
        else
            res.status(200).send(response)
    } catch (error) {
        res.status(400).send("Error")
    }
})

//view user posts api
postRouter.get(RoutePaths.userpost, async (req: Request, res: Response) =>{
    try{
        const userId = req.params.userId;
        const response = await postMyReadService(userId);
        if (response instanceof Error) {
            return res.status(400).json({ message: response.message });
        }
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).send("Error")
    }
})