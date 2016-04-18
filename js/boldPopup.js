var boldPopup = (function(){
    var instance = this,
        extend = boldExtend,
        popups ={},
        preloaders = {},
        preloaderCounter = 0,

    popupFactory = function (options) {
        var newTemplate = new Popup(options);

        popups[options.id] = newTemplate;

        return newTemplate;
    },
    createByAjax = function (opt) {
        var options = opt,
            newTemplate = new Popup(options);
        options.isAjax = true;

        popups[options.id] = newTemplate;

        return newTemplate;
    },
    getPopup = function(idx){
        return popups(name);
    },
    getPopupIndex = function(name){
        return popups.indexOf(name);
    },
    getPreloader = function (id) {
        if (typeof id !== "undefined") {
            return preloaders[id];
        }
        return preloaders;
    },
    removePreloader = function (index) {
        var item,
            id = index;
        if (!index) {
            id = 'globalPreloader';
        }
        for (item in preloaders[id]) {
            if (!preloaders[id].hasOwnProperty(item)) {
                continue;
            }
            preloaders[id][item].remove();
        }
    },
    chooseIndexVaraible = function (options) {
        var indexVariable;
        if (options.queueId) {
            indexVariable = options.queueId;
        } else if (options.preloaderId) {
            indexVariable = options.preloaderId;
        } else {
            indexVariable = 'globalPreloader';
        }
        return indexVariable;
    },
    queuePreloader = function (options, preloader) {
        var item,
            indexVariable = chooseIndexVaraible(options);
        preloaderCounter += 1;
        if (!preloaders[indexVariable]) {
            preloaders[indexVariable] = {};
        }
        for (item in preloaders[indexVariable]) {
            if (!preloaders[indexVariable].hasOwnProperty(item)) {
                continue;
            }
            if (preloaders[indexVariable][item].addedTo === options.addTo) {
                return preloaders[indexVariable][item];
            }
        }
        preloaders[indexVariable]['preloaderId-' + preloaderCounter] = preloader;
        return preloader;
    },
    createNewPreloader = function (options) {
        var newPL = new newPreloader(options);
        return queuePreloader(options, newPL);
    },
	    newPreloader = function (opt) {
	        var defaultOptions = {
	                customclass: '',
	                queueId: '',
	                preloaderId: '',
	                addTo: 'body',
	                css: {}
	            },
	            added = false,
	            options = {},
	            counterStateWhenMade = preloaderCounter,
	            preloaderNode,
	            createPreloader = function () {
	                preloaderNode = jQuery(document.createElement('div'))
	                    .attr('id', 'preloaderId-' + counterStateWhenMade)
	                    .addClass('preloader-wrapper-layer ' + options.class)
	                    .css(options.css)
	                    .append(jQuery(document.createElement('div')).addClass('preloader-image'));
	                return preloaderNode;
	            },
	            show = function () {
	                if (!added && !jQuery(options.addTo).find('.preloader-wrapper-layer').length) {
	                    jQuery(options.addTo).append(createPreloader());
	                    added = true;
	                }
	                else {
	                    jQuery(preloaderNode).show();
	                }
	            },
	            hide = function () {
	                if (added) {
	                    jQuery(preloaderNode).hide();
	                }
	            },
	            remove = function () {
	                var indexVariable = chooseIndexVaraible(options);
	                if (added) {
	                    hide();
	                    jQuery(options.addTo).find(preloaderNode.attr('id')).remove();
	                    added = false;
	                }
	                delete preloaders[indexVariable]['preloaderId-' + counterStateWhenMade];
	            };
	        options = jQuery.extend(defaultOptions, opt);
	        return {
	            show: show,
	            hide: hide,
	            remove: remove,
	            addedTo: options.addTo
	        }
	    },
        Popup = function (opt) {
    	this.options ={};
        this.defaultOptions ={
            'id': 'defaultPopup',
            'appendTo': 'body',
            'html':''
        };
        var _that = this,
        init = function(opt){
        	_that.options = extend(_that.defaultOptions, opt);

            if(_that.options.prependTo) {
                delete _that.options.appendTo;  
            }

            if(_that.options.isAjax){
                
            }
        },
      	setOption = function(optionName, value) {
            _that.options[optionName] = value; 
        },
        getOption = function(optionName) {
            return _that.options[optionName];
        },
        createNodeFromHTML = function(html) {
            var myElement = document.createElement('div');
            myElement.setAttribute("id", getOption('id'));
            myElement.innerHTML = html;
        
            return myElement;
        },
        addByMethod = function(method) {
            var _this = this,
            nodeElement = createNodeFromHTML(getOption('html'));
            switch(method){
                case 'appendTo':
                    document.querySelector(getOption('appendTo')).appendChild(nodeElement);
                    break;  
                case 'prependTo':
                    var elementToPrepend = document.querySelector(getOption('prependTo'));
                    elementToPrepend.insertBefore(nodeElement,elementToPrepend.childNodes[0]);
                    break;      
            }
            setOption('added', true);
        },
        Popup = function (options){
    		init(options);
        };
        Popup.prototype.show = function() {
            var _this= this,
                // Jezeli nie prepend to na pewno append
                method = (getOption('prependTo'))? 'prependTo' : 'appendTo';
                if(!getOption('added'))
                    addByMethod(method);
                else
                    document.getElementById(getOption('id')).style.display = ''

        };

        Popup.prototype.hide = function() {
            var _this= this;
            if (getOption('added')) {
                    document.getElementById(getOption('id')).style.display = 'none';
            }
        };
        
        Popup.prototype.remove = function() {
            var _this= this;
            if (getOption('added')) {
                    document.getElementById(getOption('id')).remove();
                    setOption('added', false);
            }
        };
        return new Popup(opt);
    };

    return {
        create: popupFactory,
        createByAjax: createByAjax,
        preloader: createNewPreloader,
        get: getPopup,
        listPopups: popups
    };

} ());