
import { dataSource } from "../../config/dbconfig";
import { comparePassword } from "../../utils/util";
import { User } from "../user/user.model";
import { LoginDto, SignupDto } from "./auth.dto";

export async function loginService(data: LoginDto): Promise<User|Error> {
  //loggedin user needs to be verified with a callback to find user email exists or not.the typeorm func findOneByOrFail() return a promise.
  const user = await User.findOneByOrFail({email: data.email});
  
  if (!user) {
    return new Error("User does not exist")
  } 
  else {
    //Checking if the password match for the user.
    if(comparePassword(data.password, user.password))
      return user;
    else 
      return new Error("User does not exist")
  }
}

export async function signupService(data: SignupDto): Promise <User|Error> {
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
    user.password = data.password;
    //Inserting the user in mysql database
    User.create(user)
    return User.save(user)
  } catch (error: any) {
    return new Error(error)
  }
}