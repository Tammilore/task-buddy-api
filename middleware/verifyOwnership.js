const verifyOwnership = (req, res, next) => {
    const recordOwnerId = req.params.id || req.body.id // Whether the record ID passed is a  parameter or in req body
  
    const currentUserId = req.id // The id we passed using the verifyJWT middleware
  
    // Check if the current user is the owner of the record
    if (currentUserId === recordOwnerId) {
      console.log(recordOwnerId)
      console.log(currentUserId)
      return next()
    }
  
    // If the user is not the owner, return a 403 Forbidden status
    console.log(recordOwnerId)
      console.log(currentUserId)
    return res.sendStatus(403)
  }

module.exports = verifyOwnership
  