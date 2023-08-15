const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async  (req, res) => {
     const { email, pwd } = req.body // The keys for the request body
     if (!email || !pwd) return res.status(400).json({ 'message': 'Email address and password are required'})
     // Check to see if a user whose username is in the mongodb equals the user variable passed in the request body
     const duplicate = await User.findOne({ email: email }).exec()
     if (duplicate) return res.sendStatus(409) // If there is then retun 409, 409 is status code for conflict
     try { // else do the below
         const hashedPwd = await bcrypt.hash(pwd, 10) // Encrypt the pwd
         // Create and store the new user in mongodb
         // We are not assigning the role of User like before cuz we already set it as default in our Mongodb schema
         const result = await User.create({ 
            "email": email,
            "password": hashedPwd
        })
        
        console.log(result)

         res.status(201).json({ 'success': `New user ${email} created!`})
     } catch (err) {
        res.status(500).json({ 'message': err.message})
     }
}

module.exports = { handleNewUser }