"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var JSENDTEMPLATE = yup_1.object().shape({
    "message": yup_1.string().required("A key of \"message\" is required. Takes a string value."),
    "status": yup_1.string().required("A key of \"status\" is required. Takes a string value of \"success\" or \"failure\""),
    "data": yup_1.object().required("Data object is required").shape({})
});
exports.JSENDTEMPLATE = JSENDTEMPLATE;
var ;
