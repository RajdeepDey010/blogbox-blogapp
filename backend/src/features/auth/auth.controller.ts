//below are the routes for user login & signup
import { Request, Response, Router } from "express";
import { LoginDto, SignupDto } from "./auth.dto";
import { validate } from "class-validator";
import { loginService, signupService } from "./auth.service";
import { RoutePaths } from "../../config/core";
import { getErrorDetails } from "../../utils/util";

//using express router
export const authRouter = Router()

//the user login api
authRouter.post(RoutePaths.login, async (req: Request, res: Response) => {
  //below defining a reference for the login reguest body structure from LoginDto class, doing it for proper validation
  const loginData = new LoginDto()
  loginData.email = req.body.email;
  loginData.password = req.body.password;
  //if any error is found then validate returna an arrray.It is a promise, so awaiting it.
  const errors = await validate(loginData);
  if (errors.length) {
    res.status(400).json(getErrorDetails(errors))
  }
  else {
    //handling the promise validate()
    try {
      const response = await loginService(loginData)
      res.send(response)
    } catch (error) {
      res.status(400).send(getErrorDetails(error as Error))
    }
  }
})

authRouter.post(RoutePaths.signup, async (req: Request, res: Response) => {
  //below defining a reference for the signup reguest body structure from SignupDto class, doing it for proper validation
  const signupData = new SignupDto()
  signupData.email = req.body.email
  signupData.password = req.body.password
  signupData.firstName = req.body.firstName
  signupData.lastName = req.body.lastName
  signupData.dob = req.body.dob

  const errors = await validate(signupData);
  if (errors.length) {
    res.status(400).json(getErrorDetails(errors))
    // res.status(400).send(errors.map(item => item.toString()))
    return;
  }
  try {
    const response = await signupService(signupData)
    res.send(response)
  } catch (error) {
    res.status(400).send(getErrorDetails(error as Error))
  }
})