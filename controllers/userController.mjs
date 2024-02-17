import UserModel from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class User{
    async getUser(req, res){
        try{
            if(!req.cookies.jwt){
                res.status(428)
                return res.redirect('/login')
            }
            const userJWT = jwt.verify(req.cookies.jwt, process.env.SECRET);
            const userData = await UserModel.findById(userJWT.id)
            const clientData = {
                name: userData.first_name + ' ' + userData.last_name,
                email: userData.email
            }
            res.render('user', {title: 'Profile', data: clientData})
        }catch(err){
            res.status(500).json({message: `Server Error: ${err}`})
        }
    }

    async signOut(req, res){
        try{
            res.clearCookie('jwt')
            res.redirect('/')
        }catch(err){
           res.status(500).json({message: `Server Error: ${err}`}) 
        }
    }
}

export default new User()