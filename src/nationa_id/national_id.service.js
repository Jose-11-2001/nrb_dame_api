"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.NationalIdService = void 0;
var common_1 = require("@nestjs/common");
var nationalIdApplication_entity_1 = require("./entities/nationalIdApplication.entity");
var NationalIdService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NationalIdService = _classThis = /** @class */ (function () {
        function NationalIdService_1(nationalIdAppRepo, nationalIdRepo, documentRepo, logRepo) {
            this.nationalIdAppRepo = nationalIdAppRepo;
            this.nationalIdRepo = nationalIdRepo;
            this.documentRepo = documentRepo;
            this.logRepo = logRepo;
        }
        NationalIdService_1.prototype.calculateCitizenshipScore = function (dto) {
            var score = 0;
            // Biological parent's National ID (100 points)
            if (dto.motherIdNo || dto.fatherIdNo) {
                score += 100;
            }
            // Two community witnesses (100 points)
            if (dto.firstWitnessIdNo && dto.secondWitnessIdNo) {
                score += 100;
            }
            return score;
        };
        // Add this method to your NationalIdService
        NationalIdService_1.prototype.verifyNationalId = function (nationalIdNumber, surname) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findByNationalIdNumber(nationalIdNumber)];
                        case 1:
                            result = _a.sent();
                            if (!result) {
                                return [2 /*return*/, {
                                        verified: false,
                                        isValid: false,
                                        message: 'National ID not found'
                                    }];
                            }
                            // Verify surname matches
                            if (result.surname.toLowerCase() !== surname.toLowerCase()) {
                                return [2 /*return*/, {
                                        verified: false,
                                        isValid: false,
                                        message: 'Surname does not match the national ID record'
                                    }];
                            }
                            return [2 /*return*/, {
                                    verified: true,
                                    isValid: result.isValid,
                                    message: result.isValid ? 'National ID is valid' : 'National ID is invalid or expired',
                                    data: {
                                        fullName: "".concat(result.firstName, " ").concat(result.surname),
                                        dateOfBirth: result.dateOfBirth,
                                        gender: result.gender,
                                        nationalIdNumber: result.nationalIdNumber,
                                    }
                                }];
                    }
                });
            });
        };
        NationalIdService_1.prototype.create = function (createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var applicationNumber, citizenshipScore, isEligible, application, savedApplication;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            applicationNumber = "NR1/".concat(new Date().getFullYear(), "/").concat(Math.random().toString(36).substring(2, 8).toUpperCase());
                            citizenshipScore = this.calculateCitizenshipScore(createDto);
                            isEligible = citizenshipScore >= 100;
                            application = this.nationalIdAppRepo.create(__assign(__assign({ applicationNumber: applicationNumber }, createDto), { citizenshipScore: citizenshipScore, isEligible: isEligible, status: isEligible ? nationalIdApplication_entity_1.ApplicationStatus.VERIFIED : nationalIdApplication_entity_1.ApplicationStatus.PENDING, applicationDate: new Date() }));
                            return [4 /*yield*/, this.nationalIdAppRepo.save(application)];
                        case 1:
                            savedApplication = _a.sent();
                            if (!!isEligible) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.createVerificationLog(savedApplication.id, 'Insufficient citizenship proof', "Score: ".concat(citizenshipScore, "/100"))];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, savedApplication];
                    }
                });
            });
        };
        NationalIdService_1.prototype.uploadDocument = function (applicationId, file, documentType) {
            return __awaiter(this, void 0, void 0, function () {
                var application, documentUrl, document, savedDocument;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.nationalIdAppRepo.findOne({ where: { id: applicationId } })];
                        case 1:
                            application = _a.sent();
                            if (!application) {
                                throw new common_1.NotFoundException('Application not found');
                            }
                            return [4 /*yield*/, this.uploadToStorage(file)];
                        case 2:
                            documentUrl = _a.sent();
                            document = this.documentRepo.create({
                                nationalIdApplicationId: applicationId,
                                documentType: documentType,
                                documentName: file.originalname,
                                documentUrl: documentUrl,
                                score: this.getDocumentScore(documentType),
                            });
                            return [4 /*yield*/, this.documentRepo.save(document)];
                        case 3:
                            savedDocument = _a.sent();
                            // Recalculate score
                            return [4 /*yield*/, this.recalculateScore(applicationId)];
                        case 4:
                            // Recalculate score
                            _a.sent();
                            return [2 /*return*/, savedDocument];
                    }
                });
            });
        };
        NationalIdService_1.prototype.getDocumentScore = function (documentType) {
            var scores = {
                'BIRTH_CERTIFICATE': 60,
                'PASSPORT': 40,
                'VOTER_CARD': 40,
                'DRIVERS_LICENSE': 30,
                'EMPLOYMENT_ID': 10,
                'MARRIAGE_CERTIFICATE': 10,
                'PAY_SLIP': 30,
                'VILLAGE_HEAD_LETTER': 40,
                'CITIZENSHIP_CERTIFICATE': 60,
            };
            return scores[documentType] || 10;
        };
        NationalIdService_1.prototype.findAll = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder;
                return __generator(this, function (_a) {
                    queryBuilder = this.nationalIdAppRepo.createQueryBuilder('app')
                        .leftJoinAndSelect('app.supportingDocuments', 'docs')
                        .leftJoinAndSelect('app.verificationLogs', 'logs')
                        .orderBy('app.createdAt', 'DESC');
                    if (filters.status) {
                        queryBuilder.andWhere('app.status = :status', { status: filters.status });
                    }
                    if (filters.district) {
                        queryBuilder.andWhere('app.residentialDistrict = :district', { district: filters.district });
                    }
                    if (filters.startDate && filters.endDate) {
                        queryBuilder.andWhere('app.createdAt BETWEEN :startDate AND :endDate', {
                            startDate: filters.startDate,
                            endDate: filters.endDate,
                        });
                    }
                    return [2 /*return*/, queryBuilder.getMany()];
                });
            });
        };
        NationalIdService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var application;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.nationalIdAppRepo.findOne({
                                where: { id: id },
                                relations: ['supportingDocuments', 'verificationLogs'],
                            })];
                        case 1:
                            application = _a.sent();
                            if (!application) {
                                throw new common_1.NotFoundException('Application not found');
                            }
                            return [2 /*return*/, application];
                    }
                });
            });
        };
        // ✅ FIXED: Query the NationalId repository (for issued IDs)
        NationalIdService_1.prototype.findByNationalIdNumber = function (nationalIdNumber) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.nationalIdRepo.findOne({
                            where: { nationalIdNumber: nationalIdNumber }
                        })];
                });
            });
        };
        // ✅ New: Get all issued National IDs
        NationalIdService_1.prototype.findAllIssuedIds = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.nationalIdRepo.find({
                            order: { issuedAt: 'DESC' },
                        })];
                });
            });
        };
        // ✅ New: Get a single issued National ID
        NationalIdService_1.prototype.findIssuedIdById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.nationalIdRepo.findOne({ where: { id: id } })];
                });
            });
        };
        NationalIdService_1.prototype.verifyByVillageHead = function (applicationId, villageHeadIdNo, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var application, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(applicationId)];
                        case 1:
                            application = _a.sent();
                            application.villageHeadIdNo = villageHeadIdNo;
                            application.villageHeadSignature = signature;
                            application.status = nationalIdApplication_entity_1.ApplicationStatus.VERIFIED;
                            return [4 /*yield*/, this.nationalIdAppRepo.save(application)];
                        case 2:
                            updated = _a.sent();
                            return [4 /*yield*/, this.createVerificationLog(applicationId, 'Village Head Verification', "Verified by ID: ".concat(villageHeadIdNo))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        // ✅ This method creates a final issued ID after approval
        NationalIdService_1.prototype.issueNationalId = function (applicationId) {
            return __awaiter(this, void 0, void 0, function () {
                var application, nationalIdNumber, newNationalId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(applicationId)];
                        case 1:
                            application = _a.sent();
                            if (application.status !== nationalIdApplication_entity_1.ApplicationStatus.APPROVED && application.status !== nationalIdApplication_entity_1.ApplicationStatus.VERIFIED) {
                                throw new common_1.BadRequestException('Application must be approved first');
                            }
                            nationalIdNumber = this.generateNationalIdNumber();
                            newNationalId = this.nationalIdRepo.create({
                                nationalIdNumber: nationalIdNumber,
                                firstName: application.firstName,
                                surname: application.surname,
                                dateOfBirth: application.dateOfBirth,
                                gender: application.gender,
                                placeOfBirth: application.districtOfBirth,
                                fatherName: application.fatherFullName,
                                motherName: application.motherFullName,
                                address: application.residentialVillage,
                                isValid: true,
                                issuedAt: new Date(),
                            });
                            // Update application status
                            application.status = nationalIdApplication_entity_1.ApplicationStatus.COMPLETED;
                            return [4 /*yield*/, this.nationalIdAppRepo.save(application)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.nationalIdRepo.save(newNationalId)];
                    }
                });
            });
        };
        NationalIdService_1.prototype.generateNationalIdNumber = function () {
            // Generate a unique national ID number
            // Format: YYMMDD + random 6 digits
            var date = new Date();
            var yy = date.getFullYear().toString().slice(-2);
            var mm = (date.getMonth() + 1).toString().padStart(2, '0');
            var dd = date.getDate().toString().padStart(2, '0');
            var random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            return "".concat(yy).concat(mm).concat(dd).concat(random);
        };
        NationalIdService_1.prototype.generateReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var applications, filtered;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.nationalIdAppRepo.find({
                                where: {
                                    createdAt: {
                                    // Using Between operator - handled by filter below
                                    },
                                },
                                order: { createdAt: 'ASC' },
                            })];
                        case 1:
                            applications = _a.sent();
                            filtered = applications.filter(function (app) {
                                return app.createdAt >= startDate && app.createdAt <= endDate;
                            });
                            // Generate Excel/PDF report
                            return [2 /*return*/, this.generateExcelReport(filtered)];
                    }
                });
            });
        };
        NationalIdService_1.prototype.createVerificationLog = function (applicationId, action, notes) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    log = this.logRepo.create({
                        nationalIdApplicationId: applicationId,
                        action: action,
                        notes: notes,
                        performedBy: 'SYSTEM',
                        performedAt: new Date(),
                    });
                    return [2 /*return*/, this.logRepo.save(log)];
                });
            });
        };
        NationalIdService_1.prototype.recalculateScore = function (applicationId) {
            return __awaiter(this, void 0, void 0, function () {
                var documents, totalScore, isEligible;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.documentRepo.find({
                                where: { nationalIdApplicationId: applicationId },
                            })];
                        case 1:
                            documents = _a.sent();
                            totalScore = documents.reduce(function (sum, doc) { return sum + (doc.score || 0); }, 0);
                            isEligible = totalScore >= 100;
                            return [4 /*yield*/, this.nationalIdAppRepo.update(applicationId, {
                                    citizenshipScore: totalScore,
                                    isEligible: isEligible,
                                    status: isEligible ? nationalIdApplication_entity_1.ApplicationStatus.VERIFIED : nationalIdApplication_entity_1.ApplicationStatus.PENDING,
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NationalIdService_1.prototype.uploadToStorage = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement your storage solution (local, S3, etc.)
                    // For now, return a placeholder URL
                    return [2 /*return*/, "https://your-storage.com/documents/".concat(Date.now(), "-").concat(file.originalname)];
                });
            });
        };
        NationalIdService_1.prototype.generateExcelReport = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var ExcelJS, workbook, worksheet, buffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ExcelJS = require('exceljs');
                            workbook = new ExcelJS.Workbook();
                            worksheet = workbook.addWorksheet('National ID Applications');
                            worksheet.columns = [
                                { header: 'Application Number', key: 'applicationNumber', width: 20 },
                                { header: 'Full Name', key: 'fullName', width: 30 },
                                { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
                                { header: 'Gender', key: 'gender', width: 10 },
                                { header: 'District', key: 'district', width: 20 },
                                { header: 'Status', key: 'status', width: 15 },
                                { header: 'Score', key: 'citizenshipScore', width: 10 },
                            ];
                            data.forEach(function (app) {
                                worksheet.addRow({
                                    applicationNumber: app.applicationNumber,
                                    fullName: "".concat(app.firstName, " ").concat(app.surname),
                                    dateOfBirth: app.dateOfBirth,
                                    gender: app.gender,
                                    district: app.residentialDistrict,
                                    status: app.status,
                                    citizenshipScore: app.citizenshipScore,
                                });
                            });
                            return [4 /*yield*/, workbook.xlsx.writeBuffer()];
                        case 1:
                            buffer = _a.sent();
                            return [2 /*return*/, buffer];
                    }
                });
            });
        };
        return NationalIdService_1;
    }());
    __setFunctionName(_classThis, "NationalIdService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NationalIdService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NationalIdService = _classThis;
}();
exports.NationalIdService = NationalIdService;
