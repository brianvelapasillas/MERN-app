import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) =>{ //next(optional) parameter allows us have function continue
    try {
        let token = req.header("Authorization"); //from req from from end we are grabbing the authorization header and thats where token will be set in the front end and the we can grab in in the back end through this key

        if (!token) { //if does not exist
            return res.status(403).send("Access Denied");
        }

        if (token,startsWith("Bearer ")){
            token = token.slice(7, token.lenght).trimLeft();  //setting token to start with Bearer on the front end
        }                                                     //1. taking everything from right side of bearer 2. token will be placed after space in the Bearer

            const verified = jwt.verify(token, process.env.JWT_SECRET); //check jwt
            req.user = verified;
            next(); //this is the function we have to use from middleware

    } catch (err) {
        res.status(500).json({ error: err.message }) //in real life projects need to handle these erros properly
    }

}


















