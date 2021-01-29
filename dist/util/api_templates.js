"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSENDTemplate = /** @class */ (function () {
    function JSENDTemplate() {
        this.message = "Succesful";
        this.status = "success";
        this.data = null;
    }
    return JSENDTemplate;
}());
exports.JSENDTemplate = JSENDTemplate;
var ValidationTemplate = /** @class */ (function () {
    function ValidationTemplate() {
        this.error = false;
        this.field = "";
        this.field_value = "";
        this.condition = "eq";
        this.condition_value = "";
    }
    return ValidationTemplate;
}());
exports.ValidationTemplate = ValidationTemplate;
var ValidatedDataTemplate = /** @class */ (function () {
    function ValidatedDataTemplate() {
        this.validation = new ValidationTemplate();
    }
    return ValidatedDataTemplate;
}());
exports.ValidatedDataTemplate = ValidatedDataTemplate;
