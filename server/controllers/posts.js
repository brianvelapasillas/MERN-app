import Post from "../models/Post.js";

/* CREATE */  
export const createPost = async(res) => { //image getting passed through middleware, but not past it
    try {
        const { userId, description, picturePath } = req.body; //front end is gonna send this 
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},     // this determines that someone liked it or not. If not listed didn't like it
            comments: []     
        })
        await newPost.save();
                                        //to save it, grab it(find), and return(post)
        const post = await Post.find();    
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}























