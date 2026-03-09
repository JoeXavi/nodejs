'use strict'

import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';
import AuthService from '../services/authService.js';

// Basic strategy
import '../plugins/passport/strategies/basic.js';

const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/sign-in', authController.signIn);

export default router;