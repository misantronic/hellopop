var viewportHeight = 0;
var viewportWidth = 0;
var skr;

function initScenes() {
	var pages = $('.page');
	var body = $('body');
	var bodyHeight = 0;

	if(skr) skr.destroy();

	viewportHeight = innerHeight;
	viewportWidth = innerWidth;

	pages.each(function() {
		bodyHeight += Math.max(viewportHeight, $(this).children('.container').height());
	});

	body.css("height", bodyHeight);

	//set start page height
	$("#page-start").css("height", viewportHeight + "px");

	if (window.innerWidth < 768) {
		if (skr) skr.destroy();
		body.addClass('mobile');

		return;
	}

	body.removeClass('mobile');

	//
	var constantsData = {};
	var curHeight = 0;
	var curP = 0;

	for (i = 1; i <= pages.length; i++) {
		var page = $('.page:eq(' + (i - 1) + ')');
		var height = Math.max(page.children('.container').height(), viewportHeight);
		var pHeight = Math.round(height / viewportHeight * 100);

		page.attr('data-_section' + (i - 1), 'height:' + pHeight + '%');

		if (pHeight > 100) {
			var pStart = curP;
			var pEnd = pStart + pHeight;

			page.children('.container')
				.attr('data-' + pStart + 'p', 'transform:translate(0, 0%);')
				.attr('data-' + pEnd + 'p', 'transform:translate(0, -100%);')
		}

		curHeight += height;
		curP += pHeight;

		constantsData["section" + i] = curHeight;
	}

	skr = skrollr.init({
		forceHeight: false,
		constants: constantsData,
		smoothScrolling: true,
		keyframe: function(element) {
			location.hash = $(element).attr('id');
		}
	});
}

$(document).ready(initScenes);

window.onresize = initScenes;