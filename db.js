//db.js module
var mysql = require("mysql");


function getVideos(term) {

	var con;

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
		con.query(
			'SELECT Title,URL,PlayerURL FROM meetup.AllChannel9Videos WHERE Tags like \'%Azure%\' order by TotalViewCount DESC LIMIT 10',
			function(err,rows){
				if(err) throw err;
				return rows;
			}
		);		
	});
}

function endConnection() {
	try {
		con.end(function(err) {});
		
	} catch (error) {
		console.log("Error closing connection");	
	}
}
	

module.exports = {
	getVideos: getVideos
};

