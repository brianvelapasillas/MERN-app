import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";; //set the paths when we configure directories
import authRoutes from "./routes/auth.js"; //paths and routes for every feature
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js"; //needed for line 40(register route)
import {createPost} from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/*CONFIGURATIONS (functions that run in between diff things) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE (in real life we would preffer store in cloud) */
const storage =multer.diskStorage({
    destination: function (req, file, cb) {
        cd(null, "public/assets"); //everytime something is uploaded to website is storared here
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);          // All these config come from package instructions
    }
});
const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);    //if you wanna register, you will call this api from the frontend
                                                                   //this one cannot be on a separate file beause needs the upload right above
                                                                   //only when we need to upload a file, the other ones can be separate
app.post("/posts", verifyToken, upload.single("picture"), createPost)  //allow user upload a picture, that's why this one is needed here
                                                             //when we send from the front end the pic image, upload.single("picture") will grab it and upload from the http call into the local, "picture" can be named anything
                                                             //createPost is another controller


/* ROUTES */  //for our express router to use
app.use("/auth", authRoutes);    
app.use("/users", userRoutes);
app.use("/posts", postRoutes);                                                              

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001; //port it goes if the other one doesn't work
mongoose.connect(process.env.MONGO_URL, {     //connecting to database from node server
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
. then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));









