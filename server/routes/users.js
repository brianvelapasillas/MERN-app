import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const route = express.Router();


/* READ */  //read route used to grab info, not add to database
router.get("/:id", verifyToken, getUser); //this is gonna be users/:id   and that line will get the user
                                          //id means that if front end or user is sending particular id we can grab it and call database
                                          //called query string
router.get("/:id/friends", verifyToken, getUserFriends); // this line will grab users friends if we need to call that separately

/* UPDATE */
router.patch("/:id/:friendID", verifyToken, addRemoveFriend); //patch is the update function
                                                              //we need both the user and friend ID
export default router; //exported so that express knows
                       //from here we need to setup the controllers where all logic happens


















