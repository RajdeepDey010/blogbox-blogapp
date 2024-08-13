import { comparePassword, generateAuthToken, passwordHash } from "../../utils/util";
import { User } from "../user/user.model";
import { LoginDto, SignupDto } from "./auth.dto";

export async function loginService(data: LoginDto): Promise<Partial<User> & {token?: string}|undefined> {
  //loggedin user needs to be verified with a callback to find user email exists or not.the typeorm func findOneByOrFail() return a promise.
  const user = await User.findOneByOrFail({email: data.email});
  console.log(user)
  if (!user) {
    throw new Error("User does not exist")
  } 
  else {
    //Checking if the password match for the user.
    if(comparePassword(data.password, user.password)) {
      const token = generateAuthToken(user);
      return ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        email: user.email,
        emailVerified: user.emailVerified,
        token: token
      })
    }
    else 
      throw new Error("User does not exist")
  }
}

export async function signupService(data: SignupDto): Promise <Partial<User> & {token?: string}|undefined> {
  try {
    const response = await User.findOneBy({email: data.email})
    //console.log(!!response)
    
    if(response)
      throw new Error("User alraedy exists")
    const user = new User()
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.dob = data.dob;
    user.password = passwordHash(data.password);
    //Inserting the user in mysql database
    User.create(user)
    await User.save(user)
    return await loginService({email: user.email, password: data.password})
  } catch (error: any) {
    throw new Error(error)
  }
}