var express = require('express');
var path = require('path');

var bodyParser  = require('body-parser');
const {check, validationResult} = require('express-validator');


var session = require('express-session');

var myApp = express();

// parse application/x-www-form-urlencoded
myApp.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
myApp.use(bodyParser.json())


myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

myApp.get('/',function(req, res){
    res.render('index');
});

myApp.get('/contact',function(req, res){
    res.render('contactform');
});



myApp.post('/contact',[
        check('name', 'Must have a name').not().isEmpty(),
        check('email', 'Must have email').isEmail(),
    ],
    function(req, res){
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()){
            res.render('contactform', {
                errors:errors.array()
            })
        }
        else {
            var name = req.body.name;
            var email = req.body.email;
            res.render('contactthanks', {
                name:name,
                email: email
            });
        }
    }
);


myApp.listen(8080);
console.log('Server started at 8080 for mywebsite...');