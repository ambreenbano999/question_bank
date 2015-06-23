var express = require('express');
var bodyParser = require('body-parser');

var validator = require('validator');
var dialog = require('dialog');
 
var app = express();
app.use(bodyParser());

app.get('/', function(req, res){
  var html = '<form action="/" method="post">' +
               'Enter Number of Question:' +
               '<input type="number" name="Q_number" value="10"/>'
               +
               '<br>' +
               'Enter Exam Time:' +
               '<input type="number" name="T_time" value="50"/>'+
               '<br>'+
               '<button type="submit">Submit</button>' +
            '</form>';
        
  res.send(html);
});

app.post('/', function(req, res){

  var Q_number = req.body.Q_number;
  var T_time = req.body.T_time;
  
var html = 'Numbers: ' + Q_number + ' and total_time: '+ T_time +
              '.<br>' +
             '<a href="/">Try again.</a>';


//validation checks
if((!validator.isNull(Q_number))&&(!validator.isNull(T_time)))
{
console.log('hi');

res.send(html);
//connection
/*
var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 8083;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'amber12345';
var DATABASE = 'abcd';
var TABLE = 'table1';


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'amber12345',
  database : 'abcd',
  PORT : 8083
 
});

connection.connect();

connection.query('USE abcd');


var dataQuery="INSERT IGNORE INTO table1 (Username,Email) VALUES ('"+userName+"','"+emailId+"')";


 connection.query( dataQuery, function(err, rows){
    if(err) {
      throw err;
    }else{
      console.log( rows );
    }
  });



connection.end();*/
}//validation if end
else
{

dialog.info('Please enter valid Question numbers and Total time');

}


});//post end


/////////////////////////////////////////

app.listen(8083);


