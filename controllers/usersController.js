const User = require('../model/User')

const getAllUsers =  async (req, res) => {
    const users = await User.find() // This function returns all the records/documents in the database, in this case users
    if (!users) return res.status(204).json({ 'message': 'No users found' })
    res.json(users)
}

 const updateUser = async (req, res) => {
    if (!req?.body?.id) { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    
    const user = await User.findOne({_id: req.body.id}).exec() // Check that the id passed in the req is in mongodb. The key of id in mongo is _id    
    if (!user) {
        return res.status(204).json({ 'message': `No user matches ID ${req.body.id}.` }) // If you do not find it in the data then return the error
    } // else proceed with the below
    if (req.body?.email) user.email = req.body.email // Update the variables to what was provided in the request body
    // Work on password update route
    const result = await user.save()
    res.json(result) // Return just the updated user
 }

 const deleteUser = async (req, res) => {
    if (!req?.body?.id) { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    const user = await User.findOne({_id: req.body.id}).exec() // Check that the id passed in the req is in mongodb. The key of id in mongo is _id    
    if (!user) {
        return res.status(204).json({ 'message': `No user matches ID ${req.body.id}.` }) // If you do not find it in the data then return the error
    } 
    const result = await user.deleteOne({ _id: req.body.id })
    res.json(result)
 }

 const getUser =  async (req, res) => {
    if (!req?.params?.id)  { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    const user = await User.findOne({_id: req.params.id}).exec() // Check that the id passed in the req path param is in mongodb. The key of id in mongo is _id    
    if (!user) {
        return res.status(204).json({ 'message': `No user matches ID ${req.body.id}.` }) // If you do not find it in the data then return the error
    } 
    res.json(user) // if found, return just the employee
 }

 module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser
 }