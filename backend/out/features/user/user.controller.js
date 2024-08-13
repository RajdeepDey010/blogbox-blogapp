"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
//below are the routes for user login & signup
const express_1 = require("express");
const class_validator_1 = require("class-validator");
const core_1 = require("../../config/core");
const user_dto_1 = require("./user.dto");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const user_service_1 = require("./user.service");
//using express router
exports.userRouter = (0, express_1.Router)();
//the user login api
exports.userRouter.post(core_1.RoutePaths.getUser, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //below defining a reference for the login reguest body structure from LoginDto class, doing it for proper validation
    const data = new user_dto_1.GetUserDto();
    data.email = req.body.email;
    //if any error is found then validate returna an arrray.It is a promise, so awaiting it.
    const errors = yield (0, class_validator_1.validate)(data);
    if (errors.length) {
        res.status(400).send(errors.map(item => item.toString()));
    }
    else {
        //handling the promise validate()
        try {
            const response = yield (0, user_service_1.getUserService)(data);
            if (response)
                res.status(200).send(response);
            else
                res.status(200).send("User does not exist");
        }
        catch (error) {
            res.status(400).send("Error");
        }
    }
}));
