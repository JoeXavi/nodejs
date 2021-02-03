import express from 'express';
const app = express();
import * as path from 'path';

import { logErrors, errorHandler } from './middlewares/errorHandler.js';

import responder from './middlewares/responder.js';
app.use(responder);

const __dirname = path.resolve();
app.use('/api/static', express.static(`${__dirname}/public`));

// Routes middlewares
import route from './routes/index.js';
app.use('/api',  route );

app.use(logErrors);
app.use(errorHandler);


export default app;