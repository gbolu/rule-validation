import express, { Request, Response } from 'express';
import {IValidateRule, JSENDTemplate} from '../util/api_templates'
import { isDataVerified, isValidData, isValidEndpoint, isValidRule } from '../util/validate';
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
    return res.status(200).json(response);
  }
);

export = router;