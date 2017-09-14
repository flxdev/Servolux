'use strict';

window.onload = function () {
	if ($('#main-video').length) {
		$('#main-video').get(0).play();
	}
};

function isMobile() {
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent)
	);
}

function initMap(mapArg, arrayOfPins) {
	var $trel = $(mapArg),
		element = document.getElementById('map'),
		zoomIn = parseFloat(element.getAttribute('data-zoom')),
		latcord = parseFloat(element.getAttribute('data-lat')),
		loncord = parseFloat(element.getAttribute('data-lon')),
		imgpath = element.getAttribute('data-icon'),
		centercords = { lat: latcord, lng: loncord },
		map = new google.maps.Map(element, {
			zoom: zoomIn,
			minZoom: zoomIn,
			center: centercords,
			fullscreenControl: true,
			scrollwheel: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			gestureHandling: 'greedy',
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [{
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
			}]
		});
	var img = {
		url: imgpath,
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(35, 56),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(8.8, 28),
		scaledSize: new google.maps.Size(17.5, 28)
	};
	var mainmarkermarker = new google.maps.Marker({
		position: centercords,
		map: map,
		icon: img,
		zIndex: 99999
	});
	if ($trel.hasClass('map-elem-near')) {
		var onMarkerLoad = function onMarkerLoad(json) {
			var markerarr = [];
			mainmarkermarker.setMap(null);
			for (var i = 0; i < json.length; i++) {
				// Current object
				var obj = json[i];
				var imgType = {
					url: imgpath,
					// This marker is 20 pixels wide by 32 pixels high.
					size: new google.maps.Size(17.5, 28),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(8.8, 28),
					scaledSize: new google.maps.Size(17.5, 28)
					// Adding a new marker for the object
				};var pos = new google.maps.LatLng(obj.lat, obj.lng);
				markerarr.push(pos);
				var marker = new MarkerWithLabel({
					position: new google.maps.LatLng(obj.lat, obj.lng),
					title: obj.title,
					map: map,
					icon: imgType,
					zIndex: 999999,
					labelContent: '<div id="content"><div class="siteNotice"><div class="u-text lt">' + obj.name + '</div></div></div>',
					labelAnchor: new google.maps.Point(0, 0),
					labelClass: 'labels'
				});
				markers.push(marker);
				google.maps.event.addListener(marker, 'click', function (e) {
					hidemarkers(markers);
					this.set('labelClass', 'labels place_open');
				});
			} // end loop
			google.maps.event.addListener(map, 'click', function (e) {
				if (!$(e.target).hasClass('labels')) {
					hidemarkers(markers);
				}
			});
		};

		var hidemarkers = function hidemarkers(array) {
			for (var i = 0; i < array.length; i++) {
				var cur = array[i];
				cur.set('labelClass', 'labels');
			}
		};

		var panTo = function panTo(newLat, newLng) {
			if (panPath.length > 0) {
				panQueue.push([newLat, newLng]);
			} else {
				// Lets compute the points we'll use
				panPath.push('LAZY SYNCRONIZED LOCK');
				var curLat = map.getCenter().lat();
				var curLng = map.getCenter().lng();
				var dLat = (newLat - curLat) / STEPS;
				var dLng = (newLng - curLng) / STEPS;
				for (var i = 0; i < STEPS; i++) {
					panPath.push([curLat + dLat * i, curLng + dLng * i]);
				}
				panPath.push([newLat, newLng]);
				panPath.shift();
				setTimeout(doPan, 10);
			}
		};

		var doPan = function doPan() {
			var next = panPath.shift();
			if (next != null) {
				map.panTo(new google.maps.LatLng(next[0], next[1]));
				setTimeout(doPan, 10);
			} else {
				var queued = panQueue.shift();
				if (queued != null) {
					panTo(queued[0], queued[1]);
				}
			}
		};

		var markers = [];
		onMarkerLoad(arrayOfPins);
		map.set('zoom', 3);
		var triggers = $trel.closest('.contact-section').find('.js-map-trigger');
		var panPath = []; // путь
		var panQueue = []; // очередь
		var STEPS = 10; // шаг
		triggers.each(function () {
			var _ = $(this),
				ind = _.index();
			_.on('click', function () {
				_.addClass('active').siblings().removeClass('active');
				var lat = markers[ind].position.lat(),
					lng = markers[ind].position.lng();
				panTo(lat, lng);
			});
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {

	if ($('#map').length) {
		initMap('#map', arrayOfPins);
	}

	if ($('.map').length) {
		var maps = $('.map');
		maps.filter(function (index) {
			var thisMap = $(this);
			initMap(thisMap, arrayOfPinsMaps[index]);
			console.log(index);
		});
	}

	var docWindow = $(window),
		vHeight = docWindow.height(),
		headerMenu = $('#header-mainwrap'),
		videoWrapper = $('#main-first-screen-fading-wrapper'),
		screenWrapperHeight = $('#main-screen-wrapper').height(),
		burger = $('#main-burger'),
		screenLinks = $('#main-screen .screen-links-wrapper'),
		mainTitleWrapperInner = $('#title-wrapper-inner'),
		mainScreenTitle = $('#main-screen-title'),
		mobile = isMobile(),
		asideMenu = $('#aside-menu').length ? true : false,
		hasParallax = $('#parallax').length ? true : false,
		$parallax = void 0,
		$parallaxImg = void 0,
		parallaxImgHeight = void 0,
		parallaxFieldViewTop = void 0,
		parallaxFieldViewBottom = void 0,
		parallaxFieldView = void 0,
		scrollParallax = void 0,
		topMenu = void 0,
		menuItems = void 0,
		scrollItems = void 0;

	// Video append if not mobile
	if (!isMobile() && videoWrapper.data('src')) {
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video class="firstScreenFading" id="main-video" muted loop><source src="' + videoWrapper.data('src') + '" type="video/mp4"></video></div></div>');
		videoWrapper.find('.video-poster').remove();
	}

	function toggleBody(activeItem) {
		return function () {
			activeItem.toggleClass('active');
			if (mobile) {
				$('html').toggleClass('remodal-is-locked');
			} else {
				$('html').toggleClass('remodal-is-locked');
			}
		};
	}

	//burger-menu
	burger.on('click', toggleBody(headerMenu));

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
						slidesToShow: 8,
						slidesToScroll: 8,
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

		var i = (120 - scrollPos / screenWrapperHeight * 30) / 100;
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

	// docWindow.on('resize', function(){
	// 	console.log('Height '+docFunctions.findHeight())
	// });

	if ($('#dates').length) {
		$('#dates-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: false,
					infinite: false
				}
			}, {
				breakpoint: 750,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
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

	if ($('#brand-vertical-slider').length) {
		var $verticalSlider = $('#brand-vertical-slider');
		$verticalSlider.slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			accessibility: false,
			vertical: true,
			verticalSwiping: true
		});
	}

	// PARALLAX event on scroll trigger
	if (hasParallax) {
		$parallax = $('#parallax');
		$parallaxImg = $('#parallax .parallax-img img');
		parallaxImgHeight = $parallaxImg.height();
		parallaxFieldViewTop = $parallax.offset().top - vHeight;
		parallaxFieldViewBottom = $parallax.offset().top + $parallax.height() + $(window).height();
		parallaxFieldView = parallaxFieldViewBottom - parallaxFieldViewTop;

		scrollParallax = function scrollParallax(scrollPos) {
			if (scrollPos >= parallaxFieldViewTop && scrollPos <= parallaxFieldViewBottom) {
				$parallaxImg.css('transform', 'translate( 0, ' + -((scrollPos - parallaxFieldViewTop) / (parallaxFieldView / 100)) * (parallaxImgHeight / 150) + 'px)');
			}
		};
	}

	// Scroll triggers
	docWindow.scroll(function (event) {
		var scrollPos = docWindow.scrollTop();
		if (scrollPos > screenWrapperHeight && !$('body').hasClass('menu-mobile')) {
			headerMenu.addClass('sticked animated fadeInDownFast').css('animation-delay', '0');
			if (!mobile) {
				if (hasParallax) {
					scrollParallax(scrollPos);
				}
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
		headerMenu.removeClass('sticked animated fadeInDownFast');
	});

	// InView checker
	if ($(window).width() >= 1024) {
		inView.offset(100);
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
			$schemeSlides = $('#scheme-slider .scheme-slider__slide');

		$schemeButton.on('click', function () {
			var _self = $(this);
			if (!_self.hasClass('active')) {
				// Removing all active classes on buttons
				$schemeButton.filter(function () {
					$(this).removeClass('active');
				});
				// Add active class to pressed button
				_self.addClass('active').siblings().removeClass('active');
				var slide = $schemeSlides.eq(_self.data('slide') - 1);
				slide.addClass('active').siblings().removeClass('active');
				ell = _self.data('slide');
				$('#scheme .scheme-menu').css('transform', 'rotate(' + (360 / 8 * -_self.data('slide') + 45) + 'deg)');
				$('#scheme .scheme-menu g.icon').css('transform', 'rotate(' + (360 / 8 * _self.data('slide') - 45) + 'deg)');
			}
		});

		// Scheme update button trigger
		$('#update-scheme-slider').on('click', function () {
			ell >= 8 ? ell = 1 : ell++;
			$schemeButton.eq(ell - 1).trigger('click');
		});
	}

	if ($('#graphics').length) {
		var chartButton = $('#chart-control .button'),
			chartCurrent = 0,
			chartParams = {
				data: chartData[chartCurrent].values,
				animate_on_load: true,
				width: 600,
				height: 500,
				full_width: true,
				full_height: true,
				left: 100,
				y_extended_ticks: true,
				x_extended_ticks: true,
				point_size: 4,
				target: '#company-chart',
				x_accessor: 'date',
				y_accessor: 'value',
				y_label: chartData[chartCurrent].title,
				color_accessor: 'v',
				color_type: 'category',
				mouseover: function mouseover(d, i) {
					d3.select('#company-chart svg .mg-active-datapoint').text('В ' + (i + 2011) + ' году произведено ' + d.value + ' тыс.тонн');
				}
			};

		chartButton.on('click', function () {
			var _thisChartButton = $(this);
			if (!_thisChartButton.hasClass('active')) {
				chartCurrent = _thisChartButton.data('chart');
			}
			chartParams.data = chartData[chartCurrent].values;
			chartParams.y_label = chartData[chartCurrent].title;
			// change button state
			_thisChartButton.addClass('active').siblings().removeClass('active');
			// update data
			delete chartParams.xax_format;
			MG.data_graphic(chartParams);
		});
		MG.data_graphic(chartParams);
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
});