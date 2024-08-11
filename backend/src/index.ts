import express from 'express';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { PORT } from './config/core';
import { dataSource } from './config/dbconfig';
import { authRouter } from './features/auth/auth.controller';
import bodyParser from 'body-parser';
import { postRouter } from './features/post/post.controller';

config()
//database integration starts here
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

//to synchronize any changes in entity scehmas
// dataSource
//   .synchronize()
//   .then(() => {
//     console.log("Data Source synchronized!")
//   })
//   .catch((err) => {
//     console.error("Error during Data Source synchronize:", err)
//   })

const app = express();
app.use(express.json())
//we will parse the data we get in request body into a json here
app.use(bodyParser.json())
//below is the root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});
//here the api endpoints for login get initated
app.use(authRouter)

app.use(postRouter)
//below server gets initiated or listens for user request/response
app.listen(PORT, () => {
  console.log('Application started at http://localhost:' + PORT);
});