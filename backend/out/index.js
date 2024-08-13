"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const core_1 = require("./config/core");
const dbconfig_1 = require("./config/dbconfig");
const auth_controller_1 = require("./features/auth/auth.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const post_controller_1 = require("./features/post/post.controller");
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = require("./features/user/user.controller");
(0, dotenv_1.config)();
//database integration starts here
dbconfig_1.dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//we will parse the data we get in request body into a json here
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(auth_controller_1.authRouter);
app.use(user_controller_1.userRouter);
app.use(post_controller_1.postRouter);
//below is the root endpoint
app.get('/', (req, res) => {
    res.send('Application works!');
});
//below server gets initiated or listens for user request/response
app.listen(core_1.PORT, () => {
    console.log('Application started at http://localhost:' + core_1.PORT);
});
