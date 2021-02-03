'use strict'

import express from 'express';
const router = express.Router();
import passport from 'passport';
import _ from 'lodash';
// Basic strategy
import '../plugins/passport/strategies/basic.js';

import  { jwtSign, setScopes } from '../plugins/jsonwebtoken/index.js';

router.post('/sign-in',  async (req, res, next) => { 
    
    passport.authenticate('basic', (error, user, info) => {
        try {
            
            if (error || !user){
                return res.error("Unauthorized",401)
            }
        
            req.login(user, { session: false}, async (error) => {

                if (error) {                    
                    return res.error(error,401)
                }
                
                const token = jwtSign(user)                

                return res.success({
                    message:'Authentication is successfuly, to enjoy',
                    token:token,
                    user:{
                        id:user.id,                        
                        //model_id:user.model_id,
                        name:user.name,        
                        //role: {id:user.role.id,name:user.role.name},                                  
                        email:user.email,
                        //scopes:setScopes(user)
                    }
                },200)
            })
                
        } catch (error) {
            return res.error(error,401);
        }
        
    })(req, res, next);
});



export default router;