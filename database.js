
var express = require('express');
var app = express();
//variables
  var Q_number = 1
  var T_time = 1;
  var que="Hi this is question number ";
  var opt = ["option_a", "option_b", "option_c","option_d"];
  var i=1;


//connection from mysql
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

