import express from "express";
import {login} from "../controllers/auth.js";

const router = express.Router();  //allow express identify these routes will all be configured and allowsus to have them in separate files to keep it organized

router.post("/login", login); //it will always be auth/login even tho not shown

export default router;



























