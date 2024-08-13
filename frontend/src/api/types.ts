export interface IUser {
  "id": string,
  "firstName": string,
  "lastName": string,
  "dob": string,
  "email": string,
  "emailVerified": boolean,
  "token"?: string
}

export interface ILoginRequest {
  "email": string,
  "password": string
}

export interface ISignupRequest {
  "email": string,
  "password": string,
  "firstName": string,
  "lastName": string,
  "dob": Date
}

export interface IGetUserRequest {
  "email": string,
  "token": string
}

export interface ICreatePostRequest {
  userId: string
  title: string
  content: string
}

export interface IPost {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
  firstName: string
  lastName: string
}

export interface IEditPostRequest {
  userId: string
  postId: string
  title: string
  content: string
}