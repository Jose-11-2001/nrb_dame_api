"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeathCertificateController = void 0;
var common_1 = require("@nestjs/common");
var api_key_guard_1 = require("../auth/api-key.guard");
var DeathCertificateController = function () {
    var _classDecorators = [(0, common_1.Controller)('v1/death-certificate')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _search_decorators;
    var _searchByRegistration_decorators;
    var _findOne_decorators;
    var _registerDeath_decorators;
    var _verifyDeathCertificate_decorators;
    var _verifyByDeceasedNationalId_decorators;
    var DeathCertificateController = _classThis = /** @class */ (function () {
        function DeathCertificateController_1(deathService) {
            this.deathService = (__runInitializers(this, _instanceExtraInitializers), deathService);
        }
        DeathCertificateController_1.prototype.create = function (createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var certificate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.create(createDto)];
                        case 1:
                            certificate = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: certificate,
                                    message: 'Death certificate application submitted',
                                }];
                    }
                });
            });
        };
        DeathCertificateController_1.prototype.findAll = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var filters, certificates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filters = {};
                            if (status)
                                filters.status = status;
                            return [4 /*yield*/, this.deathService.findAll(filters)];
                        case 1:
                            certificates = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: certificates,
                                }];
                    }
                });
            });
        };
        DeathCertificateController_1.prototype.search = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var idNumber, firstName, surname, certificates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            idNumber = query.idNumber, firstName = query.firstName, surname = query.surname;
                            if (!idNumber) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.deathService.searchByIdNumber(idNumber)];
                        case 1:
                            certificates = _a.sent();
                            return [3 /*break*/, 6];
                        case 2:
                            if (!(firstName && surname)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.deathService.searchByName(firstName, surname)];
                        case 3:
                            certificates = _a.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this.deathService.findAll({})];
                        case 5:
                            certificates = _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, {
                                success: true,
                                data: certificates,
                                count: certificates.length,
                            }];
                    }
                });
            });
        };
        DeathCertificateController_1.prototype.searchByRegistration = function (DeathCertificateNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var certificate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.searchByCertificateNumber(DeathCertificateNumber)];
                        case 1:
                            certificate = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: certificate,
                                }];
                    }
                });
            });
        };
        DeathCertificateController_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var certificate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.findOne(id)];
                        case 1:
                            certificate = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: certificate,
                                }];
                    }
                });
            });
        };
        DeathCertificateController_1.prototype.registerDeath = function (id, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var certificate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.register(id, signature)];
                        case 1:
                            certificate = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: certificate,
                                    message: 'Death certificate registered successfully',
                                }];
                    }
                });
            });
        };
        // ✅ NEW: Verify death certificate by number
        DeathCertificateController_1.prototype.verifyDeathCertificate = function (certificateNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.findByCertificateNumber(certificateNumber)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    verified: !!result,
                                    isValid: (result === null || result === void 0 ? void 0 : result.isValid) || false,
                                    message: result ? 'Death certificate is valid' : 'Death certificate not found',
                                    data: result ? {
                                        deceasedName: "".concat(result.firstName, " ").concat(result.surname),
                                        dateOfDeath: result.dateOfDeath,
                                        causeOfDeath: result.causeOfDeath
                                    } : null
                                }];
                    }
                });
            });
        };
        // ✅ NEW: Verify by deceased national ID
        DeathCertificateController_1.prototype.verifyByDeceasedNationalId = function (nationalId) {
            return __awaiter(this, void 0, void 0, function () {
                var results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.deathService.findByDeceasedNationalId(nationalId)];
                        case 1:
                            results = _a.sent();
                            return [2 /*return*/, {
                                    verified: results.length > 0,
                                    hasDeathCertificate: results.length > 0,
                                    count: results.length,
                                    certificates: results.map(function (cert) { return ({
                                        certificateNumber: cert.certificateNumber,
                                        dateOfDeath: cert.dateOfDeath,
                                        isValid: cert.isValid
                                    }); })
                                }];
                    }
                });
            });
        };
        return DeathCertificateController_1;
    }());
    __setFunctionName(_classThis, "DeathCertificateController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)()];
        _findAll_decorators = [(0, common_1.Get)()];
        _search_decorators = [(0, common_1.Get)('search')];
        _searchByRegistration_decorators = [(0, common_1.Get)('search/registration/:deathCertificateNumber')];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _registerDeath_decorators = [(0, common_1.Put)(':id/register')];
        _verifyDeathCertificate_decorators = [(0, common_1.Get)('verify/:certificateNumber'), (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard)];
        _verifyByDeceasedNationalId_decorators = [(0, common_1.Get)('verify/by-national-id/:nationalId'), (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard)];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _searchByRegistration_decorators, { kind: "method", name: "searchByRegistration", static: false, private: false, access: { has: function (obj) { return "searchByRegistration" in obj; }, get: function (obj) { return obj.searchByRegistration; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerDeath_decorators, { kind: "method", name: "registerDeath", static: false, private: false, access: { has: function (obj) { return "registerDeath" in obj; }, get: function (obj) { return obj.registerDeath; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyDeathCertificate_decorators, { kind: "method", name: "verifyDeathCertificate", static: false, private: false, access: { has: function (obj) { return "verifyDeathCertificate" in obj; }, get: function (obj) { return obj.verifyDeathCertificate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyByDeceasedNationalId_decorators, { kind: "method", name: "verifyByDeceasedNationalId", static: false, private: false, access: { has: function (obj) { return "verifyByDeceasedNationalId" in obj; }, get: function (obj) { return obj.verifyByDeceasedNationalId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeathCertificateController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeathCertificateController = _classThis;
}();
exports.DeathCertificateController = DeathCertificateController;
