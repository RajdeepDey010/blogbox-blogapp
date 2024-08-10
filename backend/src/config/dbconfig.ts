import { DataSource } from "typeorm";
import { MODELS } from "./core";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "blog",
  entities: MODELS,
  logging: true,
  synchronize: true
})