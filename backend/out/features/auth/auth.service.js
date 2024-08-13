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
exports.loginService = loginService;
exports.signupService = signupService;
const util_1 = require("../../utils/util");
const user_model_1 = require("../user/user.model");
function loginService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //loggedin user needs to be verified with a callback to find user email exists or not.the typeorm func findOneByOrFail() return a promise.
        const user = yield user_model_1.User.findOneByOrFail({ email: data.email });
        console.log(user);
        if (!user) {
            throw new Error("User does not exist");
        }
        else {
            //Checking if the password match for the user.
            if ((0, util_1.comparePassword)(data.password, user.password)) {
                const token = (0, util_1.generateAuthToken)(user);
                return ({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dob: user.dob,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    token: token
                });
            }
            else
                throw new Error("User does not exist");
        }
    });
}
function signupService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_model_1.User.findOneBy({ email: data.email });
            //console.log(!!response)
            if (response)
                throw new Error("User alraedy exists");
            const user = new user_model_1.User();
            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.dob = data.dob;
            user.password = (0, util_1.passwordHash)(data.password);
            //Inserting the user in mysql database
            user_model_1.User.create(user);
            yield user_model_1.User.save(user);
            return yield loginService({ email: user.email, password: data.password });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
