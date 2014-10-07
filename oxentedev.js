'use strict';

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.get('*', function(req, res){
    res.redirect('/');
});

server.listen(process.env.PORT || 4000, function(){
  console.log('OxenteDev.org are running on port 4000');
});
