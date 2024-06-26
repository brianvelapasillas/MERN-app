import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //grab user feed when we are on the home page
router.get("/:userId/posts", verifyToken, getFeedPosts); //grab only userID posts

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //like and unlike post;

export default router;















