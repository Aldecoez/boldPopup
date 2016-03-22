var boldPopup = (function(){
	var instance = this,
		popups ={};

	function Popup(options) {
		this.popupId= options.id;

		this.constructor(options);
	}

	Popup.prototype.constructor = function(options) {
	
	};

	Popup.prototype.show = function() {
		var _this= this;
		console.log('showing ' + _this.popupId)
	};

	Popup.prototype.hide = function() {
		var _this= this;
		console.log('hide ' + _this.popupId)
	};

	var popupFactory = function (options) {
		var newTemplate = new Popup(options);

		popups[options.id] = newTemplate;

		return newTemplate;
	};
	return {
		create: popupFactory,
		popups: popups
	};

} ());