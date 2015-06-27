/*function database()
{
	//variables
  var Q_number = 1
  var T_time = 1;
  var que="Hi this is question number ";
  var opt = ["option_a", "option_b", "option_c","option_d"];


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

for (var i = 1; i <= 10000; i++) 
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

}*/


///////////////////////////////////////
function html_form()
{
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
}


////////////////////////////////////
function pdf_generate(Q_number,T_time,rows)
{

//PDF Creation
var PDF = require('pdfkit');            
var fs = require('fs');

//create pdf object
doc = new PDF();   

//create write object
var file = fs.createWriteStream('que_bank.pdf');
doc.pipe(file);   
doc.fontSize(20);//font size of the pdf file
doc.text("QUESTION BANK",205,300);
doc.text("MAXIMUM MARKS :"+Q_number,190,340);
doc.text("TOTAL TIME :"+T_time,220,380);
doc.moveDown().text("");
doc.text("NUMBER OF OBJECTIVE QUESTIONS :"+rows.length,100,410);
doc.text("NUMBER OF SUBJECTIIIVE QUESTION :3",100,440);
doc.addPage();

doc.fontSize(11.5);//font size of the pdf file

for(var j=0;j<rows.length;j++)
{
doc.text("Question ID :"+rows[j].id);  //adding the text to be written, 
doc.moveDown().text(rows[j].que);
doc.moveDown().text("(a) "+rows[j].opt1);
doc.moveDown().text("(b) "+rows[j].opt2);
doc.moveDown().text("(c) "+rows[j].opt3);
doc.moveDown().text("(d) "+rows[j].opt4);
doc.moveDown().text("");//for new line
}
doc.end();

}

///////////////////////////////////////////

function que_sel_logic(Q_number,T_time,rows)
{

  var start=Math.ceil(Math.random()*9999);;
  var initial=start;
  var idrand=new Array();
  var count_t=0;
  var count=0;
  var index=0;
  var flag=0;

   while(count_t<T_time&&count<Q_number)
  {
    if(rows[start].time+count<=T_time)
    {
    idrand[index]=start;
    index++;
    count++;
    count_t=count_t+rows[start].time;
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


return idrand;
}


////////////////////////////////////////////
function data_fetch()
{
app.post('/', function(req, res)
{
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
   
 var idrand=que_sel_logic(Q_number,T_time,rows);//function call for question selection
 
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
      pdf_generate(Q_number,T_time,rows);//function call for pdf file generation
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
}//function 2 end

////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var validator = require('validator');
var dialog = require('dialog');
 
var app = express();
app.use(bodyParser());

//database();
html_form();
data_fetch();

app.listen(8084);


