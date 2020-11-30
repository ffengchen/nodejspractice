let express = require('express');
const controller = require('./controller/controller');
let todoController = require('./controller/controller')
let app = express();

//set up template
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//file controllers
todoController(app);

//port
app.listen(3000);
