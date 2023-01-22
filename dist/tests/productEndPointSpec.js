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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var database_1 = __importDefault(require("../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user = {
    id: 1,
    username: 'abdallah',
    firstname: 'abdallah',
    lastname: 'mekawy',
    password: 'abdallah'
};
// generate token to test routes protected with verifyAuthToken
var token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
describe('Product Endpoints', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var con, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    con = _a.sent();
                    sql = 'DELETE FROM products';
                    return [4 /*yield*/, con.query(sql)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        server_1.default.close();
    });
    describe('Server status', function () {
        it('server is working, and returns status code 200', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default).get('/health').expect(200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('Can\'t create new product without token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        name: 'Product 1',
                        price: 12,
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .post('/product')
                            .set({ 'Content-Type': 'application/json' })
                            .send(data)
                            .expect(401)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Successfully create new product with token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        name: 'Product 1',
                        price: '12',
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .post('/product')
                            .set({ 'Content-Type': 'application/json', 'Authorization': "Bearer ".concat(token) })
                            .send(data)
                            .expect(200)
                            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // Check the response
                                expect(response.body.id).toBeTruthy();
                                expect(response.body.name).toBe(data.name);
                                expect(response.body.price).toBe(data.price);
                                return [2 /*return*/];
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Index endpoint Successfully retrieving products', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default).get('/products').expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Show endpoint Successfully retrieving product', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .get('/product/1')
                        .expect(200)
                        .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            // Check the response
                            expect(response.body.id).toBe(1);
                            expect(response.body.name).toBe('Product 1');
                            expect(response.body.price).toBe('12');
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
