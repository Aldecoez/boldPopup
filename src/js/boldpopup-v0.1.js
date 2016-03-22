window.boldTemplate = ( function (mainOptions) {

var templates = {},
	instanace = this,
	debug = boldDebug,
	extend= boldExtend,
	loadOptions = function () {

	}();

// POBIERANIE DANYCH DO SZABLONU (AJAX, ARGUMENTS, DOM)

// SZABLONOWANIE
function Template (options) {
	this.html = options.html || "<div class='boldPopup'>example</div>";
	this.data = options.data || {};
	this.events = options.events || {};
	this.name = options.name || "Empty template";

	this.constructor(options);
}

Template.prototype.constructor = function() {
	templates[instanace.id] = this;
};

Template.prototype.setParam = function(key, val) {
	this[key] = val;
};

Template.prototype.getSource = function () {
	return this.source;
};

var templateFactory = function (options) {
	var defaultOptions = {
			source: "DOM",
			autoBind: true
		},
		_this = this;

	generateTemplateId = function () {
		var templateCount = 0,
			template;
		for (template in templates) {
			if (!templates.hasOwnProperty(template)){
				continue;
			}
			templateCount = templateCount + 1;
		}
		return templateCount;
	};

	create = function (options) {
		instanace.id = options.id;
		_this.newTemplate = new Template(options);
		_this.newTemplate.setParam("id", generateTemplateId());
		loadSource(options);
	};

	loadSource = function (options) {
		var source;
		if (_this.options.source === "DOM") {
			source = document.getElementById(options.id).innerHTML;
		}
		_this.newTemplate.setParam("source", source);
		if (_this.options.autoBind) {
			bindData();
		}
	};

	bindData = function (data) {
		var dataToBind = data || _this.options.data,
			template = Handlebars.compile(_this.newTemplate.source),
			html = template(dataToBind);
			
		_this.newTemplate.setParam("html", html);
		debug.add({type: "TEMPLATES", stringArray: "Bindowanie danych do szablonu: " + _this.newTemplate.name});
	};

	attachEvent = function (events) {
		var eventId,
			event,
			element;
		for (eventId in events) {
			if ((!events.hasOwnProperty(eventId))){
				continue;
			}
			event = events[eventId];
			domElementId = event.id || false;
			domElementClass = event.class || false;

			if(domElementId){
				element = document.getElementById(domElementId);
			}else if(domElementClass) {
				element = document.getElementByClass(domElementClass);
			}

			if (element) {
				element.addEventListener(event.type, event.operation);
				debug.add({type: "events", stringArray: "Dodaje event do " + (domElementId || domElementClass)});
			}
		}
	};

	constructor = (function(){
		_this.options = extend(defaultOptions, options);
		create(_this.options);
		if (_this.options.events) {
			debug.add({type: "events", stringArray: "Dodaje eventy do templatu: " + _this.newTemplate.name});
			attachEvent(_this.options.events);
		}
	} ());

	return _this.newTemplate;
};



// TWORZENIE

// POKAZ I UKRYJ

// PRELOADER

// EVENTY

// CALLBACKS

// POZYCJONOWANIE + CSS POZYCJE ITD

// TŁUMACZENIA



// API
return {
	new : "",
	data: "",
	loadTemplate: templateFactory,
	id: "",
	on: "",
	trigger: "",
	templates: templates
};

} () );