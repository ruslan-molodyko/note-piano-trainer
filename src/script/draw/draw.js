var ABOne = require('abone'),
	Sprite = require('./sprite.js'),
	Position = require('./position.js'),
	Image = require('./image.js'),
	Size = require('./size.js'),
	CONFIG = require('../config.js');
	NOTES = require('../handler/notes-enum.js');

var Draw = ABOne.create(function() {
	this.constructor = function () {
		this.position = [];
		this.mainSprite = null;
		this.currentNoteSprite = null;
	};

	this.drawNote = function (status, removePrevious) {
		if (removePrevious) {
			this.removeNote(status);
		}
		if (this.currentNoteSprite != null) {
			throw new Error('Prevoius note not removed');
		}
		this.currentNoteSprite = this._getNoteSpriteByStatus(status);
		this.mainSprite.addChild(this.currentNoteSprite);

		if (status === NOTES.DO || status === NOTES.RE) {
			this.mainSprite.addChild(this._getLineSprite(status));
		}
	};

	this.removeNote = function (status) {
		if (this.currentNoteSprite != null) {
			this.mainSprite.removeChild(this.currentNoteSprite.getId());
			this.currentNoteSprite = null;
			if (this.mainSprite.hasSprite('line')) {
				this.mainSprite.removeChild('line');
			}
		}
	};

	this.initScene = function () {
		this._initPosition();
		this._initMainSprite();
		this._initAdditionalSprites();
	};

	this._initPosition = function () {
		var startHorizontal = 90,
			stepHorizontal = 60,
			startVertical = 123,
			stepVertical = -13;
		this.position[NOTES.DO] = new Position(startHorizontal + (1 * stepHorizontal), startVertical + (1 * stepVertical))
		this.position[NOTES.RE] = new Position(startHorizontal + (2 * stepHorizontal), startVertical + (2 * stepVertical))
		this.position[NOTES.MI] = new Position(startHorizontal + (3 * stepHorizontal), startVertical + (3 * stepVertical))
		this.position[NOTES.FA] = new Position(startHorizontal + (4 * stepHorizontal), startVertical + (4 * stepVertical))
		this.position[NOTES.SOL] = new Position(startHorizontal + (5 * stepHorizontal), startVertical + (5 * stepVertical))
		this.position[NOTES.LA] = new Position(startHorizontal + (6 * stepHorizontal), startVertical + (6 * stepVertical))
		this.position[NOTES.SI] = new Position(startHorizontal + (7 * stepHorizontal), startVertical + (7 * stepVertical))
	};

	this._getLineSprite = function (status) {
		var newPosition = this._getPosition(status);
		newPosition.top = newPosition.top + 92;
		return new Sprite('line', new Size(53, 7), newPosition, new Image({
			size: CONFIG.mainSpriteSize,
			position: {left: -435, top: -330},
			image: CONFIG.mainSpritePath
		}), {'z-index': 9});
	};

	this._getNoteSpriteByStatus = function (status) {
		return new Sprite('main-' + status, new Size(55, 110), this._getPosition(status), new Image({
			size: CONFIG.mainSpriteSize,
			position: {left: -316, top: -123},
			image: CONFIG.mainSpritePath
		}),  {'z-index': 10});
	};

	this._getPosition = function (status) {
		this._initPosition();
		if (this.position[status] != null) {
			return this.position[status];
		}		
		throw new Error('Position not found by status = ' + status);
	};

	this._initMainSprite = function () {

		this.mainSprite = new Sprite('main', new Size('100%', 250), new Position(0, 0), new Image({
			size: CONFIG.mainSpriteSize,
			position: {left: -42, top: -365},
			image: CONFIG.mainSpritePath
		}));

		this.mainSprite.attachTo('.canvas');
	};

	this._initAdditionalSprites = function () {

		this.keySprite = new Sprite('key', new Size(84, 233), new Position(50, 15), new Image({
			size: CONFIG.mainSpriteSize,
			position: {left: -84, top: -66},
			image: CONFIG.mainSpritePath
		}));

		this.mainSprite.addChild(this.keySprite);
	};
});

module.exports = Draw;