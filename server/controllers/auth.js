import bcrypt from "bcrypt"; //allow encrypt password
import jwt from "jsonwebtoken"; //give us a way to send user webtoken for authorization
import User from "../models/User.js";

/* REGISTER USER*/
export const register = async (req, res) => {  //async is a call to mongodb, api call front-end to back end and back end to database
 try{
    const{
        firstName,
        lastName,
        email,
        password,                 //req is requested body from fron end and response what we send back to front end
        picturePath,
        friends,
        location,
        occupation
    } = req.body;

    const salt = await bcrypt.genSalt(); //create randon salt provided by bcrypt, we use salt to encrypt a password
    const passwordHash = await bcrypt.hash(password, salt); //encrypt password


//The way register will work
  //1.encrypt password
  //2. after we ave it, when user logs in, they will provide password
  //3 solve that again an make sure it's the correct password
  //4. give them a json web token

    const newUser = new User({      
        firstName,
        lastName,
        email,
        password: passwordHash,                                                
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000)                         
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);                //Send user back if all these above doesn't error out. 
 } catch (err){                                     //1. We are gonna send user status 201 which means something has been created. 
    res.status(500).json({ error: err.message });   //2. Send back correct status. 
 }                                                  //3. Create json version of the saved user so front end can receive that response

}  //register function














