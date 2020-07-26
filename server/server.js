const config = require('./../config/config')
const app =  require('./express')
const mongoose = require('mongoose')

// Connection URL
mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, { useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.connection.on('error', (err, client) => {
  if (err) {
    throw new Error(`unable to connect to database: ${config.mongoUri} ${err}`)
  }
})

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

