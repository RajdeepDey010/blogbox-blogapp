//below are the routes for user login & signup
import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { RoutePaths } from "../../config/core";
import { GetUserDto } from "./user.dto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getUserService } from "./user.service";

//using express router
export const userRouter = Router()

//the user login api
userRouter.post(RoutePaths.getUser, authMiddleware, async (req: Request, res: Response) => {
  //below defining a reference for the login reguest body structure from LoginDto class, doing it for proper validation
  const data = new GetUserDto()
  data.email = req.body.email;
  //if any error is found then validate returna an arrray.It is a promise, so awaiting it.
  const errors = await validate(data);
  if (errors.length) {
    res.status(400).send(errors.map(item => item.toString()))
  }
  else {
    //handling the promise validate()
    try {
      const response = await getUserService(data)
      
      if (response)
        res.status(200).send(response)
      else
        res.status(200).send("User does not exist")
    } catch (error) {
      res.status(400).send("Error")
    }
  }
})