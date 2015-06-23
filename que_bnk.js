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

}//validation if end
else
{

dialog.info('Please enter valid Question numbers and Total time');

}


});//post end


/////////////////////////////////////////

app.listen(8083);


