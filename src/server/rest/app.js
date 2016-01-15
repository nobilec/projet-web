var express = require("express")
var bodyParser = require("body-parser")
var mongoClient = require("mongodb").MongoClient
var fs = require("fs")

var app = express()

var svPort = "3000"
var dbPort = "27017"
var httpP = "http://"
var mongP = "mongodb://"
var dbName = "splitwiseDB"
var collnName = "test"
var bjour = "BONJOUR"

//app.use("/client", express.static("../../client"))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

/*
 * Retourne l'adrese d'une ressource.
 * EX : resAddr("Bonjour") => "http://localhost:3000/Bonjour"
 */
var resAddr = function(res, port, protocol, ip) {
    res = ( res == undefined ? "" : res )
    ip = ( ip == undefined ? "localhost" : ip )
    protocol = ( protocol == undefined ? httpP : protocol )
    port = ( port == undefined ? svPort : port )

    return protocol + ip + ":" + port + "/" + res
}

var readJSONFile = function(filename, callback) {
    fs.readFile(filename, function (err, data) {
	if(err) {
	    callback(err)
	    return
	}
	try {
	    callback(null, JSON.parse(data))
	} catch(exception) {
	    callback(exception)
	}
    })
}

// SERVEUR :

mongoClient.connect(resAddr(dbName, dbPort, mongP), function(err, db) {
    if(!err) {
	console.log("We are connected")

	db.collection("world_bank", function(err, collection){

		app.get("/bonjour", function(req, res){
			console.log("requete recue")
			res.set("Content-Type", "text/html")
			res.status(200).send(bjour)
		})
	    
		app.listen(svPort, function() {
			console.log("Server running at " + resAddr())
	    })
	})
	
    } else {
		console.log(err)
    }
})
