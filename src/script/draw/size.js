var ABOne = require('abone');

var Size = ABOne.create(function () {
	
	this.constructor = function (width, height) {
		this.width = width;
		this.height = height;
	}	

	this.getWidth = function () {
		return this.width;
	}

	this.getHeight = function () {
		return this.height;
	}

	this.getStyleAsObject = function () {
		return {
			'width': this._getFormattedValue(this.getWidth()),
			'height': this._getFormattedValue(this.getHeight())
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

module.exports = Size;