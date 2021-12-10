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
define("calcPrice", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(price, exp, conf) {
        var normExp = 10 ^ exp;
        return Math.abs(price / normExp) + conf / normExp;
    }
    exports.default = default_1;
});
define("tokenList", ["require", "exports", "axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenList = void 0;
    axios_1 = __importDefault(axios_1);
    var TokenList = /** @class */ (function () {
        function TokenList() {
            this.data = [];
        }
        TokenList.prototype.LoadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, _i, _a, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, axios_1.default.get('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')];
                        case 1:
                            res = _b.sent();
                            for (_i = 0, _a = res.data.tokens; _i < _a.length; _i++) {
                                token = _a[_i];
                                this.data.push({
                                    name: token.name,
                                    symbol: token.symbol,
                                    image: token.logoURI,
                                    address: token.address
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        TokenList.prototype.GetToken = function (symbol) {
            return this.data.filter(function (x) {
                return x.symbol.toLowerCase().indexOf(symbol) != -1;
            });
        };
        return TokenList;
    }());
    exports.TokenList = TokenList;
});
define("mongoClient", ["require", "exports", "mongodb"], function (require, exports, mongodb_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DbClient = void 0;
    var DbClient = /** @class */ (function () {
        function DbClient(connectionString) {
            this.mongoClient = new mongodb_1.MongoClient(connectionString);
        }
        DbClient.prototype.Connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mongoClient.connect()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DbClient.prototype.InitDb = function () {
            return __awaiter(this, void 0, void 0, function () {
                var db, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            db = this.mongoClient.db('solana');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, db.createCollection('ticker', {
                                    timeseries: {
                                        timeField: 'time',
                                        metaField: 'symbol',
                                    },
                                })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _b.sent();
                            console.log('Ticker already created');
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DbClient.prototype.InsertPrice = function (token, price, pair) {
            return __awaiter(this, void 0, void 0, function () {
                var db, ticker, symbols, symbol, symbolInserted, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            db = this.mongoClient.db('solana');
                            ticker = db.collection('ticker');
                            symbols = db.collection('symbols');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            return [4 /*yield*/, symbols.findOne({ 'symbol': token.symbol })];
                        case 2:
                            symbol = _a.sent();
                            if (!!symbol) return [3 /*break*/, 5];
                            return [4 /*yield*/, symbols.insertOne({
                                    'name': token.name,
                                    'symbol': token.symbol,
                                    'image': token.image,
                                    'pairs': [pair]
                                })];
                        case 3:
                            symbolInserted = _a.sent();
                            return [4 /*yield*/, ticker.insertOne({
                                    time: new Date(),
                                    symbol: symbolInserted.insertedId,
                                    price: price,
                                    pair: pair
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 5:
                            if (!!symbol.pairs.includes(pair)) return [3 /*break*/, 7];
                            symbol.pairs.push(pair);
                            return [4 /*yield*/, symbols.updateOne({ '_id': symbol._id }, { '$set': { 'pairs': symbol.pairs } })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [4 /*yield*/, ticker.insertOne({
                                time: new Date(),
                                symbol: symbol._id,
                                price: price,
                                pair: pair
                            })];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 11];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        return DbClient;
    }());
    exports.DbClient = DbClient;
});
define("priceGetter", ["require", "exports", "@solana/web3.js", "@pythnetwork/client"], function (require, exports, web3_js_1, client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PriceGetter = void 0;
    var PriceGetter = /** @class */ (function () {
        function PriceGetter(cluster, client, tokenList) {
            this.solanaCluster = cluster;
            var connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(this.solanaCluster));
            var pythPublicKey = (0, client_1.getPythProgramKeyForCluster)(this.solanaCluster);
            this.pythConnection = new client_1.PythConnection(connection, pythPublicKey);
            this.mongoClient = client;
            this.tokenList = tokenList;
        }
        PriceGetter.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pythConnection.start()];
                        case 1:
                            _a.sent();
                            this.pythConnection.onPriceChange(function (product, price) { return __awaiter(_this, void 0, void 0, function () {
                                var quote, tokens;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            quote = product.symbol.split('/')[0];
                                            tokens = this.tokenList.GetToken(quote.toLowerCase());
                                            if (!tokens[0]) return [3 /*break*/, 2];
                                            if (!(price.price && price.confidence)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.mongoClient.InsertPrice(tokens[0], price.price, product.symbol)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return PriceGetter;
    }());
    exports.PriceGetter = PriceGetter;
});
define("index", ["require", "exports", "priceGetter", "mongoClient", "tokenList", "dotenv"], function (require, exports, priceGetter_1, mongoClient_1, tokenList_1, dotenv_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dotenv_1 = __importDefault(dotenv_1);
    function RunJob() {
        return __awaiter(this, void 0, void 0, function () {
            var tokenlist, mongoClient, processor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            dotenv_1.default.config();
                        }
                        catch (_b) {
                            console.log('Using real env');
                        }
                        tokenlist = new tokenList_1.TokenList();
                        if (!process.env.DB_CONNECTION_STRING) return [3 /*break*/, 5];
                        mongoClient = new mongoClient_1.DbClient(process.env.DB_CONNECTION_STRING);
                        processor = new priceGetter_1.PriceGetter('mainnet-beta', mongoClient, tokenlist);
                        return [4 /*yield*/, tokenlist.LoadData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mongoClient.Connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mongoClient.InitDb()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, processor.start()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        console.error('No DB_CONNECTION_STRING environment variable');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    RunJob();
});
//# sourceMappingURL=build.js.map