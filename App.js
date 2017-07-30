var express = require('express')
var app = express()
var logger = require('winston')
var bodyParser = require('body-parser');

var morgan = require('morgan')
const server_config = require('./config/server_config')


logger.add(logger.transports.File, { filename: "/tmp/"+server_config.app_name+".log" })

logger.info("Application started!")


// set static pages
const pages_path = __dirname + "/www" 
app.set('view engine', 'pug')
app.set('views', pages_path)
logger.log(express.static(pages_path))


// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// index page
app.get('/', function(req, res){
  res.render('index', {
    title: 'my main page'
  })
})



// Server startup
const port  = server_config.server_port
app.listen(port, function () {
    logger.info(server_config.app_name+' listening on port ', port)
})


