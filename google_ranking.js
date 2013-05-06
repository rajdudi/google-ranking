var page = require('webpage').create();
var system = require('system');

var searchForLink = new RegExp(system.args[2]);
var searchForString = system.args[1];

var pageNo = 0;
var linkNo = 0;
var endSignal = /Found/;

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.open("http://google.com/search?q="+searchForString, function(status) {
	if(status == "success") {
		var interval = setInterval(function() {
			var returnValue;
			console.log("Opening page number "+pageNo);
			
			returnValue = page.evaluate(function(searchForLink) {
					var links = document.querySelectorAll('h3.r a');
					for(var k=0;k<links.length;k++) {
						if(searchForLink.test(links[k].getAttribute("href"))) {
							return k+"FoundEnd";
						}
					}
					var tda = document.querySelectorAll('td a');
					for(var i=0;i<tda.length;i++) {
						if(tda[i].innerText == "Next\n") {
							console.log("Not found. Going to "+tda[i].innerText);
							var evObj = document.createEvent('Events');
							evObj.initEvent('click', true, false);
							tda[i].dispatchEvent(evObj);
							return "End"+links.length;
						}
					}
			}, searchForLink);

			setTimeout(function() {
				pageNo++;
				if(returnValue == null) {
					page.render("google.png");
					console.log('Seems we reached at the end of result page but the webpage was not found');
					phantom.exit();
				} else if(endSignal.test(returnValue)) {
					page.render("google.png");
					linkNo = linkNo + parseInt(returnValue.replace('FoundEnd',''))+1;
					console.log('Found on page '+pageNo);
					console.log("This exists on the link number as "+linkNo);
					phantom.exit();
				} else {
					linkNo = linkNo + parseInt(returnValue.replace('End',''))+1;
				}
			}, 3000);
		},7000);
		
		

		setTimeout(function() {
			page.render("google.png");
			console.log('Not found until page '+pageNo);
                        console.log("Checked the links upto "+linkNo);
			phantom.exit();			
		}, 600000);
	} else {
		console.log("Error in opening page");
		phantom.exit();
	}
});
