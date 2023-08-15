const User = require('../model/User')

const handleLogout = async (req, res) => {
    const cookies = req.cookies 
     if (!cookies?.jwt) return res.sendStatus(204) // Check for a cookie and then check that it is with param jwt, if not return 204, no content
     const refreshToken = cookies.jwt

     const foundUser = await User.findOne({refreshToken: refreshToken}).exec() // Check that the token passed in the req cookies is for a user in the DB since we previously stored it in authController
     if (!foundUser) { // If we don't find a token for the found user, run the below to clear the cookie that is present anyway 
        res.clearCookie('jwt', {httpOnly: true}, {secure:true})
        return res.sendStatus(204)
     }

     // If we found the refresh token for the user then run the below
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)
    
    res.clearCookie('jwt', {httpOnly: true}) // Add {secure:true} before pushing to prod
    res.sendStatus(204)

}


module.exports = { handleLogout }