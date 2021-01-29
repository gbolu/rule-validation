// import { JSENDTemplate, ValidatedDataTemplate } from "./api_templates";

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

const isValidData = (o: Object | string | Array<string|number>) => {
  return new Promise((resolve, reject) => {
    const validDataTypes = ["string", "object"];
    if (!validDataTypes.includes(typeof o)) 
    {
      reject(`data field has to be a string, an object or an array.`);
    }
    resolve(true);
  })
}

const isDataVerified = (data: Object | string | Array<string|number>, field: string | any) => {
  return new Promise((resolve, reject) => {
    let rejectionMsg = `field ${field} is missing from data`;
    if (Array.isArray(data)) {
      if(data[field] === undefined){
        reject(rejectionMsg)
      }
    }

    if(typeof(data) === 'string')
    {
      if (isNaN(parseInt(field))) 
      {
        reject(rejectionMsg)
      }
    } 

    if(!data.hasOwnProperty(field)){
      reject(rejectionMsg);
    }

    resolve(true);
  })
}

const performValidate = (condition: string, field: string, condition_value: string | number, data: string | Object | Array<any>): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let dataValue = data[field];
    switch(condition)
    {
      case "gte":
        dataValue >= condition_value ? resolve(true) : reject(false);
        break;
      case "eq":
        dataValue === condition_value ? resolve(true) : reject(false);
        break;
      case "neq":
        dataValue !== condition_value ? resolve(true) : reject(false);
        break;
      case "gt":
        dataValue > condition_value ? resolve(true) : reject(false);
        break;
      case "contains":
        if(Array.isArray(data)){
          if(dataValue.includes(condition_value)){
            resolve(true)
          }
        }
        reject(false)
        break;
    }
  })
}

export { isValidEndpoint, isValidRule, isValidData, isDataVerified, performValidate };