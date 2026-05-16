"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NationalId = void 0;
// src/nationa_id/entities/national-id.entity.ts
var typeorm_1 = require("typeorm");
var NationalId = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('national_ids')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _nationalIdNumber_decorators;
    var _nationalIdNumber_initializers = [];
    var _nationalIdNumber_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _surname_decorators;
    var _surname_initializers = [];
    var _surname_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _placeOfBirth_decorators;
    var _placeOfBirth_initializers = [];
    var _placeOfBirth_extraInitializers = [];
    var _fatherName_decorators;
    var _fatherName_initializers = [];
    var _fatherName_extraInitializers = [];
    var _motherName_decorators;
    var _motherName_initializers = [];
    var _motherName_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _photoUrl_decorators;
    var _photoUrl_initializers = [];
    var _photoUrl_extraInitializers = [];
    var _isValid_decorators;
    var _isValid_initializers = [];
    var _isValid_extraInitializers = [];
    var _issuedAt_decorators;
    var _issuedAt_initializers = [];
    var _issuedAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var NationalId = _classThis = /** @class */ (function () {
        function NationalId_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.nationalIdNumber = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _nationalIdNumber_initializers, void 0));
            this.firstName = (__runInitializers(this, _nationalIdNumber_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.surname = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _surname_initializers, void 0));
            this.dateOfBirth = (__runInitializers(this, _surname_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
            this.gender = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
            this.placeOfBirth = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _placeOfBirth_initializers, void 0));
            this.fatherName = (__runInitializers(this, _placeOfBirth_extraInitializers), __runInitializers(this, _fatherName_initializers, void 0));
            this.motherName = (__runInitializers(this, _fatherName_extraInitializers), __runInitializers(this, _motherName_initializers, void 0));
            this.address = (__runInitializers(this, _motherName_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.photoUrl = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _photoUrl_initializers, void 0));
            this.isValid = (__runInitializers(this, _photoUrl_extraInitializers), __runInitializers(this, _isValid_initializers, void 0));
            this.issuedAt = (__runInitializers(this, _isValid_extraInitializers), __runInitializers(this, _issuedAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _issuedAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return NationalId_1;
    }());
    __setFunctionName(_classThis, "NationalId");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _nationalIdNumber_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _firstName_decorators = [(0, typeorm_1.Column)()];
        _surname_decorators = [(0, typeorm_1.Column)()];
        _dateOfBirth_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _gender_decorators = [(0, typeorm_1.Column)()];
        _placeOfBirth_decorators = [(0, typeorm_1.Column)()];
        _fatherName_decorators = [(0, typeorm_1.Column)()];
        _motherName_decorators = [(0, typeorm_1.Column)()];
        _address_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _photoUrl_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isValid_decorators = [(0, typeorm_1.Column)({ default: true })];
        _issuedAt_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _nationalIdNumber_decorators, { kind: "field", name: "nationalIdNumber", static: false, private: false, access: { has: function (obj) { return "nationalIdNumber" in obj; }, get: function (obj) { return obj.nationalIdNumber; }, set: function (obj, value) { obj.nationalIdNumber = value; } }, metadata: _metadata }, _nationalIdNumber_initializers, _nationalIdNumber_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _surname_decorators, { kind: "field", name: "surname", static: false, private: false, access: { has: function (obj) { return "surname" in obj; }, get: function (obj) { return obj.surname; }, set: function (obj, value) { obj.surname = value; } }, metadata: _metadata }, _surname_initializers, _surname_extraInitializers);
        __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
        __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
        __esDecorate(null, null, _placeOfBirth_decorators, { kind: "field", name: "placeOfBirth", static: false, private: false, access: { has: function (obj) { return "placeOfBirth" in obj; }, get: function (obj) { return obj.placeOfBirth; }, set: function (obj, value) { obj.placeOfBirth = value; } }, metadata: _metadata }, _placeOfBirth_initializers, _placeOfBirth_extraInitializers);
        __esDecorate(null, null, _fatherName_decorators, { kind: "field", name: "fatherName", static: false, private: false, access: { has: function (obj) { return "fatherName" in obj; }, get: function (obj) { return obj.fatherName; }, set: function (obj, value) { obj.fatherName = value; } }, metadata: _metadata }, _fatherName_initializers, _fatherName_extraInitializers);
        __esDecorate(null, null, _motherName_decorators, { kind: "field", name: "motherName", static: false, private: false, access: { has: function (obj) { return "motherName" in obj; }, get: function (obj) { return obj.motherName; }, set: function (obj, value) { obj.motherName = value; } }, metadata: _metadata }, _motherName_initializers, _motherName_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _photoUrl_decorators, { kind: "field", name: "photoUrl", static: false, private: false, access: { has: function (obj) { return "photoUrl" in obj; }, get: function (obj) { return obj.photoUrl; }, set: function (obj, value) { obj.photoUrl = value; } }, metadata: _metadata }, _photoUrl_initializers, _photoUrl_extraInitializers);
        __esDecorate(null, null, _isValid_decorators, { kind: "field", name: "isValid", static: false, private: false, access: { has: function (obj) { return "isValid" in obj; }, get: function (obj) { return obj.isValid; }, set: function (obj, value) { obj.isValid = value; } }, metadata: _metadata }, _isValid_initializers, _isValid_extraInitializers);
        __esDecorate(null, null, _issuedAt_decorators, { kind: "field", name: "issuedAt", static: false, private: false, access: { has: function (obj) { return "issuedAt" in obj; }, get: function (obj) { return obj.issuedAt; }, set: function (obj, value) { obj.issuedAt = value; } }, metadata: _metadata }, _issuedAt_initializers, _issuedAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NationalId = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NationalId = _classThis;
}();
exports.NationalId = NationalId;
