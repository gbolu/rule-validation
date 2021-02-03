import assert from "assert";
import axios from "axios";
import { JSENDTemplate } from "../util/types";
import { isValidEndpoint } from "../util/validate";
// import { JSENDTemplate } from "../util/api_templates";
require('dotenv').config();
const PORT = process.env.PORT;

describe('/ GET Route', () => {
    it('should return a valid JSON', async() => {
        let response;
        let data;

        try {
          response = await axios.get(`http://localhost:${PORT}/`);
          data = response.data;
          assert.doesNotThrow(JSON.parse(data));
        } catch (error) {
        //   console.log(error);
        }
    })

    it('should return a valid JSON in JSEND format', async () => {
        let response;
        let data: JSENDTemplate;

        try {
          response = await axios.get(`http://localhost:${PORT}/`);
          data = response.data;
          assert.doesNotReject(isValidEndpoint(data, ["message", "data", "status"]))
        } catch (error) {
          console.error(error);
        }
    })

    it('should return JSON with details about API and creator.', async() => {
        let response;
        let data: JSENDTemplate;

        try {
          response = await axios.get(`http://localhost:${PORT}/`);
          data = response.data;
          assert.strictEqual("My Rule-Validation API", data.message)
          assert.strictEqual("success", data.status);
          assert.deepStrictEqual({
              "email": "gboluwagaadeyemi@gmail.com",
              "github": "@gbolu",
              "mobile": "09067255897",
              "name": "Gboluwaga Adeyemi",
              "twitter": "@gbolu_"
          }, data.data);
        } catch (error) {
          console.error(error);
        }
    })
})