const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body // The keys for the request body
     if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required'})
     const foundUser = await User.findOne({ email: email }).exec() // Check that there is a username like that
     if (!foundUser) return res.sendStatus(401) // If there isn't then retun 401, 401 is status code for Unauthorized
     // else do the below
     const match = await bcrypt.compare(pwd, foundUser.password) // Compare the pwd in the request to the password in the DB
     if (match) { // If they match
        const roles = Object.values(foundUser.roles) // Get the user's roles
        const accessToken = jwt.sign( // Create jwt tokens for your protected routes
         { 
            "UserInfo": {
            "id": foundUser._id,
            "email": foundUser.email,
            "roles": roles
         } 
      },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '3600s'} // For production this should be a longer time
        )
        const refreshToken = jwt.sign( 
         {"email": foundUser.email, "id": foundUser._id},
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: '1d'} // Refresh token should have a longer expiry time
        )
        // We save the refresh token in the database so we are able to invalidate it when the user logs out
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)

        // We send the accessToken as the json response so it is just stored in memory and used in the frontend
        // But for the refreshToken we need to store it not just in local memory so we need to send it as an httpOnly cookie to the refresh route
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // Sending it as a cookie labelled jwt. Add secure:true when pushing to prod
        res.json({ accessToken })
     } else{
        res.sendStatus(401) // If they don't match send status 401
     }
}

module.exports = { handleLogin }