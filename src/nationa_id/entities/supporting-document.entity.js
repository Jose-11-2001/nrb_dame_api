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
exports.SupportingDocument = void 0;
var typeorm_1 = require("typeorm");
var nationalIdApplication_entity_1 = require("./nationalIdApplication.entity");
var SupportingDocument = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('supporting_documents')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _documentType_decorators;
    var _documentType_initializers = [];
    var _documentType_extraInitializers = [];
    var _documentName_decorators;
    var _documentName_initializers = [];
    var _documentName_extraInitializers = [];
    var _documentUrl_decorators;
    var _documentUrl_initializers = [];
    var _documentUrl_extraInitializers = [];
    var _score_decorators;
    var _score_initializers = [];
    var _score_extraInitializers = [];
    var _uploadedAt_decorators;
    var _uploadedAt_initializers = [];
    var _uploadedAt_extraInitializers = [];
    var _nationalIdApplication_decorators;
    var _nationalIdApplication_initializers = [];
    var _nationalIdApplication_extraInitializers = [];
    var _nationalIdApplicationId_decorators;
    var _nationalIdApplicationId_initializers = [];
    var _nationalIdApplicationId_extraInitializers = [];
    var SupportingDocument = _classThis = /** @class */ (function () {
        function SupportingDocument_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.documentType = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _documentType_initializers, void 0));
            this.documentName = (__runInitializers(this, _documentType_extraInitializers), __runInitializers(this, _documentName_initializers, void 0));
            this.documentUrl = (__runInitializers(this, _documentName_extraInitializers), __runInitializers(this, _documentUrl_initializers, void 0));
            this.score = (__runInitializers(this, _documentUrl_extraInitializers), __runInitializers(this, _score_initializers, void 0));
            this.uploadedAt = (__runInitializers(this, _score_extraInitializers), __runInitializers(this, _uploadedAt_initializers, void 0));
            this.nationalIdApplication = (__runInitializers(this, _uploadedAt_extraInitializers), __runInitializers(this, _nationalIdApplication_initializers, void 0));
            this.nationalIdApplicationId = (__runInitializers(this, _nationalIdApplication_extraInitializers), __runInitializers(this, _nationalIdApplicationId_initializers, void 0));
            __runInitializers(this, _nationalIdApplicationId_extraInitializers);
        }
        return SupportingDocument_1;
    }());
    __setFunctionName(_classThis, "SupportingDocument");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _documentType_decorators = [(0, typeorm_1.Column)()];
        _documentName_decorators = [(0, typeorm_1.Column)()];
        _documentUrl_decorators = [(0, typeorm_1.Column)()];
        _score_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _uploadedAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _nationalIdApplication_decorators = [(0, typeorm_1.ManyToOne)(function () { return nationalIdApplication_entity_1.NationalIdApplication; }, function (app) { return app.supportingDocuments; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'nationalIdApplicationId' })];
        _nationalIdApplicationId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _documentType_decorators, { kind: "field", name: "documentType", static: false, private: false, access: { has: function (obj) { return "documentType" in obj; }, get: function (obj) { return obj.documentType; }, set: function (obj, value) { obj.documentType = value; } }, metadata: _metadata }, _documentType_initializers, _documentType_extraInitializers);
        __esDecorate(null, null, _documentName_decorators, { kind: "field", name: "documentName", static: false, private: false, access: { has: function (obj) { return "documentName" in obj; }, get: function (obj) { return obj.documentName; }, set: function (obj, value) { obj.documentName = value; } }, metadata: _metadata }, _documentName_initializers, _documentName_extraInitializers);
        __esDecorate(null, null, _documentUrl_decorators, { kind: "field", name: "documentUrl", static: false, private: false, access: { has: function (obj) { return "documentUrl" in obj; }, get: function (obj) { return obj.documentUrl; }, set: function (obj, value) { obj.documentUrl = value; } }, metadata: _metadata }, _documentUrl_initializers, _documentUrl_extraInitializers);
        __esDecorate(null, null, _score_decorators, { kind: "field", name: "score", static: false, private: false, access: { has: function (obj) { return "score" in obj; }, get: function (obj) { return obj.score; }, set: function (obj, value) { obj.score = value; } }, metadata: _metadata }, _score_initializers, _score_extraInitializers);
        __esDecorate(null, null, _uploadedAt_decorators, { kind: "field", name: "uploadedAt", static: false, private: false, access: { has: function (obj) { return "uploadedAt" in obj; }, get: function (obj) { return obj.uploadedAt; }, set: function (obj, value) { obj.uploadedAt = value; } }, metadata: _metadata }, _uploadedAt_initializers, _uploadedAt_extraInitializers);
        __esDecorate(null, null, _nationalIdApplication_decorators, { kind: "field", name: "nationalIdApplication", static: false, private: false, access: { has: function (obj) { return "nationalIdApplication" in obj; }, get: function (obj) { return obj.nationalIdApplication; }, set: function (obj, value) { obj.nationalIdApplication = value; } }, metadata: _metadata }, _nationalIdApplication_initializers, _nationalIdApplication_extraInitializers);
        __esDecorate(null, null, _nationalIdApplicationId_decorators, { kind: "field", name: "nationalIdApplicationId", static: false, private: false, access: { has: function (obj) { return "nationalIdApplicationId" in obj; }, get: function (obj) { return obj.nationalIdApplicationId; }, set: function (obj, value) { obj.nationalIdApplicationId = value; } }, metadata: _metadata }, _nationalIdApplicationId_initializers, _nationalIdApplicationId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SupportingDocument = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SupportingDocument = _classThis;
}();
exports.SupportingDocument = SupportingDocument;
