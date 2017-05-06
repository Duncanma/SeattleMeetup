var mysql = require("mysql");
var express = require("express");
var app = express();
var router = express.Router();

// First you need to create a connection to the db
var con = mysql.createConnection({
		host: "localhost",
		user: "seattle",
		password: "P@ssw0rd1",
		database: "meetup"
	});

con.connect(function(err){
if(err){
	console.log('Error connecting to Db');
	return;
}
console.log('Connection established');
});

router.get("/", function(req, res){
	con.query(
		'SELECT Title,URL,PlayerURL FROM meetup.AllChannel9Videos WHERE Tags like \'%Azure%\' order by TotalViewCount DESC',
		function(err,rows){
			if(err) throw err;
			console.log('Data received from Db:\n');
			console.log(rows);}
		);
});
con.end(function(err) {});
