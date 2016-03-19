window.boldPopup = ( function (mainOptions) {

var templates = {},
	extend,
	debug,
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
		debug.add({type: "TEMPLATES", stringArray: "Bindowanie danych do szablonu: " + this.newTemplate.name});
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
				debug.add({type: "events", stringArray: "Dodaje event do " + (domElementId || domElementClass)});
			}
		}
	},
	constructor = (function(){
		this.options = extend(defaultOptions, options);
		create(this.options);
		appendToBody();
		if (this.options.events) {
			debug.add({type: "events", stringArray: "Dodaje eventy do templatu: " + this.newTemplate.name});
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

// CLEAR JS EXTEND FUNCTION
extend = function () {

    // Variables
    var extended = {},
    	deep = false;
    	i = 0;
    	length = arguments.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
        deep = arguments[0];
        i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
        for ( var prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                // If deep merge and property is an object, merge properties
                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    extended[prop] = extend( true, extended[prop], obj[prop] );
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;

};

// DEBUG - funkcja pomocnicza
debug = (function (msg) {

	var instance = this,
	notices = {},
	add,
	get,
	show,
	print,
	ln = 0,
	i = 0;

	add = function(msg) {
		if (typeof msg === 'object' && msg.type && msg.stringArray) {
			if (notices[msg.type]) {
				notices[msg.type].push(msg.stringArray);
			}else{
				notices[msg.type] = [msg.stringArray];
			}
		}else if (typeof msg === 'string') {
			if(notices.messages){
				ln = notices.messages.length;
			}else{
				notices.messages = [];
			}
			notices.messages[ln] = msg;

		}else {
			notices.messages = "HELLO WORLD";
		}
	};

	addError = function(msg){
		return add({type: "error", stringArray: msg});
	};

	show = function () {
		print("---------------------- !!! ----------------------");
		for(var noticeName in notices) {
			if(!notices.hasOwnProperty(noticeName)) continue;
			print("**** " + noticeName + " ****");
			noticeArray = notices[noticeName];

			ln = noticeArray.length;
			i = 0;
			
			for (i; i<ln; i = i + 1) {
				print("[" + parseInt((i + 1),10) + "]: " + noticeArray[i]);
			}
		}
		print("---------------------- !!! ----------------------");
	};

	print = (function Print(msg){
		console.log(msg);
		return Print;
	}("DEBUGOWANIE WŁĄCZONE"));

	return {
		notices: notices,
		show: show,
		add: add,
		addError: addError,
		get: get
	};
	
}());

// API
return {
	new : "",
	data: "",
	loadTemplate: templateFactory,
	id: "",
	on: "",
	trigger: "",
	debug : debug,
	templates: templates
};

} () );