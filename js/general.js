var owfScenes = 5;
var viewportHeight = $(window).height();
var viewportWidth = $(window).width();
var skr = ""; //skrrollr instance

/**
 * Init skroller
 * @return {[type]}
 */
function initSkrollr() {
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
	if (resize) {
		viewportHeight = $("#page-bands").height();
		viewportWidth = $("#page-bands").width();
		skr.destroy();
	}

	//height of page depends on nr of sections
	var _bodyHeight = Math.floor(viewportHeight * owfScenes) + "px";
	$("body").css("height", _bodyHeight);

	//set start page height
	$("#page-start").css("height", viewportHeight + "px");

	//set video height
	//if(viewportHeight < viewportWidth)
	//{
	//	$(".aftermovie").css("height", viewportHeight + "px");
	//} else {
	//	$(".aftermovie").css("width", viewportWidth + "px");
	//}

	//snow scene animation
	var h = $("#page-bands").height();

	//skrollr
	initSkrollr();
}

$(document).ready(function () {
	initScenes(false);
});

window.onresize = function () {
	initScenes(true);
};