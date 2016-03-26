var ABOne = require('abone');
var $ = require('jquery');
var Sprite = ABOne.create(function() {

	this.constructor = function (id, size, position, image, style) {
		this.id = id;
		this.position = position;
		this.image = image;
		this.size = size;
		this.customStyle = style;
		this.element = this._setElement(null);
		this.parent = null;
		this.parentElement = null;
		this.style = this._convertStyle();
		this.child = [];
		this.spriteClass = 'sprite-element';
	};

	this.getElement = function () {
		if (this.element != null) {
			return this.element;
		}
		throw new Error('Element not found');
	};

	this.getId = function () {
		return this.id;
	};

	this.addChild = function (sprite) {
		this._addChild(sprite);
		this.getElement().append(sprite._spriteHtml());
		sprite._setElement(this.getElement().find('#' + sprite.getId()));
		sprite._setParent(this);
	};

	this.removeChild = function (id) {
		var sprite = this._getSpriteById(id);
		sprite.getElement().remove();
		this._removeChild(sprite);
	};

	this.attachTo = function (selector) {
		var element = $(selector);
		element.append(this._spriteHtml());
		this.parentElement = element;
		this._setElement(element.find('#' + this.id));
	};

	this._setParent = function (parent) {
		this.parent = parent;
	};

	this._convertStyle = function () {
		var result = {};
		if (this.position == null) {
			throw new Error('Position not found');
		}
		if (this.image == null) {
			throw new Error('Position not found');
		}
		if (this.size == null) {
			throw new Error('Size not found');
		}
		result = Object.assign(
			this.size.getStyleAsObject(),
			this.position.getStyleAsObject(),
			this.image.getStyleAsObject(),
			this.customStyle
		);
		return result;
	};

	this._addChild = function (sprite) {
		this.child.push(sprite);
	};

	this._removeChild = function (sprite) {
		this.child.forEach(function (item, key) {
			if (sprite.getId() === item.getId()) {
				delete this.child[key];
			}
		}.bind(this));
	};

	this.hasSprite = function (id) {
		var result = false;
		this.child.forEach(function (sprite) {
			if (id === sprite.getId()) {
				result = true;
			}
		});
		return result;
	};

	this._getSpriteById = function (id) {
		var result;
		this.child.forEach(function (sprite) {
			if (id === sprite.getId()) {
				result = sprite;
			}
		});
		if (result != null) {
			return result;
		}
		throw new Error('Sprite with id = ' + id + ' not found');
	};

	this._setElement = function (element) {
		this.element = element;
	};

	this._spriteHtml = function () {
		return '<div id="' + this.getId() + '" class="' + this.spriteClass + '" style="' + this._styleObjectToText(this.style) + '"></div>';
	};

	this._styleObjectToText = function (style) {
		var result = ';';
		for (item in style) {
			result += item + ':' + style[item] + ';';
		}
		return result;
	};
});

module.exports = Sprite;