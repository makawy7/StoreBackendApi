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
exports.DashboardQueries = void 0;
var database_1 = __importDefault(require("../database"));
var DashboardQueries = /** @class */ (function () {
    function DashboardQueries() {
    }
    // async productsInOrder(orderId: number): Promise<ProductOrder[]> {
    //   try{
    //     const con = await Client.connect()
    //     const sql = 'SELECT * FROM order_products WHERE order_id = ($1)'
    //     const result = await con.query(sql, [orderId])
    //     con.release()
    //     return result.rows
    //   } catch(err){
    //     throw new Error(`Unable to get products of the order: ${err}`)
    //   }
    // }
    // get products for orders of the current login user
    // returns null if a users has not orders
    DashboardQueries.prototype.productsInOrder = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()
                            // join tables products, orders and order_products
                        ];
                    case 1:
                        con = _a.sent();
                        sql = 'SELECT products.id AS product_id, orders.id AS order_id, products.name AS product_name, order_products.quantity AS quantity, orders.status AS order_status FROM order_products INNER JOIN orders ON orders.user_id=($1) AND orders.id = order_products.order_id INNER JOIN products ON order_products.product_id = products.id';
                        return [4 /*yield*/, con.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        con.release();
                        if (result.rows.length) {
                            return [2 /*return*/, result.rows[0]];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Unable to get products of the order: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DashboardQueries;
}());
exports.DashboardQueries = DashboardQueries;
