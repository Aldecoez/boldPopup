var boldPopup = (function(){
    var instance = this,
        extend = boldExtend,
        popups ={},

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

    getPopup = function(name){
        return popups[name];
    };

    var Popup = (function () {
    	var _that = this;
        this.options ={};
        this.defaultOptions ={
                'id': 'defaultPopup',
                'appendTo': 'body',
                'html':''
            };
        this.init = function(opt){
        	this.options = extend(this.defaultOptions, opt);
            if(this.options.prependTo) {
                delete this.options.appendTo;  
            }

            if(this.options.isAjax){
                
            }
        };
      	this.setOption = function(optionName, value) {
            options[optionName] = value;
        };
        this.getOption = function(optionName) {
            return options[optionName];
        };
        this.createNodeFromHTML = function(html) {
            var myElement = document.createElement('div');
            myElement.setAttribute("id", getOption('id'));
            myElement.innerHTML = html;
        
            return myElement;
        };
        this.addByMethod = function(method) {
            var _this = this,
            nodeElement = this.createNodeFromHTML(this.getOption('html'));
            switch(method){
                case 'appendTo':
                    document.querySelector(getOption('appendTo')).appendChild(nodeElement);
                    break;  
                case 'prependTo':
                    var elementToPrepend = document.querySelector(getOption('prependTo'));
                    elementToPrepend.insertBefore(nodeElement,elementToPrepend.childNodes[0]);
                    break;      
            }
            this.setOption('added', true);
        };
        this.Popup = function (options){
    		_that.init(options);
        };

        this.Popup.prototype.show = function() {
            var _this= this,
                // Jezeli nie prepend to na pewno append
                method = (getOption('prependTo'))? 'prependTo' : 'appendTo';
                if(!getOption('added'))
                    addByMethod(method);
                else
                    document.getElementById(getOption('id')).style.display = ''

        };

        this.Popup.prototype.hide = function() {
            var _this= this;
            if (getOption('added')) {
                    document.getElementById(getOption('id')).style.display = 'none';
            }
        };
        
        this.Popup.prototype.remove = function() {
            var _this= this;
            if (getOption('added')) {
                    document.getElementById(getOption('id')).remove();
                    setOption('added', false);
            }
        };
        this.Popup.prototype.listOption = function() {
            return _that.options;
        };

        return this.Popup;
    }());

    return {
        create: popupFactory,
        createByAjax: createByAjax,
        get: getPopup,
        listPopups: popups
    };

} ());