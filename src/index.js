const path= require('path')
const express = require('express')
const morgan = require('morgan')
const {engine}= require('express-handlebars')
const app = express()
const port = 3000
const db = require('./config/db')
const  route = require('./routes/index')
const methodOverride = require('method-override')


const SortMiddleware= require('./app/middlewares/sortMiddleware')
//HTTP logger
//app.use(morgan('combined'))

//connect database
  db.connect();

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//overide method put 
app.use(methodOverride('_method'))

//custom middlewares
app.use(SortMiddleware)

// Template engine
app.engine('.hbs', engine({
  extname:".hbs",
  helpers: require('./helpers/handlebars')
}));
app.set('view engine','.hbs')
app.set('views', path.join(__dirname, 'resources','views'))

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})