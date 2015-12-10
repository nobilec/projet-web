var express = require("express")
var bodyParser = require("body-parser")
var mongoClient = require("mongodb").MongoClient
var fs = require("fs")

var app = express()
app.use("/client", express.static("../../client"))

var svPort = "3000"
var dbPort = "27017"
var httpP = "http://"
var mongP = "mongodb://"
var dbName = "splitwiseDB"
var collnName = "test"
var bjour = "BONJOUR"

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

// SERV

mongoClient.connect(resAddr(dbName, dbPort, mongP), function(err, db) {
    if(!err) {
	console.log("We are connected")

	db.collection("world_bank", function(err, collection){
	    
	    // EXRPESS SERVER :

	    /*app.get("", function(req, res){
		fs.readFile(indexHTML, function(err, data){
		    if ( err ){
			res.set("Content-Type", "text/html")
			res.status(500).send("SERVER ERROR!")
			return
		    }
		    console.log(indexHTML + " : \n" + data)
		    
		    res.set("Content-Type", "text/html")
		    res.status(200).send(data)
		})
	    })*/

	    app.get("/bonjour", function(req, res){
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
