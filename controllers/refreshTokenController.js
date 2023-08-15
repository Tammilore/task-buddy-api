const User = require('../model/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies 
     if (!cookies?.jwt) return res.sendStatus(401) // Check for a cookie and then check that it is with param jwt, if not return 401
     const refreshToken = cookies.jwt

     const foundUser = await User.findOne({refreshToken: refreshToken}).exec() // Check that the token passed in the req cookies is for a user in the DB since we previously stored it in authController
     if (!foundUser) return res.sendStatus(403) // If there isn't then retun 403, 403 is status code for Forbidden
     // else evaluate jwt
     jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403) // If the user's username is not equals to the username when decoded then return 403
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign( // else create an accessToken
               {   
                 "UserInfo": {
                      "id": decoded._id,
                      "email": decoded.email,
                      "roles": roles
                  } 
               },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '3600s'}           
            )
            res.json({ accessToken }) // Send the accessToken as an object to the frontend
        }
    )
}


module.exports = { handleRefreshToken }