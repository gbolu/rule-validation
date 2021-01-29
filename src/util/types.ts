export interface IDataValidate {
  error: boolean;
  field: string;
  field_value: string | number;
  condition: "eq" | "neq" | "gt" | "gte" | "contains";
  condition_value: string | number;
}

export interface IValidateRule {
  rule: {
    field: string;
    condition: "eq" | "neq" | "gt" | "gte" | "contains";
    condition_value: string | number;
  };
  data: string | object | Array<string | number>;
}