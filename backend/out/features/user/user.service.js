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
exports.getUserService = getUserService;
const user_model_1 = require("./user.model");
function getUserService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //loggedin user needs to be verified with a callback to find user email exists or not.the typeorm func findOneByOrFail() return a promise.
        const user = yield user_model_1.User.findOneByOrFail({ email: data.email });
        if (!user) {
            return new Error("User does not exist");
        }
        else {
            return ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                dob: user.dob,
                email: user.email,
                emailVerified: user.emailVerified,
            });
        }
    });
}
