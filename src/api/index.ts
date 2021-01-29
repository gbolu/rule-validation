import express, { Request, Response } from 'express';
import {JSENDTemplate, ValidationTemplate} from '../util/api_templates'
import { IValidateRule } from '../util/types';
import { isDataVerified, isValidData, isValidEndpoint, isValidRule, performValidate } from '../util/validate';
const router = express.Router();

router.get('/', (_req, res) => {
  let response = new JSENDTemplate();
  response.message = "My Rule-Validation API";
  response.status = "success";
  response.data = 
    {
      name: "Gboluwaga Adeyemi",
      github: "@gbolu",
      email: "gboluwagaadeyemi@gmail.com",
      mobile: "09067255897",
      twitter: "@gbolu_",
    };
  res.status(200).json(response);
});

router.post(
  "/validate-rule",
  async (req: Request, res: Response) => {
    let jsonReq: IValidateRule = req.body;
    let response = new JSENDTemplate();

    try {
      await isValidEndpoint(jsonReq, ["rule", "data"]);
      await isValidRule(jsonReq["rule"]);
      await isValidData(jsonReq["data"]);
      await isDataVerified(jsonReq["data"], jsonReq["rule"]["field"]);
    } catch (error) {
      response.message = error;
      response.status = "error";
      response.data = null;
      return res.status(400).json(response);
    }

    let validatedData = new ValidationTemplate();
    let rule = jsonReq["rule"];
    let data = jsonReq["data"]
    validatedData.condition = rule.condition;
    validatedData.condition_value = rule.condition_value;
    validatedData.field = rule.field;
    validatedData.field_value = data[rule.field];
    try {
      await performValidate(rule.condition, rule.field, rule.condition_value, data);
      response.message = `field ${rule.field} successfully validated.`;
      response.status = "success";
      response.data = {"validation": validatedData};
      return res.status(200).json(response);
    } catch (error) {
      response.message = `field ${rule.field} failed validation.`;
      response.status = "error"
      validatedData.error = true;
      response.data = {"validation": validatedData}
      return res.status(400).json(response);
    }
  }
);

export = router;