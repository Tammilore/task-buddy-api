const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401) // If there is no token passed in the request at all or there is and it doesn't have roles return 401
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)
        console.log(req.roles)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        // The above checks for which roles passed in the request via the token are part of the allowed roles defined via rolesArray
        // The function returns a true or false value for each role, based on the results do the below
        if (!result) return res.sendStatus(401) // If no trues, return 401
        next()
    }
}

module.exports = verifyRoles