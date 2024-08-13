"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const core_1 = require("./core");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: core_1.MODELS,
    logging: true,
    synchronize: true
});
