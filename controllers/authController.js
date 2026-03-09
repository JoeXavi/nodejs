import passport from 'passport';
import { jwtSign } from '../plugins/jsonwebtoken/index.js';
import logger from '../utils/logger.js';

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    signIn = (req, res, next) => {
        passport.authenticate('basic', async (error, user, info) => {
            try {
                if (error || !user) {
                    logger.warn('Authentication failed: no user or error present');
                    return res.error("Unauthorized", 401);
                }

                req.login(user, { session: false }, async (loginError) => {
                    if (loginError) {
                        logger.error(`Login error: ${loginError.message}`, { stack: loginError.stack });
                        return res.error(loginError, 401);
                    }

                    // In a more complex architecture, authService might validate or augment the user object here,
                    // but since the basic strategy already validated credentials, we proceed to issue a token.
                    const token = jwtSign(user);
                    logger.info(`User ${user.email} logged in successfully.`);

                    return res.success({
                        message: 'Authentication is successfuly, to enjoy',
                        token: token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        }
                    }, 200);
                });

            } catch (err) {
                logger.error(`Unexpected auth error: ${err.message}`, { stack: err.stack });
                return res.error(err, 401);
            }
        })(req, res, next);
    }
}

export default AuthController;
