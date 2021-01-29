"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var JSENDTEMPLATE = yup_1.object().shape({
    "message": yup_1.string().required(),
    "status": yup_1.string().required(),
    "data": yup_1.object().required().shape({})
});
exports.JSENDTEMPLATE = JSENDTEMPLATE;
