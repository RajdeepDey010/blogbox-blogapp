import { config } from 'dotenv';

config()
export const PORT = process.env.PORT

export const MODELS = [
  'src/features/user/user.model.ts'
]

export enum RoutePaths {
  login = "/login",
  signup = "/register"
}