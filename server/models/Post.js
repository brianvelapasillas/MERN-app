import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String, 
        userPicturePath: String, //represents profile image
        likes: {
            type: Map,  //mongodb saves it as Map
            of: Boolean, //check if userid exists, value will be true always if it exists
        },                //if we like, will add to this map, if not remove that map
        comments: {
            types: Array,
            default: [] //empty array 
        }
    },
    { timestamps; true} //another object
);

const Post = mongoose.model("Post", postSchema);

export default Post;


