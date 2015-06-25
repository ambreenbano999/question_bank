
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var validator = require('validator');
var dialog = require('dialog');
 
var app = express();
app.use(bodyParser());



//variables
  var Q_number = 1
  var T_time = 1;
  var que="Hi this is question number ";
  var opt = ["option_a", "option_b", "option_c","option_d"];
  var idrand=new Array();
  var i=1;
  
/*
//connection from mysql
var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 8084;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'amber12345';
var DATABASE = 'question';
var TABLE = 'table2';


var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'amber12345',
  database : 'question',
  PORT : 8084
 
});
//make connection
connection.connect();

connection.query('USE question');//database which we want to use

//query for creating table
connection.query("create table table2(id int,que varchar(50),opt1 varchar(10),opt2 varchar(10),opt3 varchar(10),opt4 varchar(10),time int)");

for (i = 1; i <= 10000; i++) 
{ 
  //query to insert data in the database
 connection.query("INSERT INTO table2 (id,que,opt1,opt2,opt3,opt4,time) VALUES ('"+ Q_number +"','"+que+Q_number+"','"+opt[0]+"','"+opt[1]+"','"+opt[2]+"','"+opt[3]+"','"+ T_time +"')", function(err, rows)
 {
  
    if(err)
    {
      throw err;
    }
  
 });//query end

Q_number+=1;
 
 if(!(T_time=Math.floor(Math.random()*16)))
 {
  T_time=1;
 }
console.log("Question number "+ Q_number +" is inserted");
}//for loop end

connection.end();//connection from mysql end
*/
///////////////////////////////////////////////////
///////////////////////////////////////////////////

app.get('/', function(req, res){

  var html = '<form action="/" method="post">' +
               'Enter Number of Question:' +
               '<input type="number" name="Q_number" value="10"/>'
               +
               '<br>' +
               'Enter Exam Time:' +
               '<input type="number" name="T_time" value="50"/>'+
               '<br>'+
               '<button type="submit">Pdf Generator</button>' +
            '</form>';
        
  res.send(html);
});


app.post('/', function(req, res)
{
  var start=Math.ceil(Math.random()*9999);;
  var initial=start;
  var count=0;
  var index=0;
  var flag=0;

  var Q_number = req.body.Q_number;
  var T_time = req.body.T_time;
  var html = 'Your Question Bank is Downloaded' +
              '.<br>' +
             '<a href="/">Generate another Question Bank.</a>';


//validation checks
if((!validator.isNull(Q_number))&&(!validator.isNull(T_time)))
{
  
  //connection from mysql to retrieve data
var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 8084;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'amber12345';
var DATABASE = 'question';
var TABLE = 'table2';


var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'amber12345',
  database : 'question',
  PORT : 8084
 
});


//PDF Creation
var PDF = require('pdfkit');            
var fs = require('fs');

//create pdf object
doc = new PDF();   

//create write object
var file = fs.createWriteStream('que_bank.pdf');
doc.pipe(file);   


//make connection
connection.connect();
connection.query('USE question');//database which we want to use
 

  //query to insert data in the database
 connection.query("SELECT * FROM table2", function(err, rows)
 {
  
    if(err)
    {
      throw err;
    }
    else
    {
      //console.log(rows.length);


  while(count<T_time)
  {
    if(rows[start].time+count<=T_time)
    {
    idrand[index]=start;
    index++;
    count=count+rows[start].time;
    console.log("id ="+start);
    }

  start++;

  if(start>10000)
    {
    start=1;
    flag=1;
    }
  else if(flag==1 && start>=initial)
    {
      break;
    }
  }

  console.log(idrand.toString());

connection.query("SELECT * FROM table2 where id in ("+idrand.toString()+")", function(err, rows)
  {
  
  if(err)
    {
      console.log(myQuery);
      throw err;
    }
  else
    {

      console.log("all is fetch");

doc.fontSize(20);//font size of the pdf file
doc.text("QUESTION BANK",205,300);
doc.text("MAXIMUM MARKS :"+Q_number,190,340);
doc.text("TOTAL TIME :"+T_time,220,380);
doc.moveDown().text("");
doc.text("NUMBER OF OBJECTIVE QUESTIONS :"+rows.length,100,410);
doc.text("NUMBER OF SUBJECTIIIVE QUESTION :3",100,440);
doc.addPage();

var j=1;
var temp=4;

doc.fontSize(11.5);//font size of the pdf file

for(j=0;j<rows.length;j++)
{
doc.text("Question ID :"+rows[j].id);  //adding the text to be written, 
doc.moveDown().text(rows[j].que);
doc.moveDown().text("(a) "+rows[j].opt1);
doc.moveDown().text("(b) "+rows[j].opt2);
doc.moveDown().text("(c) "+rows[j].opt3);
doc.moveDown().text("(d) "+rows[j].opt4);
doc.moveDown().text("");//for new line
/*if(temp==j)
  {
    doc.addPage();//for new page
    temp+=4;
    
  }*/
}
doc.end();

      connection.end();//connection from mysql end
    }
  });  
  

 }//else end
        
 });//query end





res.send(html);//pdf downloaded message to the user
}//validation if end
else
{
dialog.info('Please enter valid Question numbers and Total time');
}


});//post end

app.listen(8084);

