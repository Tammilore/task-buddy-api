// This file is to verify the JWT token that gets sent via the header
// Then import it to the api routes that we want protected
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization // This is so we catch the value whether small a or big a for authorization is used
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) // If the header is not present or if it is present and does not start with Bearer and a space then return error 401
    const token = authHeader.split(' ')[1] // The token is in the header as Bearer token so this line is so we extract just the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.email = decoded.UserInfo.email
            req.roles = decoded.UserInfo.roles
            req.id = decoded.UserInfo.id
            next()
        }
    )
} 

module.exports = verifyJWT