//db.js module
var mysql = require("mysql");
var insights;

function setup(client) {
	insights = client;
}

function getVideos(term, callback) {


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

		insights.trackEvent("mysql.connection");

		insights.trackEvent("mysql.query", {term: term});

		var termvalue = '%' + term + '%';

		con.query(
			'SELECT Title,URL,PlayerURL FROM meetup.AllChannel9Videos WHERE Tags like ? order by TotalViewCount DESC LIMIT 10', [termvalue],
			function(err,rows){
				con.end();
				if(err) throw err;
				callback(rows);
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
	getVideos: getVideos,
	setup: setup
};

