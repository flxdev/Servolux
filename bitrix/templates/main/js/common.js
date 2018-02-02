'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {

	if ($('#main-video').length) {
		$('#main-video').get(0).play();
	}

	if ($('#dates').length) {
		$('#dates-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
					infinite: false
				}
			}, {
				breakpoint: 750,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					infinite: false
				}
			}, {
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					infinite: false
				}
			}]
		});
	}

	if ($('#brand-products').length) {
		var $productsSlider = $('#brand-products-slider');
		$productsSlider.slick({
			arrows: true,
			dots: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 750,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
		var productsSliesLength = $productsSlider.find('.slick-dots li').length;
		$productsSlider.append('<div class="slick-sum-slides">/ ' + productsSliesLength + '</div>');
	}

	if ($('#news-inner-slider').length) {
		var $newsInnerSlider = $('#news-inner-slider');
		$newsInnerSlider.slick({
			arrows: true,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			focusOnSelect: false,
			accessibility: false
		});

		var _productsSliesLength = $newsInnerSlider.find('.slick-dots li').length;
		$newsInnerSlider.append('<div class="slick-sum-slides">/ ' + _productsSliesLength + '</div>');
	}

	if ($('.vertical-slider').length) {

		var $verticalSlider = $('.vertical-slider'),
		    maxHeight = $verticalSlider.height();
		$verticalSlider.find('.img-wrapper').height(maxHeight);

		$verticalSlider.slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			accessibility: false,
			vertical: true,
			verticalSwiping: true,
			responsive: true
		});
	}
};

function isMobile() {
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent)
	);
}

//TODO map middle lan and lng of pins to see them all
function initMap(mapArg, arrayOfPins, styleMap) {
	var manyMaps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	var autoFoundMarkers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	var element = mapArg,
	    zoomIn = parseFloat(element.getAttribute('data-zoom')),
	    latcord = parseFloat(element.getAttribute('data-lat')),
	    loncord = parseFloat(element.getAttribute('data-lon')),
	    imgpath = element.getAttribute('data-icon'),
	    centercords = { lat: latcord, lng: loncord };

	if (manyMaps) {
		latcord = arrayOfPins.lat;
		loncord = arrayOfPins.lng;
		centercords = { lat: latcord, lng: loncord };
	}

	var bounds = new google.maps.LatLngBounds();

	var map = new google.maps.Map(element, {
		zoom: zoomIn,
		center: centercords,
		fullscreenControl: true,
		scrollwheel: false,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: false,
		//	gestureHandling: 'greedy',
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: styleMap
	});

	var markerIcon = {
		url: '',
		scaledSize: new google.maps.Size(16, 26),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(8, 26)
	};

	var markerMaker = function markerMaker(obj) {

		var labelTemplate = '\n\t\t<div class="map-label-wrapper">\n\t\t\t\t<img src="' + imgpath + '"/>\n\t\t\t\t<p class="map-label-text">' + obj.name + '</p>\n\t\t</div>';

		return new MarkerWithLabel({
			position: new google.maps.LatLng(obj.lat, obj.lng),
			title: obj.title,
			map: map,
			icon: markerIcon,
			zIndex: 999999,
			labelContent: labelTemplate,
			labelAnchor: new google.maps.Point(0, 26),
			labelClass: "labels", // the CSS class for the label
			labelInBackground: false
		});
	};

	if (manyMaps) {
		var obj = arrayOfPins;
		var marker = markerMaker(obj);
	}

	if ($(element).hasClass('map-elem-near')) {
		(function () {
			// end loop

			var hidemarkers = function hidemarkers(array) {
				for (var _i2 = 0; _i2 < array.length; _i2++) {
					var cur = array[_i2];
					cur.set('labelClass', 'labels');
				}
			};

			var markers = [];

			for (var _i = 0; _i < arrayOfPins.length; _i++) {
				var _obj = arrayOfPins[_i];

				var _marker = markerMaker(_obj);

				_marker.fromTop = 0;

				bounds.extend(_marker.position);

				markers.push(_marker);

				google.maps.event.addListener(_marker, 'click', function () {
					hidemarkers(markers);
					this.set('labelClass', 'labels place_open');
					console.log('asd');
				});

				google.maps.event.addListener(map, 'click', function () {
					hidemarkers(markers);
				});
			}
		})();
	}
	if (autoFoundMarkers) {
		map.fitBounds(bounds);
	}
}

var styleMapBig = [{
	'featureType': 'all',
	'elementType': 'geometry',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'all',
	'elementType': 'geometry.fill',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'all',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text.fill',
	'stylers': [{ 'color': '#000000' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text.stroke',
	'stylers': [{ 'color': '#ffffff' }]
}, {
	'featureType': 'administrative',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'geometry.fill',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'on' }, { 'saturation': '-14' }, { 'weight': '1' }, { 'lightness': '67' }, { 'gamma': '1.41' }, { 'color': '#c7d7c7' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'labels.text',
	'stylers': [{ 'hue': '#ff0000' }, { 'visibility': 'off' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'all',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.locality',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.neighborhood',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.land_parcel',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'landscape',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-39' }, { 'lightness': '35' }, { 'gamma': '1.08' }]
}, {
	'featureType': 'landscape',
	'elementType': 'geometry',
	'stylers': [{ 'saturation': '0' }]
}, {
	'featureType': 'landscape',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '10' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-14' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'landscape.natural.landcover',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'poi',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '10' }, { 'gamma': '2.26' }]
}, {
	'featureType': 'poi',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'poi',
	'elementType': 'labels.text',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-3' }]
}, {
	'featureType': 'road',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '54' }]
}, {
	'featureType': 'road',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-7' }]
}, {
	'featureType': 'road.arterial',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }]
}, {
	'featureType': 'road.local',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-2' }]
}, {
	'featureType': 'transit',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }]
}, {
	'featureType': 'water',
	'elementType': 'geometry.fill',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '100' }]
}, {
	'featureType': 'water',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-100' }]
}];

var styleMapContacts = [{
	'featureType': 'all',
	'elementType': 'geometry',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'all',
	'elementType': 'geometry.fill',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'all',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text.fill',
	'stylers': [{ 'color': '#000000' }]
}, {
	'featureType': 'all',
	'elementType': 'labels.text.stroke',
	'stylers': [{ 'color': '#ffffff' }]
}, {
	'featureType': 'administrative',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'geometry.fill',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'on' }, { 'saturation': '-14' }, { 'weight': '1' }, { 'lightness': '67' }, { 'gamma': '1.41' }, { 'color': '#c7d7c7' }]
}, {
	'featureType': 'administrative.country',
	'elementType': 'labels.text',
	'stylers': [{ 'hue': '#ff0000' }, { 'visibility': 'off' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'all',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.province',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'administrative.locality',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'administrative.neighborhood',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'administrative.land_parcel',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'landscape',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-39' }, { 'lightness': '35' }, { 'gamma': '1.08' }]
}, {
	'featureType': 'landscape',
	'elementType': 'geometry',
	'stylers': [{ 'saturation': '0' }]
}, {
	'featureType': 'landscape',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '10' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-14' }]
}, {
	'featureType': 'landscape.man_made',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'landscape.natural.landcover',
	'elementType': 'labels.text',
	'stylers': [{ 'visibility': 'off' }]
}, {
	'featureType': 'poi',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '10' }, { 'gamma': '2.26' }]
}, {
	'featureType': 'poi',
	'elementType': 'labels',
	'stylers': [{ 'visibility': 'on' }]
}, {
	'featureType': 'poi',
	'elementType': 'labels.text',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-3' }]
}, {
	'featureType': 'road',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '54' }]
}, {
	'featureType': 'road',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-7' }]
}, {
	'featureType': 'road.arterial',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }]
}, {
	'featureType': 'road.local',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-2' }]
}, {
	'featureType': 'transit',
	'elementType': 'all',
	'stylers': [{ 'saturation': '-100' }]
}, {
	'featureType': 'water',
	'elementType': 'geometry.fill',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '100' }]
}, {
	'featureType': 'water',
	'elementType': 'geometry.stroke',
	'stylers': [{ 'saturation': '-100' }, { 'lightness': '-100' }]
}];

document.addEventListener('DOMContentLoaded', function () {

	var appObjects = {
		$maps: $('.map'),
		$map: $('#map'),
		$brandContacts: $('#brand-contacts')
	};

	if (appObjects.$map.length) {
		initMap(document.getElementById('map'), arrayOfPins, appObjects.$brandContacts.length ? styleMapContacts : styleMapBig, false, appObjects.$brandContacts.length);
	} else if (appObjects.$maps.length) {
		appObjects.$maps.filter(function (index) {
			initMap(this, arrayOfPins[index], styleMapContacts, true);
		});
	}

	var docWindow = $(window),
	    vHeight = docWindow.height(),
	    $headerMenuWrapper = $('#header-menu-wrapper'),
	    $headerModalWrapper = $('#header-modal-wrapper'),
	    videoWrapper = $('#main-first-screen-fading-wrapper'),
	    screenWrapperHeight = $('#main-screen-wrapper').height(),
	    burger = $('#header-burger'),
	    screenLinks = $('#main-screen .screen-links-wrapper'),
	    mainTitleWrapperInner = $('#title-wrapper-inner'),
	    mainScreenTitle = $('#main-screen-title'),
	    mobile = isMobile(),
	    asideMenu = $('#aside-menu').length ? true : false,
	    hasParallax = $('#parallax').length ? true : false,
	    topMenu = void 0,
	    menuItems = void 0,
	    scrollItems = void 0;

	// Video append if not mobile
	if (!isMobile() && videoWrapper.data('src')) {
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video class="firstScreenFading" id="main-video" muted loop><source src="' + videoWrapper.data('src') + '" type="video/mp4"></video></div></div>');
		//videoWrapper.find('.video-poster').remove()
	}

	$('.callback-button').on('click', function () {
		var buttonText = $(this).text();
		$('#modal-title').text(buttonText);
	});

	//burger-menu
	burger.on('click', function () {
		$headerMenuWrapper.toggleClass('active');
		$headerModalWrapper.toggleClass('active');
		$('html').toggleClass('menu-is-locked');
	});

	if ($('#modal').length) {
		var $modalContent = $('#modal-content'),
		    $brandProductsBlock = $('#brand-products-slider .products-slide'),
		    $modalContentImages = $('#modal-content-images');

		$brandProductsBlock.on('click', function () {
			var slideno = $(this).data('slick-index');
			$('#modal-content-images').slick('slickGoTo', slideno);
		});

		$brandProductsBlock.filter(function () {
			var clo = $(this).find('img');
			$modalContent.append('<div class="slick-slide products-slide"><div class="slide-img"><img src="' + clo.attr('src') + '"></div></div>');
			$modalContentImages.append('<div class="slick-slide modal-img-slide"><div class="modal-img-slide-inner"><img src="' + clo.data('img') + '" alt=""></div><p class="h2">' + clo.data('text') + '</p></div>');
		});

		var inst = $('#modal').remodal(),
		    $modal = $('#modal');

		$(document).on('opened', '.remodal', function (e) {

			if (inst.getState() == 'opened') {

				if (!$modal.hasClass('activated')) {

					$modal.addClass('activated');

					$modalContentImages.slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						fade: true,
						asNavFor: $modalContent
					});

					$modalContent.slick({
						arrows: true,
						dots: false,
						slidesToShow: 6,
						slidesToScroll: 6,
						infinite: true,
						asNavFor: $modalContentImages,
						focusOnSelect: true,
						centerMode: true,
						centerPadding: '60px',
						letiableWidth: true,
						responsive: [{
							breakpoint: 1024,
							settings: {
								slidesToShow: 6,
								slidesToScroll: 6
							}
						}, {
							breakpoint: 750,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4
							}
						}, {
							breakpoint: 540,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						}]
					});
				}
			}
		});
	}

	// Main screen "three list" events
	if ($('#main-screen .screen-link-text').length) {
		$('#main-screen .screen-link-text').on('mouseenter', function () {
			mainTitleWrapperInner.addClass('active');
		});
		$('#main-screen .screen-link-text').on('mouseleave', function () {
			mainTitleWrapperInner.removeClass('active');
		});
	}

	// Main screen fade out and video zoom out on scroll
	function scrollMainScreen(scrollPos) {

		var i = (110 - scrollPos / screenWrapperHeight * 30) / 100;
		videoWrapper.css('opacity', vHeight / scrollPos / 3).find('.firstScreenFading').css('transform', 'translate(-50%, -50%) scale(' + (i <= 1 ? 1 : i) + ')');
		if (scrollPos > 150 && !screenLinks.hasClass('hiddened')) {
			screenLinks.fadeOut().addClass('hiddened');
		} else if (scrollPos < 150 && screenLinks.hasClass('hiddened')) {
			screenLinks.fadeIn().removeClass('hiddened');
		}
	}

	// Main title fade out on scroll
	function scrollMainTitle(scrollPos) {
		mainScreenTitle.css('transform', 'translatey(' + Math.round(-scrollPos / 2) + 'px)');
	}

	var Parallax = function () {
		function Parallax(item) {
			var _this2 = this;

			_classCallCheck(this, Parallax);

			this.image = item;
			this.$image = $(this.image);
			this.parent = this.$image.parent();
			this.windowHeight = $(window).height();
			this.imageHeight = this.$image.height();
			this.imageStart = this.$image.offset().top;
			this.imageEnd = this.imageStart + this.$image.height();
			this.parentHeight = this.parent.height();
			this.parentStart = this.parent.offset().top;
			this.parentEnd = this.parentStart + this.parentHeight;
			this.safeScrollHeight = this.parentHeight - this.imageHeight;
			this.safePercentage = this.safeScrollHeight / (this.imageHeight / 100);
			$(window).on('scroll', function () {
				var scrollBottom = $(window).scrollTop() + _this2.windowHeight / 2;
				if (scrollBottom >= _this2.parentStart && scrollBottom <= _this2.parentEnd) {
					setTimeout(function () {
						_this2.scrollPosition(scrollBottom, _this2.$image);
					}, 1);
				}
			});
		}

		_createClass(Parallax, [{
			key: 'scrollPosition',
			value: function scrollPosition(scrollBottom, image) {
				image.css('transform', 'translateY(' + this.safeScrollHeight / 100 * (scrollBottom - this.parentStart) / (this.parentHeight / 100) + 'px) translateX(-50%)');
			}
		}]);

		return Parallax;
	}();

	if (hasParallax) {

		var p = new Parallax('.rellax');
	}

	// Scroll triggers
	docWindow.scroll(function (event) {
		var scrollPos = docWindow.scrollTop();
		if (scrollPos > screenWrapperHeight && !$('body').hasClass('menu-mobile')) {
			$headerMenuWrapper.addClass('sticked animated fadeInDownFast').css('animation-delay', '0');
			if (!mobile) {
				if (asideMenu) {
					changeAsideMenu();
				}
			}
			return;
		} else if (scrollPos < 0) {
			return;
		}
		if (!mobile) {
			scrollMainScreen(scrollPos);
			scrollMainTitle(scrollPos);
		}
		$headerMenuWrapper.removeClass('sticked animated fadeInDownFast');
	});

	// InView checker
	if ($(window).width() >= 992) {
		inView.offset(50);
		inView('.animateThis').on('enter', function (el) {
			$(el).addClass('animated ' + $(el).data('anim'));
		});
	}

	// Chart bar width maker
	$('#index-chart .chart-bar').filter(function () {
		$(this).css('width', $(this).data('scale') + '%');
	});

	// Brands appender and changer
	if ($('#brands').length) {
		var elemsInView = [],
		    isPaused = false,
		    $brands = $('#brands'),
		    $brandsBlocks = $('#brands .brand-anim-block');

		$brandsBlocks.filter(function () {
			var _this = $(this),
			    rand = Math.floor(Math.random() * (15000 - 8000)) + 8000,
			    brandCounter = 0,
			    elem = void 0;
			// Brand appender
			if (brandCounter < $brandsBlocks.length + 1) {
				// Random element
				elem = Math.floor(Math.random() * brandElems.brands.length);
				// Random while element exist
				while (elemsInView[elem]) {
					elem = Math.floor(Math.random() * brandElems.brands.length);
				}
				// Write element in array
				elemsInView[elem] = true;
				// Append brand
				_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>');
				brandCounter++;
			}

			// Brands changer
			if (!mobile) {
				setInterval(function () {
					// Skip changing when mouse enter
					if (!isPaused) {
						// Random while elem exist
						while (elemsInView[elem]) {
							elem = Math.floor(Math.random() * brandElems.brands.length);
						}

						// Append new brand
						_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>');
						// Animating new appended brand
						_this.children('a:nth-of-type(2)').addClass('animated slideBrand');
						// Animate Out old Brand
						_this.children('a:first-of-type').addClass('animated slideBrandOut');
						// Write new brand
						elemsInView[elem] = true;
						// Removing old brand after 1 sec
						setTimeout(function () {
							// Search and destroy old brand
							for (var key in brandElems.brands) {
								if (brandElems.brands[key].src == _this.children('a:first-of-type').children('img').attr('src')) {
									elemsInView[key] = false;
								}
							}

							// Remove animation from new brand
							_this.children('a').removeClass('animated slideBrand');
							// Destroy old brand
							_this.children('a:first-of-type').remove();
						}, 1000);
					}
				}, rand);
			}
		});
		$brands.on('mouseenter', function () {
			isPaused = true;
		});
		$brands.on('mouseleave', function () {
			isPaused = false;
		});
	}

	// Scheme rotator and activator
	if ($('#scheme').length) {
		var ell = 1,
		    $schemeButton = $('#scheme .scheme-button'),
		    $schemeSlides = $('#scheme-slider .scheme-slider__slide'),
		    currentSlide = 1,
		    currentDeg = 0,
		    slideDeg = 45;

		$schemeButton.on('click', function () {
			var _self = $(this);

			if (!_self.hasClass('active')) {

				// Removing all active classes on buttons
				$schemeButton.filter(function () {
					$(this).removeClass('active');
				});

				// Add active class to pressed button
				_self.addClass('active').siblings().removeClass('active');

				// Get pressed slide number
				ell = _self.data('slide');

				if (ell > currentSlide) {
					currentDeg += slideDeg * (ell - currentSlide);
					$('#scheme-menu').css('transform', 'rotate(-' + currentDeg + 'deg)');
					$('#scheme-menu .icon').css('transform', 'rotate(' + currentDeg + 'deg)');
					currentSlide = ell;
				} else if (ell < currentSlide) {
					currentDeg += slideDeg * (8 + ell - currentSlide);
					$('#scheme-menu').css('transform', 'rotate(-' + currentDeg + 'deg)');
					$('#scheme-menu .icon').css('transform', 'rotate(' + currentDeg + 'deg)');
					currentSlide = ell;
				}

				var slide = $schemeSlides.eq(ell - 1);
				slide.addClass('active').siblings().removeClass('active');
			}
		});

		// Scheme update button trigger
		$('#update-scheme-slider').on('click', function () {
			ell >= 8 ? ell = 1 : ell++;
			$schemeButton.eq(ell - 1).trigger('click');
		});
	}

	if (asideMenu) {
		$('.aside-menu-item').filter(function () {
			var _asideItem = $(this),
			    itemId = _asideItem.attr('id');
			$('#aside-menu .aside-menu-wrapper').append('<a href="#' + itemId + '"><div class="aside-item-inner"><p>' + _asideItem.data('aside') + '</p></div></a>');
		});

		topMenu = $('#aside-menu .aside-menu-wrapper');
		menuItems = topMenu.find('a');
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr('href'));
			if (item.length) {
				return item;
			}
		});

		$('#aside-menu').stick_in_parent();
		animateAsideMenu();
	}

	if ($('.sticky-block').length && $(window).width() > 992) {

		var $stickyBlock = $('.sticky-block');

		$stickyBlock.filter(function () {

			var stickyBlockOffsetTop = $(this).data('offsettop');
			$(this).stick_in_parent({ offset_top: stickyBlockOffsetTop });
		});
	}

	function animateAsideMenu() {

		$('#aside-menu').find('a').on('click', function (el) {
			el.preventDefault();
			var _asideHref = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(_asideHref).offset().top - 80
			}, 1000);
		});
	}

	function changeAsideMenu() {
		var fromTop = docWindow.scrollTop() + 120,
		    cur = scrollItems.map(function (el) {
				if (scrollItems[el].offset().top < fromTop) return scrollItems[el];
			});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		menuItems.siblings().removeClass('active').filter('[href=\'#' + id + '\']').addClass('active');
	}

	if ($('#partners-slider-wrapper').length) {
		var $partnersSliderWrapper = $('#partners-slider-wrapper');
		$partnersSliderWrapper.slick({
			arrows: true,
			dots: true,
			slidesToShow: 6,
			slidesToScroll: 6,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}, {
				breakpoint: 750,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});

		var partnersSlidesLength = $partnersSliderWrapper.find('.slick-dots li').length;
		$partnersSliderWrapper.append('<div class="slick-sum-slides">/ ' + partnersSlidesLength + '</div>');
	}

	if (!window.Promise) {
		window.Promise = Promise;
	}

	function lazyImage() {
		console.log('lazyImage init');
		var arr = document.querySelectorAll('.js-image');
		var images = [];
		for (var _i3 = 0; _i3 < arr.length; _i3++) {
			images.push(arr[_i3]);
		}
		var config = {
			rootMargin: '0px 0px',
			threshold: 0.01
		};

		var imageCount = images.length;
		var observer = void 0;
		if (!('IntersectionObserver' in window)) {
			for (var _i4 = 0; _i4 < imageCount; _i4++) {
				preloadImage(images[_i4]);
			}
		} else {
			observer = new IntersectionObserver(onIntersection, config);
			for (var _i5 = 0; _i5 < imageCount; _i5++) {
				if (images[_i5].classList.contains('js-image-handled')) {
					return;
				}
				observer.observe(images[_i5]);
			}
		}

		function fetchImage(url) {
			return new Promise(function (resolve, reject) {
				var image = new Image();
				image.src = url;
				image.onload = resolve;
				image.onerror = reject;
			});
		}

		function preloadImage(image) {
			var src = image.dataset.src;
			if (!src) {
				return;
			}
			return fetchImage(src).then(function () {
				applyImage(image, src);
			});
		}

		function loadImagesImmediately(images) {
			for (var _i6 = 0; _i6 < images.length; _i6++) {
				return preloadImage(images[_i6]);
			}
		}

		function disconnect() {
			if (!observer) {
				return;
			}
			observer.disconnect();
		}

		function onIntersection(entries) {
			if (imageCount === 0) {
				observer.disconnect();
			}
			entries.forEach(function (entry) {
				if (entry.intersectionRatio > 0) {
					imageCount--;
					observer.unobserve(entry.target);
					preloadImage(entry.target);
				}
			});
		}

		function applyImage(img, src) {
			img.classList.add('js-image-handled');
			if (img.classList.contains('bg')) {
				img.style.backgroundImage = 'url(' + src + ')';
			} else {
				img.src = src;
			}
			img.classList.add('fade-in');
		}
	}

	if ($('#standard-toggle').length) {
		$('#standard-toggle').find('.button').each(function () {
			$(this).on('click', function () {
				$(this).addClass('active').siblings().removeClass('active');
				var toggleItem = $(this).data('item');
				$('#toggleItems').find('.toggle-item').eq(toggleItem).addClass('active').siblings().removeClass('active');
			});
		});
	}

	if ($('#contacts').length) {
		var controllButtons = $('#chart-control .button'),
		    contactBlocks = $('#blocks-wrapper .contacts-toggle-blocks'),
		    $countryAsideMenyHrefs = $('.country-aside-menu .href');

		controllButtons.on('click', function () {
			var contBlock = $(this).data('block');
			$(this).addClass('active').siblings().removeClass('active');
			$(contactBlocks[contBlock]).addClass('active').siblings().removeClass('active');
		});

		$countryAsideMenyHrefs.on('click', function () {
			var contCountries = $(this).data('countries'),
			    contBlock = $(this).data('block');

			$(this).addClass('active').siblings().removeClass('active');
			$('#countryBlock' + contBlock + ' .country-block:nth-of-type(' + contCountries + ')').addClass('active').siblings().removeClass('active');
		});
	}
	if ($('#jobs-content-wrapper').length) {
		$('.jobs-tags-title-wrapper').on('click', function () {
			$(this).toggleClass('deactive');
			$(this).next().toggleClass('deactive');
		});
	}

	if ($('.formFocus').length) {
		$('.formFocus').filter(function () {
			var _this = $(this);
			_this.find('label').filter(function () {
				$(this).on('focusout', function () {
					$(this).removeClass('focusing');
					if (!$(this).find('input').val() && !$(this).find('textarea').val()) {
						$(this).removeClass('active');
					}
				});
				$(this).on('focusin', function () {
					$(this).addClass('focusing');
					if (!$(this).hasClass('active')) {
						$(this).addClass('active');
					}
				});
			});
		});
	}

	//TODO new form verify and drop

	var FormFocus = function () {
		function FormFocus(elem) {
			var _this3 = this;

			_classCallCheck(this, FormFocus);

			this.elem = $(elem);
			$.validate({
				form: $(elem),
				modules: 'html5, security, file',
				lang: 'ru',
				addValidClassOnAll: true,
				validateOnBlur: true, // disable validation when input looses focus
				errorMessagePosition: 'bottom',
				scrollToTopOnError: false,
				onSuccess: function onSuccess($form) {
					$.ajax({
						type: 'POST',
						data: $form.serialize(),
						success: function success(data) {
							var modalSuccess = $('#callbackSuccess').remodal();
							modalSuccess.open();
						}
					});
					return false; // Will stop the submission of the form
				}
			});

			this.elem.find('button[type=submit]').on('click', function (el) {
				el.preventDefault();
				_this3.elem.submit();
				return false;
			});

			this.elem.dropzone({
				url: '/',
				paramName: 'file',
				maxFilesize: 10,
				uploadMultiple: true,
				previewsContainer: this.elem.find('.files-input')[0],
				createImageThumbnails: false,
				addRemoveLinks: true,
				dictDefaultMessage: 'Прикрепить резюме',
				dictFileTooBig: 'Файл слишком большой',
				dictResponseError: 'Сервер ответил с ошибкой',
				dictInvalidFileType: 'Неверный тип файла',
				acceptedFiles: '.doc,.docx,.pdf,.txt,image/*',
				init: function init() {
					this.on('removedfile', function (file) {
						$.ajax({
							type: 'POST',
							url: '/',
							data: 'del=' + file['name'] + '&action=FILE',
							dataType: 'html'
						});
					});
					this.on('resetFiles', function () {
						if (this.files.length !== 0) {
							for (i = 0; i < this.files.length; i++) {
								this.files[i].previewElement.remove();
							}
							this.files.length = 0;
						}
					});
				},
				sending: function sending(file, xhr, formData) {
					formData.append('action', 'FILE');
				}
			});
		}

		//remove all files from drop zone


		_createClass(FormFocus, [{
			key: 'clearDropzone',
			value: function clearDropzone() {
				Dropzone.forElement($(this.elem)[0]).removeAllFiles();
			}
		}]);

		return FormFocus;
	}();

	if ($('.formFocus').length) {
		var formsFocusArr = [];
		$('.formFocus').filter(function () {
			formsFocusArr.push(new FormFocus(this));
		});
	}

	//TODO clear hash om modal close
	$(document).on('closed', function () {
		var scrollV = void 0,
		    scrollH = void 0,
		    loc = window.location;
		if ('pushState' in history) history.pushState('', document.title, loc.pathname + loc.search);else {
			// Prevent scrolling by storing the page's current scroll offset
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;

			loc.hash = '';

			// Restore the scroll offset, should be flicker free
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
	});

	window.scrollTo = function (x, y) {
		return true;
	};
});