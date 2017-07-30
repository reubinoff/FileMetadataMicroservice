var express = require('express')
var app = express()
var logger = require('winston')
var bodyParser = require('body-parser');

var morgan = require('morgan')

var multer = require('multer')
var upload = multer({ dest: '/tmp/myapp/' })
const server_config = require('./config/server_config')


logger.add(logger.transports.File, { filename: "/tmp/" + server_config.app_name + ".log" })

logger.info("Application started!")


// set static pages
const pages_path = __dirname + "/www"
app.set('view engine', 'pug')
app.set('views', pages_path)
app.set('view options', {
  layout: false
});

logger.log(express.static(pages_path))


// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//router

app.post('/file', upload.single('avatar'), function (req, res, next) {
  
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  const size = req.file.size
  res.json({size});
})

// index page
app.get('/', function (req, res) {
  res.render('my_form', {
    title: 'my main page'
  })
})



// Server startup
const port = server_config.server_port
app.listen(port, function () {
  logger.info(server_config.app_name + ' listening on port ', port)
})


