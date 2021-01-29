class JSENDTemplate {
    message: string | undefined;
    status: string | undefined;
    data: string | Object | undefined | null;

    constructor(){
        this.message = "Succesful"
        this.status = "success"
        this.data = null;
    }
}

class ValidationTemplate {
    error: boolean;
    field: string;
    field_value: string | number;
    condition: "eq" | "neq" | "gt" | "gte" | "contains";
    condition_value: string | number;
    constructor(){
        this.error = false;
        this.field = "";
        this.field_value = "";
        this.condition = "eq";
        this.condition_value = "";
    }

}

class ValidatedDataTemplate {
    validation: IDataValidate;
    constructor(){
        this.validation = new ValidationTemplate();
    }
}

interface IDataValidate {
  error: boolean;
  field: string;
  field_value: string | number;
  condition: "eq" | "neq" | "gt" | "gte" | "contains";
  condition_value: string | number;
}

interface IValidateRule {
    "rule": {
        "field": string,
        "condition": "eq" | "neq" | "gt" | "gte" | "contains",
        "condition_value": string | number
    },
    "data": string | object | Array<string | number>
}

export {
    JSENDTemplate, IValidateRule, IDataValidate, ValidatedDataTemplate
}