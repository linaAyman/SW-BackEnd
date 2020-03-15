 const  express = require('express')
 const session  = require('express-session')
 const MongoStore = require('connect-mongo')(session)
 let sessionOptions = session({
  secret:"h3hhhshjhjhak*/wqdj%sjuah",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized :false,
  cookie:{maxAge:1000 * 60 *60 *24 ,httpOnly: true}
 })
 const app = express()
 app.use(sessionOptions)
 //./ ye3ny eny ast7dam ely gomaha 
 const  router = require('./router')
 app.use(express.urlencoded({extended: false}))
 app.use(express.static('public'))
 app.set('views', 'views')
 app.set('view engine','ejs')
//ast7dam roueter fy home 
 app.use('/' , router);
 
module.exports = app