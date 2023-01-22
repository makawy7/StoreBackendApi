"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// uses header token
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("You must be logged in! ".concat(err));
    }
};
//  get user id from the token
// only used after verifyAuthToken()
var getLoggedInUser = function (req) {
    var authorizationHeader = req.headers.authorization;
    var token = authorizationHeader.split(' ')[1];
    var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    return decoded.user;
};
exports.default = { verifyAuthToken: verifyAuthToken, getLoggedInUser: getLoggedInUser };
