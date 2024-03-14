import bodyParser from "body-parser";
import express from "express";
import mongoose from mongoose;
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";; //set the paths when we configure directories

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
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
// All these config come from package instructions




