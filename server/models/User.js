//Use info created with DataModel Scheema

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {         //we will have a string with those properties
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {         
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {         
            type: String,
            required: true,
            max: 50,
            unique: true //no duplicate emails
        },
        password: {         
            type: String,
            require: true,
            min: 5,  
        },
        picturePath: {         
            type: String,
            default: "",
        },
        friends: {         
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    {timestamps: true} //automatic dates from when it's created
    );

    const User = mongoose.model("User", UserSchema)   //schema line 5 gets created first, then passed to 46 (mongoose.model) and then user
    export default User; 

    //aligns to object created for Users on DataModel