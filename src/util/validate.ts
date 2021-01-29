import { JSENDTemplate, ValidatedDataTemplate } from "./api_templates";

const isValidEndpoint = (o: Object, mustHaveProps: Array<string>) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < mustHaveProps.length; i++) {
      if (!o.hasOwnProperty(mustHaveProps[i])) {
        reject(`"${mustHaveProps[i]}" is required.`);
        break;
      }
    }
    resolve(true);
  });
};

const isValidRule = (o: any | Object) => {
    return new Promise(async (resolve, reject) => {
      if (typeof o !== "object") {
        reject("rule should be an object.");
      }

      try {
        await isValidEndpoint(o, ["field", "condition", "condition_value"]);
      } catch(error) {
        reject(`${error} in rule object.`)
      }

      if(o["field"] === ""){
        reject("field cannot be an empty string.")
      }

      let conditions = ["gte", "eq", "neq", "gt", "contains"];
      if(!conditions.includes(o["condition"])){
          reject(`"condition" must be one of [${conditions}].`)
      }

      resolve(true);

    });
}

const isValidData = (o: Object | string | Array<string | number>) => {
  return new Promise((resolve, reject) => {
    const validDataTypes = ["string", "object"];
    if (!validDataTypes.includes(typeof o)) 
    {
      reject(`data field has to be a string, an object or an array.`);
    }
    resolve(true);
  })
}

const isDataVerified = (data: Object | string, field: string) => {
  return new Promise((resolve, reject) => {
    if(typeof(data) === 'string')
    {
      if(data !== field)
      {
        reject(`field ${field} is missing from data.`)
      }
    } 

    if(!data.hasOwnProperty(field)){
      reject(`field ${field} is missing from data.`);
    }

    resolve(true);
  })
}

export { isValidEndpoint, isValidRule, isValidData, isDataVerified };