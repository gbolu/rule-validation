import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

import {errorHandler, notFound} from './middlewares';
import api from './api';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;