'use strict'

import * as path from 'path';
const join = path.join;

import express from 'express';
const route = express.Router();

import auth from './auth.js';
route.use('/auth', auth);

export default route;
