var ABOne = require('abone');

var Position = ABOne.create(function () {
	
	this.constructor = function (left, top) {
		this.left = left;
		this.top = top;
	};

	this.getLeft = function () {
		return this.left;
	}

	this.getTop = function () {
		return this.top;
	}

	this.getStyleAsObject = function () {
		return {
			'top': this._getFormattedValue(this.getTop()),
			'left': this._getFormattedValue(this.getLeft())
		}
	}

	this._getFormattedValue = function (value) {
		if (typeof value === 'string') {
				return value;
		} else if (typeof value === 'number') {
				return value + 'px';
		} else {
			throw new Error('Type of value is wrong');
		}
	}
});

module.exports = Position;