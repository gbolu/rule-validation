"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
// import bodyparser from 'body-parser';
require('dotenv').config();
var middlewares_1 = require("./middlewares");
var api_1 = __importDefault(require("./api"));
var api_templates_1 = require("./util/api_templates");
var app = express_1.default();
app.use(morgan_1.default('short'));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(function (req, res, next) {
    express_1.default.json()(req, res, function (err) {
        if (err) {
            var response = new api_templates_1.JSENDTemplate();
            response.data = null;
            response.message = "Invalid JSON payload passed.";
            response.status = "error";
            return res.status(400).json(response); // Bad request
        }
        next();
    });
});
app.use(api_1.default);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
module.exports = app;
