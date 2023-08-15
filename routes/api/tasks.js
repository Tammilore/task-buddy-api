const express = require('express')
const router = express.Router()
const tasksController = require('../../controllers/tasksController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyTasker = require('../../middleware/verifyTasker')

router.route('/')
     .get(tasksController.getUsersTasks) 
     .post(tasksController.createNewTask) 
     .put(verifyTasker, tasksController.updateTask) 
     .delete(verifyTasker, tasksController.deleteTask) 

// To use (path) params
router.route('/:id')
     .get(verifyTasker, tasksController.getTask)

//
module.exports = router