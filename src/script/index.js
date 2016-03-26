var Draw = require('./draw/draw.js'),
	$ = require('jquery'),
	CONFIG = require('./config.js'),
	NOTES = require('./handler/notes-enum.js'),
	Handler = require('./handler/handler.js');

var draw = new Draw();
draw.initScene();

var handler = new Handler(draw);
handler.start();
