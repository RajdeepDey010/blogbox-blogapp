import { comparePassword, generateAuthToken, passwordHash } from "../../utils/util";
import { User } from "./user.model";
import { GetUserDto } from "./user.dto";

export async function getUserService(data: GetUserDto): Promise<Partial<User>|Error> {
  //loggedin user needs to be verified with a callback to find user email exists or not.the typeorm func findOneByOrFail() return a promise.
  const user = await User.findOneByOrFail({email: data.email});
  if (!user) {
    return new Error("User does not exist")
  } 
  else {
    return ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
      emailVerified: user.emailVerified,
    })
  }
}