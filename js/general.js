var owfScenes = 5;
var viewportHeight = $(window).height();
var viewportWidth = $(window).width();
var skr = "";

/**
 * Init skroller
 * @return {[type]}
 */
function initSkrollr() {
	var body = $('body');

	if(window.innerWidth < 768) {
		if(skr) skr.destroy();
		body.addClass('mobile');

		return;
	}

	body.removeClass('mobile');

	var constantsData = {};

	for (i = 1; i <= owfScenes; i++) {
		constantsData["owf" + i] = Math.floor(viewportHeight * i);
	}

	skr = skrollr.init({
		forceHeight: false,
		constants: constantsData,
		smoothScrolling: true
	});
}

function initScenes(resize) {
	var pageInfo = $("#page-info");

	if (resize) {
		viewportHeight = pageInfo.height();
		viewportWidth = pageInfo.width();
		skr.destroy();
	}

	var _bodyHeight = Math.floor(viewportHeight * owfScenes);
	_bodyHeight += 650;
	$("body").css("height", _bodyHeight);

	//set start page height
	$("#page-start").css("height", viewportHeight + "px");

	//skrollr
	initSkrollr();
}

$(document).ready(function () {
	initScenes(false);
});

window.onresize = function () {
	if(!skr) initSkrollr();

	initScenes(true);
};