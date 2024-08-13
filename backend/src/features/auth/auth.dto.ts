import { IsEmail, IsNotEmpty } from "class-validator"

//define the classes for user login and signup vaidation
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
  @IsNotEmpty()
  dob: string
}