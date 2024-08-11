import { DataSource } from "typeorm";
import { MODELS } from "./core";
import { config } from "dotenv";

config()
export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: MODELS,
  logging: true,
  synchronize: true
})