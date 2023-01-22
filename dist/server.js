"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var user_1 = __importDefault(require("./handlers/user"));
var product_1 = __importDefault(require("./handlers/product"));
var health_1 = __importDefault(require("./health"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3000;
var corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    res.send('Hello');
});
app.use('/health', health_1.default);
(0, dashboard_1.default)(app);
(0, user_1.default)(app);
(0, product_1.default)(app);
var server = app.listen(port, function () {
    console.log("Started at port: ".concat(port));
});
exports.default = server;
