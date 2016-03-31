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
		
		this.constructor(options);
	}

	Popup.prototype.constructor = function(opt) {
		var _this = this,
			defaultOptions ={
			'id': 'defaultPopup',
			'appendTo': 'body',
			'html':''
		}

		_this.options = extend(defaultOptions, opt);
		if(_this.options.prependTo) 
			delete _this.options.appendTo;  

		this.init();
	};

	Popup.prototype.init = function() {
		var _this = this;
			console.log(_this.options)
	};

	Popup.prototype.setOption = function(optionName, value) {
		this.options[optionName] = value;
	};

	Popup.prototype.getOption = function(optionName) {
		return this.options[optionName];
	};

	Popup.prototype.createNodeFromHTML = function(html) {
		var myElement = document.createElement('div');
		myElement.setAttribute("id", this.getOption('id'));
		myElement.innerHTML = html;
	
		return myElement;
	};

	Popup.prototype.show = function() {
		var _this= this,
			// Jezeli nie prepend to na pewno append
			method = (_this.getOption('prependTo'))? 'prependTo' : 'appendTo';
			if(!_this.getOption('added'))
				_this.addByMethod(method);
			else
				document.getElementById(this.getOption('id')).style.display = ''

	};

	Popup.prototype.addByMethod = function(method) {
		var _this = this,
		nodeElement = this.createNodeFromHTML(_this.getOption('html'));
		switch(method){
			case 'appendTo':
				document.querySelector(_this.getOption('appendTo')).appendChild(nodeElement);
				break;	
			case 'prependTo':
				var elementToPrepend = document.querySelector(_this.getOption('prependTo'));
				elementToPrepend.insertBefore(nodeElement,elementToPrepend.childNodes[0]);
				break;		
		}
		this.setOption('added', true);
	};

	Popup.prototype.hide = function() {
		var _this= this;
		if (this.getOption('added')) {
				document.getElementById(this.getOption('id')).style.display = 'none';
		}
	};
	
	Popup.prototype.remove = function() {
		var _this= this;
		if (this.getOption('added')) {
				document.getElementById(this.getOption('id')).remove();
				this.setOption('added', false);
		}
	};

	return {
		create: popupFactory,
		get: getPopup,
		listPopups: popups
	};

} ());