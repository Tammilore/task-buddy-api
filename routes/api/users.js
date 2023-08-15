const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyOwnership = require('../../middleware/verifyOwnership')

router.route('/')
     .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers) 
     .put(verifyOwnership, usersController.updateUser) 
     .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser) 

// To use (path) params
router.route('/:id')
     .get(verifyOwnership, usersController.getUser)

//
module.exports = router