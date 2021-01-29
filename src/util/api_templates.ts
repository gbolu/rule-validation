import { IDataValidate } from "./types";

export class JSENDTemplate {
    message: string | undefined;
    status: string | undefined;
    data: string | Object | undefined | null;

    constructor(){
        this.message = "Succesful"
        this.status = "success"
        this.data = null;
    }
}

export class ValidationTemplate {
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
export class ValidatedDataTemplate {
    validation: IDataValidate;
    constructor(){
        this.validation = new ValidationTemplate();
    }
}