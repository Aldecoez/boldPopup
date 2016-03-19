window.boldPopup = ( function (mainOptions) {

var templates = {},
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
	templates[this.id] = this;
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
	generateTemplateId = function () {
		var templateCount = 0,
			template;
		for (template in templates) {
			if ((!templates.hasOwnProperty(template))){
				continue;
			}
			templateCount = templateCount + 1;
		}
		return templateCount;
	},
	create = function (options) {
		this.newTemplate = new Template(options);
		this.newTemplate.setParam("id", generateTemplateId());
		loadSource(options);
	},
	loadSource = function (options) {
		var source;
		if (this.options.source === "DOM") {
			source = document.getElementById(options.id).innerHTML;
		}
		this.newTemplate.setParam("source", source);
		if (this.options.autoBind) {
			bindData();
		}
	},
	bindData = function (data) {
		var dataToBind = data || this.options.data,
			template = Handlebars.compile(this.newTemplate.source),
			html = template(dataToBind);
			
		this.newTemplate.setParam("html", html);
		boldDebug.add({type: "TEMPLATES", stringArray: "Bindowanie danych do szablonu: " + this.newTemplate.name});
	},
	appendToBody = function(){
		document.body.innerHTML += this.newTemplate.html;
	},
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
				boldDebug.add({type: "events", stringArray: "Dodaje event do " + (domElementId || domElementClass)});
			}
		}
	},
	constructor = (function(){
		this.options = extend(defaultOptions, options);
		create(this.options);
		appendToBody();
		if (this.options.events) {
			boldDebug.add({type: "events", stringArray: "Dodaje eventy do templatu: " + this.newTemplate.name});
			attachEvent(this.options.events);
		}
	}());

	return this.newTemplate;
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