"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorDetails = exports.verifyToken = exports.generateAuthToken = exports.comparePassword = exports.passwordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const core_1 = require("../config/core");
const passwordHash = (plainPassword) => {
    const hash = bcrypt_1.default.hashSync(plainPassword, 10);
    return hash;
};
exports.passwordHash = passwordHash;
const comparePassword = (plainPassword, passwordHash) => {
    const compared = bcrypt_1.default.compareSync(plainPassword, passwordHash);
    return compared;
};
exports.comparePassword = comparePassword;
const generateAuthToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ _id: user.id, email: user.email }, core_1.JWTKEY, {
        expiresIn: '2h',
    });
    return token;
};
exports.generateAuthToken = generateAuthToken;
const verifyToken = (token) => {
    try {
        const tokenData = jsonwebtoken_1.default.verify(token, core_1.JWTKEY);
        return tokenData;
    }
    catch (error) {
        throw new Error("Invalid User");
    }
};
exports.verifyToken = verifyToken;
const getErrorDetails = (errors) => {
    if (errors instanceof Error) {
        return ({
            status: 400,
            message: errors.message
        });
    }
    return ({
        status: 400,
        message: errors.map(item => ({
            [item.property]: Object.values(item.constraints)
        }))
    });
};
exports.getErrorDetails = getErrorDetails;
