import _ from 'lodash';
import * as path from 'path';
import model from '../models/index.js';
// const __dirname = path.resolve();
// console.log(`${__dirname}/models/index.js`)
// const User = import(`${__dirname}/models/index.js`);

class AuthService {

    async login(username){        

        const relations = {        
            
            // include: [
            // {
            //     model: Role,
            //     attributes:['id','name'],
            //     include:{ model: RolePermissions, include: {model: Permission}}
            // },{
            //     model: RolePermissions,
            //     attributes:['id','permission_id'],
            //     include: [{
            //         attributes:['name'],
            //         model: Permission
                    
            //     }]
            // },{
            //     model:UserPermissions,
            //     attributes:['id','permission_id'],
            //     include: [{
            //         attributes:['name'],
            //         model: Permission
            //     }]
            // }]
        }  
        
        const User = model.users
        //console.log("User:", User)
        const rows = await User.findAll({
            where:{ email: username },
            ...relations
        })

        
        if (rows.length == 0){
            throw new Error ('Authentication failed.' )
        }

        let user =_.first(rows)

        return user
    }


}

export default AuthService