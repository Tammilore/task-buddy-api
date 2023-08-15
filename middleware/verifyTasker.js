const Task = require('../model/Task')

const verifyTasker = async (req, res, next) => {
    const task = await Task.findOne({_id: req.body.id || req.params.id}).exec() // Check that the id passed in the req path param is in mongodb. The key of id in mongo is _id    
    if (!task) {
        return res.status(204).json({ 'message': `No task matches ID ${req.param.id}.` }) // If you do not find it in the data then return the error
    } 

    const taskOwnerId = task.taskOwner.toString()
    const currentUserId = req.id // The id we passed using the verifyJWT middleware
  
    // Check if the current user is the owner of the record
    console.log('taskOwnerId:', taskOwnerId);
    console.log('currentUserId:', currentUserId);
    if (currentUserId === taskOwnerId) {
      return next()
    }
  
    // If the user is not the owner, return a 403 Forbidden status
    return res.sendStatus(403)
  }

module.exports = verifyTasker
  