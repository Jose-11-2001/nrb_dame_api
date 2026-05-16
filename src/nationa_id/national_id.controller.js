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
exports.NationalIdController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var api_key_guard_1 = require("../auth/api-key.guard");
var NationalIdController = function () {
    var _classDecorators = [(0, common_1.Controller)('v1/national-id')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _uploadDocument_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _verifyByVillageHead_decorators;
    var _verifyNationalId_decorators;
    var _verifyMultipleNationalIds_decorators;
    var _downloadReport_decorators;
    var NationalIdController = _classThis = /** @class */ (function () {
        function NationalIdController_1(nationalIdService) {
            this.nationalIdService = (__runInitializers(this, _instanceExtraInitializers), nationalIdService);
        }
        NationalIdController_1.prototype.create = function (createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var application;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.nationalIdService.create(createDto)];
                        case 1:
                            application = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: application,
                                    message: 'Application submitted successfully',
                                }];
                    }
                });
            });
        };
        NationalIdController_1.prototype.uploadDocument = function (id, file, documentType) {
            return __awaiter(this, void 0, void 0, function () {
                var document;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!file) {
                                throw new common_1.BadRequestException('No file uploaded');
                            }
                            return [4 /*yield*/, this.nationalIdService.uploadDocument(id, file, documentType)];
                        case 1:
                            document = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: document,
                                    message: 'Document uploaded successfully',
                                }];
                    }
                });
            });
        };
        NationalIdController_1.prototype.findAll = function (status, district, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var filters, applications;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filters = {};
                            if (status)
                                filters.status = status;
                            if (district)
                                filters.district = district;
                            if (startDate && endDate) {
                                filters.startDate = new Date(startDate);
                                filters.endDate = new Date(endDate);
                            }
                            return [4 /*yield*/, this.nationalIdService.findAll(filters)];
                        case 1:
                            applications = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: applications,
                                    count: applications.length,
                                }];
                    }
                });
            });
        };
        NationalIdController_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var application;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.nationalIdService.findOne(id)];
                        case 1:
                            application = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: application,
                                }];
                    }
                });
            });
        };
        NationalIdController_1.prototype.verifyByVillageHead = function (id, villageHeadIdNo, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var application;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!villageHeadIdNo) {
                                throw new common_1.BadRequestException('Village Head ID is required');
                            }
                            return [4 /*yield*/, this.nationalIdService.verifyByVillageHead(id, villageHeadIdNo, signature)];
                        case 1:
                            application = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    data: application,
                                    message: 'Application verified by Village Head',
                                }];
                    }
                });
            });
        };
        // ✅ Verification endpoint with surname query parameter
        NationalIdController_1.prototype.verifyNationalId = function (nationalIdNumber, surname) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!surname) {
                                throw new common_1.BadRequestException('Surname query parameter is required');
                            }
                            return [4 /*yield*/, this.nationalIdService.verifyNationalId(nationalIdNumber, surname)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    verified: result.verified,
                                    isValid: result.isValid,
                                    message: result.message,
                                    data: result.data
                                }];
                    }
                });
            });
        };
        // ✅ Bulk verification endpoint for external systems
        NationalIdController_1.prototype.verifyMultipleNationalIds = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var results;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!body.nationalIdNumbers || !Array.isArray(body.nationalIdNumbers)) {
                                throw new common_1.BadRequestException('nationalIdNumbers array is required');
                            }
                            return [4 /*yield*/, Promise.all(body.nationalIdNumbers.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                                    var result;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.nationalIdService.findByNationalIdNumber(id)];
                                            case 1:
                                                result = _a.sent();
                                                return [2 /*return*/, {
                                                        nationalIdNumber: id,
                                                        verified: !!result,
                                                        isValid: (result === null || result === void 0 ? void 0 : result.isValid) || false,
                                                        fullName: result ? "".concat(result.firstName, " ").concat(result.surname) : null,
                                                    }];
                                        }
                                    });
                                }); }))];
                        case 1:
                            results = _a.sent();
                            return [2 /*return*/, { results: results, total: results.length }];
                    }
                });
            });
        };
        NationalIdController_1.prototype.downloadReport = function (startDate, endDate, res) {
            return __awaiter(this, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!startDate || !endDate) {
                                throw new common_1.BadRequestException('Start date and end date are required');
                            }
                            return [4 /*yield*/, this.nationalIdService.generateReport(new Date(startDate), new Date(endDate))];
                        case 1:
                            report = _a.sent();
                            res.set({
                                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'Content-Disposition': "attachment; filename=national-id-report-".concat(Date.now(), ".xlsx"),
                            });
                            return [2 /*return*/, new common_1.StreamableFile(report)];
                    }
                });
            });
        };
        return NationalIdController_1;
    }());
    __setFunctionName(_classThis, "NationalIdController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)()];
        _uploadDocument_decorators = [(0, common_1.Post)(':id/documents'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document'))];
        _findAll_decorators = [(0, common_1.Get)()];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _verifyByVillageHead_decorators = [(0, common_1.Put)(':id/verify-village')];
        _verifyNationalId_decorators = [(0, common_1.Get)('verify/:nationalIdNumber'), (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard)];
        _verifyMultipleNationalIds_decorators = [(0, common_1.Post)('verify/batch'), (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard)];
        _downloadReport_decorators = [(0, common_1.Get)('reports/download')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadDocument_decorators, { kind: "method", name: "uploadDocument", static: false, private: false, access: { has: function (obj) { return "uploadDocument" in obj; }, get: function (obj) { return obj.uploadDocument; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyByVillageHead_decorators, { kind: "method", name: "verifyByVillageHead", static: false, private: false, access: { has: function (obj) { return "verifyByVillageHead" in obj; }, get: function (obj) { return obj.verifyByVillageHead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyNationalId_decorators, { kind: "method", name: "verifyNationalId", static: false, private: false, access: { has: function (obj) { return "verifyNationalId" in obj; }, get: function (obj) { return obj.verifyNationalId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyMultipleNationalIds_decorators, { kind: "method", name: "verifyMultipleNationalIds", static: false, private: false, access: { has: function (obj) { return "verifyMultipleNationalIds" in obj; }, get: function (obj) { return obj.verifyMultipleNationalIds; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _downloadReport_decorators, { kind: "method", name: "downloadReport", static: false, private: false, access: { has: function (obj) { return "downloadReport" in obj; }, get: function (obj) { return obj.downloadReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NationalIdController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NationalIdController = _classThis;
}();
exports.NationalIdController = NationalIdController;
