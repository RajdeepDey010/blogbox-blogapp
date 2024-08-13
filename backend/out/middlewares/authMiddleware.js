"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const util_1 = require("../utils/util");
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);
        try {
            const tokenData = (0, util_1.verifyToken)(token);
            req.body.tokenData = tokenData;
            next();
        }
        catch (error) {
            throw new Error("Invalid User");
        }
    }
    else {
        throw new Error("Invalid token");
    }
};
exports.authMiddleware = authMiddleware;
