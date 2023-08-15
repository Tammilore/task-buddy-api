const Task = require('../model/Task')
const User = require('../model/User')

const getUsersTasks =  async (req, res) => {
    const tasks = await Task.find({taskOwner: req.id}) // This function returns all the records/documents in the database where the taskOwner id is equal to the id of who made the request
    if (!tasks) return res.status(204).json({ 'message': 'No tasks found' })
    res.json(tasks)
}

 const createNewTask = async (req, res) => {
   if (!req?.body?.taskName || !req?.body?.dueDate) { // If there i sno ftask name or date in the request body then return error below
        return res.status(400).json({ 'message': 'Name and due date of the task are required' })
   }

   try {
     const result = await Task.create({
        taskName: req.body.taskName,
        dueDate: req.body.dueDate,
        description: req.body.description,
        taskOwner: req.id
     })
     
   const user = await User.findOne({_id: req.id}).exec()
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
   } else {
    console.log('oldtasknumber', user.totalTasks)
    user.totalTasks = user.totalTasks + 1
    console.log('newtasknumber', user.totalTasks )
    const updatedUser = await user.save()
    console.log(updatedUser)
   }

   console.log(result)
   res.status(201).json(result)
   }catch (err) {
      console.error(err)
   }
 }

 const updateTask = async (req, res) => {
    if (!req?.body?.id) { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    
    const task = await Task.findOne({_id: req.body.id}).exec() // Check that the id passed in the req is in mongodb. The key of id in mongo is _id    
    if (!task) {
        return res.status(204).json({ 'message': `No task matches ID ${req.body.id}.` }) // If you do not find it in the data then return the error
    } // else proceed with the below
    if (req.body?.taskName) task.taskName = req.body.taskName // Update the variables to what was provided in the request body
    if (req.body?.dueDate) task.dueDate = req.body.dueDate
    if (req.body?.description) task.description = req.body.description
    const result = await task.save()
    res.json(result) // Return just the updated employee
 }

 const deleteTask = async (req, res) => {
    if (!req?.body?.id) { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    const task = await Task.findOne({_id: req.body.id}).exec() // Check that the id passed in the req is in mongodb. The key of id in mongo is _id    
    if (!task) {
        return res.status(204).json({ 'message': `No task matches ID ${req.body.id}.` }) // If you do not find it in the data then return the error
    } 
    const result = await task.deleteOne({ _id: req.body.id })
    res.json(result)
 }

 const getTask =  async (req, res) => {
    if (!req?.params?.id)  { // If there is no id in the req body return the error below
        return res.status(400).json({ 'message': 'ID param is required' })
    }
    const task = await Task.findOne({_id: req.params.id}).exec() // Check that the id passed in the req path param is in mongodb. The key of id in mongo is _id    
    if (!task) {
        return res.status(204).json({ 'message': `No task matches ID ${req.param.id}.` }) // If you do not find it in the data then return the error
    } 
    res.json(task) // if found, return just the employee
 }

 module.exports = {
    getUsersTasks,
    createNewTask,
    updateTask,
    deleteTask,
    getTask
 }