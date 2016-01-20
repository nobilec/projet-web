'use strict';
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var multer  = require ('multer');
var app = express();
var logger = require('morgan');

app.use(logger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/PROG', function(err) {
  if (err) { throw err; }
});
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    _id : ObjectId,
    pseudo : String,
    email : String,
    password : String,
    friends :[{pseudo :String}] ,
    groupes :[{groupeName :String}]
  });
var userModel = mongoose.model('users', userSchema);

var groupeSchema = new mongoose.Schema({
    _id : ObjectId,
    owner : String,
    name : String,
    members :[{pseudo :String}]
});
var groupeModel = mongoose.model('groupes', groupeSchema);


var transactionSchema = new mongoose.Schema({
    _id : ObjectId,
    userPaid : String,
    userShare :[{pseudo : String, amount : Number}],
    groupeName : String,
    description : String,
    date : String,
    imageID : String,
    amount : Number
});
var transactionModel = mongoose.model('transactions', transactionSchema);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, X-HTTP-Method-Override');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    next();
});


app.post('/addUser', function(req, res) {


    var newUser = new userModel({ pseudo : req.body.pseudo,
        email : req.body.email,
        password : req.body.password });
    newUser.save();
});

app.get('/testserver', function(req, res) {
	res.json("test");
	console.log("test réussi");
});

app.post('/addfriend', function(req, res) {
    var User = new userModel();
    User.update({pseudo : req.body.pseudo},{$pushAll: {friends:{pseudo:req.body.friend}}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully added");
        }
    });
});

app.post('/addgroupe', function(req, res) {
    var User = new userModel();
    User.update({pseudo : req.body.pseudo},{$pushAll: {groupes:{groupeName:req.body.groupeName}}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully added");
        }
    });
    var newGroupe = new groupeModel({

        owner : req.body.pseudo,
        name : req.body.groupeName });
    newGroupe.save();
});

app.post('/addfriend2groupe', function(req, res) {
    var Groupe = new groupeModel();
    Groupe.update({ name : req.body.groupeName},{$pushAll: { members :{pseudo :req.body.friend}}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully added");
        }
    });
    var User = new userModel();
    User.update({pseudo : req.body.friend},{$pushAll: {groupes:{groupeName:req.body.groupeName}}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully added");
        }
    });
});

app.post('/GetUser', function(req, res) {
    var query = userModel.find({ email : req.body.email});

    query.exec(function (err, comms) {
        if (err) { throw err; }
        res.type('application/json');
        res.json(comms);
    });
});
app.post('/Getfriend2groupe', function(req, res) {
    var query = groupeModel.find({ name : req.body.groupeName});

    query.exec(function (err, comms) {
        if (err) { throw err; }
        res.type('application/json');
        res.json(comms);
    });
});

/*
 *	Ajoute une transaction.
 */
app.post('/addTransaction', function(req, res) {
	res.setHeader("Content-Type", "application/json")
    var newTransaction = new transactionModel({
        userPaid : req.body.userPaid,
        userShare : req.body.userShare,
        groupeName : req.body.groupeName,
        description : req.body.description,
        date : req.body.date,
        imageID : req.body.imageID,
        amount : req.body.amount
    });
    newTransaction.save(function (err, data) {
		if (err) console.log(err);
		res.json(newTransaction);
	});
});

/*
 * Renvoie toutes les transactions d'un utilistaeur.
 */
app.get("/getTransactions/:pseudo", function(req, res) {
	res.setHeader("Content-Type", "application/json")
	var query = transactionModel.find({userPaid : req.params.pseudo})
	query.exec(function(errs, comms) {
		if (errs) {
			res.status(500).send(errs)
			throw errs
		}
		res.json(comms)
	})
})

/*
 * Supprime une transaction.
 * Pourquoi "get"? Parce que delete echoue.
 */
app.get("/delTransaction/:id", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	
	var query = transactionModel.remove({_id: req.params.id})
	query.exec(function(errs, comms){
		if (errs) {
			res.status(500).send(errs)
			throw errs
		}
		res.json(comms)
	})
})

app.post('/GetTransaction', function(req, res) {
    var query = transactionModel.find({ userPaid : req.body.pseudo});

    query.exec(function (err, comms) {
        if (err) { throw err; }
        res.type('application/json');
        res.json(comms);
    });

});

app.get('/getTransactionShare/:pseudo', function(req, res) {
    var query = transactionModel.find({ userShare :{ $elemMatch: {pseudo: req.params.pseudo}}});

    query.exec(function (err, comms) {
        if (err) { throw err; }
        res.type('application/json');
        res.json(comms);
    });

});

app.post('/GetTransactionShare', function(req, res) {
    var query = transactionModel.find({ userShare :{ $elemMatch: {pseudo: req.body.pseudo}}});

    query.exec(function (err, comms) {
        if (err) { throw err; }
        res.type('application/json');
        res.json(comms);
    });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});