var events = [],
event = {
	id: "testButton",
	type: "click",
	operation: function(){ alert("Alert numero uno"); }
};
event2 = {
	id: "drugiKlikacz",
	type: "click",
	operation: function(){ alert("Alert numero secundo"); }
};

events.push(event);
events.push(event2);

var temp = boldTemplate.loadTemplate({ id: "basicTemplate", name: "Basic Template", data : {mainText: "test tekstu", buttonId: "testButton", buttonIdDwa: "drugiKlikacz"}, events: events });
var pop = boldPopup.create({
    'id':'ed',
    'prependTo': 'body',
    'html': temp.getHTML()
});
var pop2 = boldPopup.create({
    'id':'ed2',
    'prependTo': 'body',
    'html': temp.getHTML()
});
boldDebug.show();
document.querySelector("#dd").onclick = function(){
    var preloader = boldPopup.preloader({
    'preloaderId':'ed',
    'queueId': 'ddd',
    'addTo': this,
    'css': {
    	'position': 'absolute'
    }
	}).show();
}