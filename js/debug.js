// DEBUG - funkcja pomocnicza
boldDebug = (function (msg) {

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