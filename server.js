"use strict"
import logger from './utils/logger.js';
logger.info("Server Starting");

import express from 'express';
const app = express();
import { config } from './config/index.js';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

app.use(bodyParser.json({limit: '900mb'}));
app.use(bodyParser.urlencoded({limit: '900mb', extended: true, parameterLimit:900000}));

// Direct morgan logs to winston
app.use(morgan('tiny', { stream: { write: message => logger.http(message.trim()) } }));

import confiCors from './config/cors.js';
app.use(cors(confiCors));

app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.xssFilter());

app.get('/', (req, res) => {
    res.send('main');
});
import api from './app.js';
app.use(api);

const server = app.listen(config.port, () => {
    logger.info(`Server up on port ${config.port}`);
});