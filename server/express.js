const express = require('express') 
const path = require('path') 
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser') 
const compress = require('compression') 
const cors = require('cors') 
const helmet = require('helmet') 

//routers
const authRouter = require('./routers/auth.router')
const userRouter = require('./routers/user.router')
const productRouter = require('./routers/product.router')
const customerRouter = require('./routers/customer.router')
const orderRouter = require('./routers/order.router')
const app = express()

//comment out before building for production

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())


//routers
app.use('/', authRouter)
app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', customerRouter)
app.use('/', orderRouter)


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../build'))

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, '../build', 'index.html'))
	})
}





// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

module.exports = app
