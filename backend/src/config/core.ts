import { config } from 'dotenv';

config()
export const PORT = process.env.PORT
//below need to mention the path of our mysql tables or entity model to be created
export const MODELS = [
  'src/features/user/user.model.ts',
  'src/features/post/post.model.ts'
]

export enum RoutePaths {
  login = "/login",
  signup = "/register",
  createpost = "/createpost",
  allpost = "/allpost",
  userpost = "/userpost/:userId/posts",
  editpost = "/editpost",
  delpost = "/delpost/:userId/posts/:postId",
  getUser = "/getUser"
}

export const JWTKEY = process.env.JWTKEY as string