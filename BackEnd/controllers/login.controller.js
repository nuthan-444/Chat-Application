const USER = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

const userLogin = async(req,res) => {

    const {email,password} = req.body;
    // check email password is there
    if(!email || !password) {
        return res.status(400).json({status:false,message:"every field is required"});
    }

    try{
        // checks user exists or not
        const user = await USER.findOne({email});

        //if user don't exist
        if(!user) {
            return res.status(404).json({status:false,message:"User Not Found."});
        }

        // matches password
        const isLogin = await bcrypt.compare(password,user.password);

        //if password not matching
        if(!isLogin) {
            return res.status(400).json({status:false,message:"Wrong Password"});
        }

        // login successfully
        return res.status(200).json({status:true,message:"User logged in successfully",token:generateToken(user._id),user:user});

    } catch(error){
        return res.status(500).json({status:false,message:"Server error"});
    }
}

module.exports = {userLogin}