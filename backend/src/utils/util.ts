import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../features/user/user.model';
import { JWTKEY } from '../config/core';
import { ValidationError } from 'class-validator';

export const passwordHash = (plainPassword: string): string => {
  const hash = bcrypt.hashSync(plainPassword, 10);
  return hash;
};

export const comparePassword = (plainPassword: string, passwordHash: string): boolean => {
  const compared = bcrypt.compareSync(plainPassword, passwordHash);
  return compared;
};



export const generateAuthToken = (user: Partial<User>): string => {
  const token = jwt.sign({ _id: user.id, email: user.email }, JWTKEY, {
    expiresIn: '2h',
  });

  return token;
};

export const verifyToken = (token: string): { _id: string; email: string } => {
  try {
    const tokenData = jwt.verify(token, JWTKEY);
    return tokenData as { _id: string; email: string };
  } catch (error) {
    throw new Error("Invalid User");
  }
};

export const getErrorDetails = (errors: ValidationError[] | Error) => {
  if(errors instanceof Error) {
    return ({
      status:400,
      message: errors.message
    })
  }
  return ({
    status:400,
    message: errors.map(item=>({
        [item.property]:Object.values(item.constraints as Object)
    }))
  })
}