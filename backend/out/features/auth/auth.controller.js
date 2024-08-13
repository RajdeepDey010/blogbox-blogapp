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
exports.authRouter = void 0;
//below are the routes for user login & signup
const express_1 = require("express");
const auth_dto_1 = require("./auth.dto");
const class_validator_1 = require("class-validator");
const auth_service_1 = require("./auth.service");
const core_1 = require("../../config/core");
const util_1 = require("../../utils/util");
//using express router
exports.authRouter = (0, express_1.Router)();
//the user login api
exports.authRouter.post(core_1.RoutePaths.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //below defining a reference for the login reguest body structure from LoginDto class, doing it for proper validation
    const loginData = new auth_dto_1.LoginDto();
    loginData.email = req.body.email;
    loginData.password = req.body.password;
    //if any error is found then validate returna an arrray.It is a promise, so awaiting it.
    const errors = yield (0, class_validator_1.validate)(loginData);
    if (errors.length) {
        res.status(400).json((0, util_1.getErrorDetails)(errors));
    }
    else {
        //handling the promise validate()
        try {
            const response = yield (0, auth_service_1.loginService)(loginData);
            res.send(response);
        }
        catch (error) {
            res.status(400).send((0, util_1.getErrorDetails)(error));
        }
    }
}));
exports.authRouter.post(core_1.RoutePaths.signup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //below defining a reference for the signup reguest body structure from SignupDto class, doing it for proper validation
    const signupData = new auth_dto_1.SignupDto();
    signupData.email = req.body.email;
    signupData.password = req.body.password;
    signupData.firstName = req.body.firstName;
    signupData.lastName = req.body.lastName;
    signupData.dob = req.body.dob;
    const errors = yield (0, class_validator_1.validate)(signupData);
    if (errors.length) {
        res.status(400).json((0, util_1.getErrorDetails)(errors));
        // res.status(400).send(errors.map(item => item.toString()))
        return;
    }
    try {
        const response = yield (0, auth_service_1.signupService)(signupData);
        res.send(response);
    }
    catch (error) {
        res.status(400).send((0, util_1.getErrorDetails)(error));
    }
}));
