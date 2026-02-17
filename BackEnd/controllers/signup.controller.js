const USER = require('../models/user');
const bcrypt = require('bcryptjs');
const {generateToken} = require("../utils/generateToken")

const creatingUserController = async(req,res) => {
    const {name,email,password} = req.body;
    console.log(name,email,password);
    try{
            
        //checking if fields are missing ?
        if(!name || !email || !password) {
            return res.status(400).json({status:false,message:"All fiels are required."});
        }
        

        // checking is user already exist ?
        const isUserExisting = await USER.findOne({email});
        if(isUserExisting) {
            return res.status(400).json({status:false,message:"Already user exist with this email."});
        }


        // normal password --> hashed password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password,salt);


        const newUser = await USER.create({name,email,password:hashedPassword});
        return res.status(201).json(
            {
                status:true,
                message:"User created successfully.",
                token:generateToken(newUser._id),
                user:{
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email
                }
            });
    } catch(error){
        console.log(error);
        return res.status(500).json({status:false,message:"Server error."});
    }
}


const deletingUserController = async(req,res) => {
    const {_id} = req.params; // /:_id
    
    // if _id is undefined returns
    if(!_id) {
        return res.status(400).json({status:false,message:"Id is not recieved."});
    }

    try{
        // checking user exist or not 
        const isUserExist = await USER.findById(_id);
        if(!isUserExist) {
            return res.status(404).json({status:false,message:"User Not Found."});
        }

        // deleting user
        await USER.findByIdAndDelete(_id);
        return res.status(200).json({status:true,message:" User Deleted successfully."});
    } catch(error) {
        console.log(error);
        return res.status(500).json({status:false,message:"Server error"});
    }
}

module.exports = {creatingUserController,deletingUserController};