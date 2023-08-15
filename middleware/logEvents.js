const { format } = require('date-fns')
const { v4: uuid } = require('uuid') // Import v4 as uuid
// These are npm modules we imported using npm i

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
// These are core modules that didn't need to be imported from external source

const logEvents = async (message) => { // An async function with a message parameter
      const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
      const logItem = `${dateTime}\t${uuid()}\t${message}\n`
      try {
            if (!fs.existsSync(path.join(__dirname,'..', 'logs'))) { // If directory 'logs' does not exist then create it before appending the logItem variabel to the eventlog.txt file in the directory
                await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) 
            } //The .. means to go back one directory before the current one
            await fsPromises.appendFile(path.join(__dirname,'..', 'logs', 'reqLog.txt'), logItem)
      }catch (err) {
        console.error(err)
      }
}

const logger = (req, res, next) => {
      logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
      console.log(`${req.method} ${req.path}`)
      next()
  }

module.exports = { logger, logEvents } // Exporting the logEvent and logger function so we can use it in another file
