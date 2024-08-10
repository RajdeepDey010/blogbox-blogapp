import express from 'express';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { PORT } from './config/core';
import { dataSource } from './config/dbconfig';
import { authRouter } from './features/auth/auth.controller';
import bodyParser from 'body-parser';

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

config()
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(authRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.listen(PORT, () => {
  console.log('Application started at http://localhost:'+PORT);
});