import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import bodyparser from 'body-parser';

require('dotenv').config();

import {errorHandler, notFound} from './middlewares';
import api from './api';
import { JSENDTemplate } from './util/api_templates';

const app = express();

app.use(morgan('short'));
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
      if (err) {
        let response = new JSENDTemplate();
        response.data = null;
        response.message = "Invalid JSON payload passed.";
        response.status = "error";
        return res.status(400).json(response); // Bad request
      }
      next();
    });
});

app.use(api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
