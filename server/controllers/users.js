import User from "../models/User";

/* READ */ 
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;  //grab id from that particular string
        const user = await User.findById(id); //and we can use that id to grab the information of the user that we need
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {  //grab all user friends related ro specified ID
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(              //Promise because we are going to do multiple API calls to database
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(   //make sure we can format in the proper way before we send back to the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }

        ); 
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */ 

export const addRemove Friend = async (req, res) => {
    try {
        const {id, friendID } = req.params;
        const user = await User.findById(id); //grab user
        const friend = await User.findById(friendID); //grab friend info

        if (user.friends.includes(friendID)) {  //if friendId is included in mainusers friendsID, if so, make sure is removed, because already is in main users friend list
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id); //remove user from friend's list
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(              //Promise because we are going to do multiple API calls to database
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(   //make sure we can format in the proper way before we send back to the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        ); 

    res.status(200).json(formattedFriends);     
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


















