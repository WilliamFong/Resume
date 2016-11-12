var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('resumelist', ['resumelist']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/resumelist', function(req, res){
	console.log("I received a GET request");
	
	db.resumelist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post("/resumelist", function(req, res){
	console.log(req.body);
	db.resumelist.save(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/resumelist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.resumelist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.get('/resumelist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.resumelist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/resumelist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.resumelist.findAndModify(
	{query: {_id: mongojs.ObjectId(id)},
	 update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	 new: true
	}, function(err, doc){
		res.json(doc);
	});
});

app.listen(300);
console.log("listening on port 80");