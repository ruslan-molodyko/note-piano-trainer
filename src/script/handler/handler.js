var ABOne = require('abone'),
	$ = require('jquery');

require('./shuffle.js')($);

var Handler = ABOne.create(function () {
	
	this.constructor = function (draw) {
		this.currentStatus;
		this.draw = draw;
		this.selectorButtons = '.controls__item .button';
		this.selectorButtonsWrapper = '.controls__item';
		this.selectorResult = '.grid__result';
		this.trueAnswer = 'True';
		this.falseAnswer = 'False';
		this.trueClass = 'grid__result--true';
		this.falseClass = 'grid__result--false';
	}	

	this.start = function () {

		$(this.selectorButtons).click(function (el) {
			var id = parseInt($(el.target).attr('data-id'));
			this.checkResult(id);
			this.showRandom();
		}.bind(this));

		this.showRandom();
	};

	this.checkResult = function (id) {
		$(this.selectorResult).html(id === this.currentStatus ? this.trueAnswer : this.falseAnswer);
		$(this.selectorResult).removeClass(this.trueClass);
		$(this.selectorResult).removeClass(this.falseClass);
		$(this.selectorResult).addClass(id === this.currentStatus ? this.trueClass : this.falseClass);
	};

	this.showRandom = function() {
		var rand = this.getRandom(NOTES.DO, NOTES.SI);
		this.currentStatus = rand;
		this.draw.drawNote(rand, true);
		$(this.selectorButtonsWrapper).shuffle();
	}

	this.getRandom = function(min, max) {
		var rand;
		while (true) {
			rand = Math.floor(Math.random() * (max - min + 1)) + min; 
			if (rand != this.currentStatus) {
				break;
			}
		}
		return rand;
	}
});

module.exports = Handler;