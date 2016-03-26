var ABOne = require('abone');

var Image = ABOne.create(function () {
	
	this.constructor = function (options) {

		var position = '0 0', size = 'contain';
		
		// Set data of position
		if (typeof options.position === 'string') {
			this.position = options.position;
		} else if (typeof options.position === 'object') {
			this.position = this._getFormattedValue(options.position.left) + ' ' + this._getFormattedValue(options.position.top);
		} else {
			this.position = position;
		}

		// Set data of size
		if (typeof options.size === 'string') {
			this.size = options.size;
		} else if (typeof options.size === 'object') {
			this.size = this._getFormattedValue(options.size.left) + ' ' + this._getFormattedValue(options.size.top);
		} else if (typeof options.size === 'number') {
			this.size = this._getFormattedValue(options.size);
		} else {
			this.size = size;
		}

		if (options.image == null) {
			throw new Error('Image not found');
		}

		this.image = options.image;
		this.repeat = options.repeat || 'no-repeat';
	};

	this.getSize = function () {
		return this.size;
	}

	this.getImage = function () {
		return this.image;
	}

	this.getPosition = function () {
		return this.position;
	}

	this.getStyleAsObject = function () {
		return {
			'background-size': this.getSize(),
			'background-position': this.getPosition(),
			'background-image': "url('" + this.getImage() + "')",
			'background-repeat': this.repeat
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

module.exports = Image;