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
exports.VerificationLog = void 0;
var typeorm_1 = require("typeorm");
var nationalIdApplication_entity_1 = require("./nationalIdApplication.entity");
var VerificationLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('verification_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _nationalIdApplicationId_decorators;
    var _nationalIdApplicationId_initializers = [];
    var _nationalIdApplicationId_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _performedBy_decorators;
    var _performedBy_initializers = [];
    var _performedBy_extraInitializers = [];
    var _performedAt_decorators;
    var _performedAt_initializers = [];
    var _performedAt_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _nationalIdApplication_decorators;
    var _nationalIdApplication_initializers = [];
    var _nationalIdApplication_extraInitializers = [];
    var VerificationLog = _classThis = /** @class */ (function () {
        function VerificationLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.nationalIdApplicationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _nationalIdApplicationId_initializers, void 0));
            this.action = (__runInitializers(this, _nationalIdApplicationId_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.performedBy = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _performedBy_initializers, void 0));
            this.performedAt = (__runInitializers(this, _performedBy_extraInitializers), __runInitializers(this, _performedAt_initializers, void 0));
            this.notes = (__runInitializers(this, _performedAt_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.nationalIdApplication = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _nationalIdApplication_initializers, void 0));
            __runInitializers(this, _nationalIdApplication_extraInitializers);
        }
        return VerificationLog_1;
    }());
    __setFunctionName(_classThis, "VerificationLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _nationalIdApplicationId_decorators = [(0, typeorm_1.Column)()];
        _action_decorators = [(0, typeorm_1.Column)()];
        _performedBy_decorators = [(0, typeorm_1.Column)()];
        _performedAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _notes_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'text' })];
        _nationalIdApplication_decorators = [(0, typeorm_1.ManyToOne)(function () { return nationalIdApplication_entity_1.NationalIdApplication; }, function (app) { return app.verificationLogs; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'nationalIdApplicationId' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _nationalIdApplicationId_decorators, { kind: "field", name: "nationalIdApplicationId", static: false, private: false, access: { has: function (obj) { return "nationalIdApplicationId" in obj; }, get: function (obj) { return obj.nationalIdApplicationId; }, set: function (obj, value) { obj.nationalIdApplicationId = value; } }, metadata: _metadata }, _nationalIdApplicationId_initializers, _nationalIdApplicationId_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _performedBy_decorators, { kind: "field", name: "performedBy", static: false, private: false, access: { has: function (obj) { return "performedBy" in obj; }, get: function (obj) { return obj.performedBy; }, set: function (obj, value) { obj.performedBy = value; } }, metadata: _metadata }, _performedBy_initializers, _performedBy_extraInitializers);
        __esDecorate(null, null, _performedAt_decorators, { kind: "field", name: "performedAt", static: false, private: false, access: { has: function (obj) { return "performedAt" in obj; }, get: function (obj) { return obj.performedAt; }, set: function (obj, value) { obj.performedAt = value; } }, metadata: _metadata }, _performedAt_initializers, _performedAt_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _nationalIdApplication_decorators, { kind: "field", name: "nationalIdApplication", static: false, private: false, access: { has: function (obj) { return "nationalIdApplication" in obj; }, get: function (obj) { return obj.nationalIdApplication; }, set: function (obj, value) { obj.nationalIdApplication = value; } }, metadata: _metadata }, _nationalIdApplication_initializers, _nationalIdApplication_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VerificationLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VerificationLog = _classThis;
}();
exports.VerificationLog = VerificationLog;
