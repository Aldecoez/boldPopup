var boldPopup = (function(){
    var instance = this,
        extend = boldExtend,
        popups ={},
        preloaders =[],

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
    getPreloader = function(id){
        return preloaders[id];
    },
    getPopup = function(idx){
        return popups(name);
    },
    getPopupIndex = function(name){
        return popups.indexOf(name);
    },
    createPreloader = function(){
        var preloader = new Preloader();

        return preloader;
    };
    var Preload = function(showOn){
        var showOn= showOn,
        popupId = showOn + '-popup',
        popupClass = 'boldPreloader',
        show = function(){

        }
        remove = function(){
            document.getElementById(popupId).remove();
        } 
        
        if(getPopupIndex(id) == -1){
        
        }

        return {
            show: show,
            remove: remove
        }
    };

    var Popup = function (opt) {
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
        preloader: createPreloader,
        get: getPopup,
        listPopups: popups
    };

} ());