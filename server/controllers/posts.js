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
        const post = await Post.find();  //grabbing the news feed  
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {   //grab all the posts of everyone
    try {
        const post = await Post.find();  //grabbing the news feed  
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.satus(200).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/* UPDATE*/
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatePost);
    } catch (err) {
        res.satus(404).json({ message: err.message });
    }
}




















