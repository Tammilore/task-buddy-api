const whitelist = [
    'https://yoursite.com', 
    'http://127.0.0.1:550', 
    'http://localhost:3500'
] // This array includes whatever domains should be able to access your backend server, update this in prod

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1  || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions