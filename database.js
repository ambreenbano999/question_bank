var express = require('express');
var app = express();

  var Q_number = 1
  var T_time = 1;
  var que="Hi this is question number ";
  var opt = ["option_a", "option_b", "option_c","option_d"];
  var i=1;

//validation checks
console.log('hi');

//connection

var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 8083;
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
  PORT : 8083
 
});

connection.connect();

connection.query('USE question');

connection.query("create table table2(id int,que varchar(50),opt1 varchar(10),opt2 varchar(10),opt3 varchar(10),opt4 varchar(10),time int)");

for (i = 1; i <= 10000; i++) 
{ 
 connection.query("INSERT INTO table2 (id,que,opt1,opt2,opt3,opt4,time) VALUES ('"+ Q_number +"','"+que+Q_number+"','"+opt[0]+"','"+opt[1]+"','"+opt[2]+"','"+opt[3]+"','"+ T_time +"')", function(err, rows)
 {
  //console.log("write");
    if(err)
    {
    throw err;
    }else
    {

    //console.log( rows );
    }
  
 });

Q_number+=1;
 if(!(T_time=Math.floor(Math.random()*16)))
 {
T_time=1;
 }

}

connection.end();
console.log("write");

