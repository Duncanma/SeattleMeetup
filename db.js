//db.js module
var mysql = require("mysql");

var con;

function openConnection() {

	con = mysql.createConnection({
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
		return con;
	});
}

function getVideos(term) {

	if (!con)
	{
		openConnection();
	}

	con.query(
		'SELECT Title,URL,PlayerURL FROM meetup.AllChannel9Videos WHERE Tags like \'%' + term + '%\' order by TotalViewCount DESC',
		function(err,rows){
			if(err) throw err;
			return rows;
		}
	);
}

function endConnection() {
	try {
		con.end(function(err) {});
		
	} catch (error) {
		console.log("Error closing connection");	
	}
}
	

module.exports = {
	openConnection : openConnection,
	endConnection : endConnection,
	getVideos: getVideos
};

