var boldPopup = (function(){
	var instance = this,
		extend = boldExtend,
		popups ={},

	popupFactory = function (options) {
		var newTemplate = new Popup(options);

		popups[options.id] = newTemplate;

		return newTemplate;
	},

	getPopup = function(name){
		return popups[name];
	};

	function Popup(options) {
		var defaultOptions ={
			'id': 'defaultPopup'
		}
		

		this.constructor(options);
	}

	Popup.prototype.constructor = function(opt) {
		var _this = this;

		_this.options = extend(_this.defaultOptions, opt)

		this.init();
	};

	Popup.prototype.init = function() {
		var _this = this;
			
	}
	Popup.prototype.getOption = function(optionName) {
		return this.options[optionName];
	}

	Popup.prototype.show = function() {
		var _this= this;
		console.log('showing ' + _this.getOption('id'))
	};

	Popup.prototype.hide = function() {
		var _this= this;
		console.log('hide ' + _this.getOption('id'))
	};

	return {
		create: popupFactory,
		get: getPopup,
		listPopups: popups
	};

} ());