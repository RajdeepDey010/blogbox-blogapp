"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTKEY = exports.RoutePaths = exports.MODELS = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT;
//below need to mention the path of our mysql tables or entity model to be created.
exports.MODELS = [
    'src/features/user/user.model.ts',
    'src/features/post/post.model.ts'
];
var RoutePaths;
(function (RoutePaths) {
    RoutePaths["login"] = "/login";
    RoutePaths["signup"] = "/register";
    RoutePaths["createpost"] = "/createpost";
    RoutePaths["allpost"] = "/allpost";
    RoutePaths["userpost"] = "/userpost/:userId/posts";
    RoutePaths["editpost"] = "/editpost";
    RoutePaths["delpost"] = "/delpost/:userId/posts/:postId";
    RoutePaths["getUser"] = "/getUser";
})(RoutePaths || (exports.RoutePaths = RoutePaths = {}));
exports.JWTKEY = process.env.JWTKEY;
