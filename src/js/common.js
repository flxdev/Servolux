window.onload = function () {

	if ($('#main-video').length) {
		$('#main-video').get(0).play()
	}

	if ($('#dates').length) {
		$('#dates-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						arrows: false,
						infinite: false
					}
				},
				{
					breakpoint: 750,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						arrows: false,
						infinite: false
					}
				},
				{
					breakpoint: 540,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						infinite: false
					}
				}
			]
		})
	}

	if ($('#brand-products').length) {
		let $productsSlider = $('#brand-products-slider')
		$productsSlider.slick({
			arrows: true,
			dots: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 750,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 540,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		})
		let productsSliesLength = $productsSlider.find('.slick-dots li').length
		$productsSlider.append('<div class="slick-sum-slides">/ ' + productsSliesLength + '</div>')
	}

	if ($('#news-inner-slider').length) {
		let $newsInnerSlider = $('#news-inner-slider')
		$newsInnerSlider.slick({
			arrows: true,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			focusOnSelect: false,
			accessibility: false
		})

		let productsSliesLength = $newsInnerSlider.find('.slick-dots li').length
		$newsInnerSlider.append('<div class="slick-sum-slides">/ ' + productsSliesLength + '</div>')
	}

	if ($('.vertical-slider').length) {

		let $verticalSlider = $('.vertical-slider'),
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
		})
	}

	if($('#canvas').length) {

		let barNumber = 0,
			chartOptions = {
			type: 'bar',
			data: barChartData[barNumber],
			options: {
				title: {
					display: true,
						text: barChartData[barNumber].title
				},
				legend: {
					display: true,
						position: 'bottom'
				},
				tooltips: {
					mode: 'index',
						intersect: false
				},
				responsive: true,
				scales: {
					xAxes: [{
						stacked: true,
					}],
					yAxes: [{
						stacked: true,
						ticks: {
							// Include a dollar sign in the ticks
							callback: function(value) {
								return value + " " + barChartData[barNumber].value;
							}
						}
					}]
				}
			}
		}

		let ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx, chartOptions);

		$('#chart-control .button').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			barNumber = $(this).data('chart')
			chartOptions.data = barChartData[barNumber]
			chartOptions.options.title.text = barChartData[barNumber].title
			chartOptions.options.scales.yAxes[0].ticks.callback = function(value){return value + " " + barChartData[barNumber].value;}
			myBar.update()
		})
	}
}

function isMobile () {
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) )
}

//TODO map middle lan and lng of pins to see them all
function initMap (mapArg, arrayOfPins, manyMaps=false) {
	let	element = mapArg,
		zoomIn = parseFloat(element.getAttribute('data-zoom')),
		latcord = parseFloat(element.getAttribute('data-lat')),
		loncord = parseFloat(element.getAttribute('data-lon')),
		imgpath = element.getAttribute('data-icon'),
		centercords = {lat: latcord, lng: loncord};
		if(manyMaps){
			latcord = arrayOfPins.lat
			loncord = arrayOfPins.lng
			centercords = {lat: latcord, lng: loncord}
		}
		let map = new google.maps.Map(element, {
			zoom: zoomIn,
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
				'stylers': [{'visibility': 'on'}]
			}, {
				'featureType': 'all',
				'elementType': 'geometry.fill',
				'stylers': [{'visibility': 'on'}]
			}, {
				'featureType': 'all',
				'elementType': 'geometry.stroke',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'all',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'all',
				'elementType': 'labels.text.fill',
				'stylers': [{'color': '#000000'}]
			}, {
				'featureType': 'all',
				'elementType': 'labels.text.stroke',
				'stylers': [{'color': '#ffffff'}]
			}, {
				'featureType': 'administrative',
				'elementType': 'geometry.stroke',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative',
				'elementType': 'labels',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.country',
				'elementType': 'geometry.fill',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.country',
				'elementType': 'geometry.stroke',
				'stylers': [{'visibility': 'on'}, {'saturation': '-14'}, {'weight': '1'}, {'lightness': '67'}, {'gamma': '1.41'}, {'color': '#c7d7c7'}]
			}, {
				'featureType': 'administrative.country',
				'elementType': 'labels.text',
				'stylers': [{'hue': '#ff0000'}, {'visibility': 'off'}]
			}, {
				'featureType': 'administrative.province',
				'elementType': 'all',
				'stylers': [{'visibility': 'on'}]
			}, {
				'featureType': 'administrative.province',
				'elementType': 'geometry.stroke',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.province',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.locality',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.neighborhood',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'administrative.land_parcel',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'landscape',
				'elementType': 'all',
				'stylers': [{'saturation': '-39'}, {'lightness': '35'}, {'gamma': '1.08'}]
			}, {
				'featureType': 'landscape',
				'elementType': 'geometry',
				'stylers': [{'saturation': '0'}]
			}, {
				'featureType': 'landscape',
				'elementType': 'labels',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'landscape.man_made',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}, {'lightness': '10'}]
			}, {
				'featureType': 'landscape.man_made',
				'elementType': 'geometry.stroke',
				'stylers': [{'saturation': '-100'}, {'lightness': '-14'}]
			}, {
				'featureType': 'landscape.man_made',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'landscape.natural.landcover',
				'elementType': 'labels.text',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'poi',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}, {'lightness': '10'}, {'gamma': '2.26'}]
			}, {
				'featureType': 'poi',
				'elementType': 'labels',
				'stylers': [{'visibility': 'off'}]
			}, {
				'featureType': 'poi',
				'elementType': 'labels.text',
				'stylers': [{'saturation': '-100'}, {'lightness': '-3'}]
			}, {
				'featureType': 'road',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}, {'lightness': '54'}]
			}, {
				'featureType': 'road',
				'elementType': 'geometry.stroke',
				'stylers': [{'saturation': '-100'}, {'lightness': '-7'}]
			}, {
				'featureType': 'road.arterial',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}]
			}, {
				'featureType': 'road.local',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}, {'lightness': '-2'}]
			}, {
				'featureType': 'transit',
				'elementType': 'all',
				'stylers': [{'saturation': '-100'}]
			}, {
				'featureType': 'water',
				'elementType': 'geometry.fill',
				'stylers': [{'saturation': '-100'}, {'lightness': '100'}]
			}, {
				'featureType': 'water',
				'elementType': 'geometry.stroke',
				'stylers': [{'saturation': '-100'}, {'lightness': '-100'}]
			}]
		})
	let img = {
		url: imgpath,
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(35, 56),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(8.8, 28),
		scaledSize: new google.maps.Size(17.5, 28)
	}
	let mainmarkermarker = new google.maps.Marker({
		position: centercords,
		map: map,
		icon: img,
		zIndex: 99999
	})
	if ($(element).hasClass('map-elem-near')) {
		let markers = []
		onMarkerLoad(arrayOfPins)
		let triggers = $(element).closest('.contact-section').find('.js-map-trigger')
		let panPath = []   // путь
		let panQueue = []  // очередь
		let STEPS = 10     // шаг
		triggers.each(function () {
			let _ = $(this),
				ind = _.index()
			_.on('click', function () {
				_.addClass('active').siblings().removeClass('active')
				let lat = markers[ind].position.lat(),
					lng = markers[ind].position.lng()
				panTo(lat, lng)
			})
		})

		function onMarkerLoad (json) {
			let markerarr = []
			mainmarkermarker.setMap(null)
			for (let i = 0; i < json.length; i++) {
				// Current object
				let obj = json[i]
				let imgType = {
					url: imgpath,
					// This marker is 20 pixels wide by 32 pixels high.
					size: new google.maps.Size(17.5, 28),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(8.8, 28),
					scaledSize: new google.maps.Size(17.5, 28)
				}
				// Adding a new marker for the object
				let pos = new google.maps.LatLng(obj.lat, obj.lng)
				markerarr.push(pos)
				let marker = new MarkerWithLabel({
					position: new google.maps.LatLng(obj.lat, obj.lng),
					title: obj.title,
					map: map,
					icon: imgType,
					zIndex: 999999,
					labelContent: '<div id="content"><div class="siteNotice"><div class="u-text lt">' + obj.name + '</div></div></div>',
					labelAnchor: new google.maps.Point(0, 0),
					labelClass: 'labels',
				})
				markers.push(marker)
				google.maps.event.addListener(marker, 'click', function (e) {
					hidemarkers(markers)
					this.set('labelClass', 'labels place_open')
				})
			} // end loop
			google.maps.event.addListener(map, 'click', function (e) {
				if (!$(e.target).hasClass('labels')) {
					hidemarkers(markers)
				}
			})
		}

		function hidemarkers (array) {
			for (let i = 0; i < array.length; i++) {
				let cur = array[i]
				cur.set('labelClass', 'labels')
			}
		}

		function panTo (newLat, newLng) {
			if (panPath.length > 0) {
				panQueue.push([newLat, newLng])
			} else {
				// Lets compute the points we'll use
				panPath.push('LAZY SYNCRONIZED LOCK')
				let curLat = map.getCenter().lat()
				let curLng = map.getCenter().lng()
				let dLat = (newLat - curLat) / STEPS
				let dLng = (newLng - curLng) / STEPS
				for (let i = 0; i < STEPS; i++) {
					panPath.push([curLat + dLat * i, curLng + dLng * i])
				}
				panPath.push([newLat, newLng])
				panPath.shift()
				setTimeout(doPan, 10)
			}
		}

		function doPan () {
			let next = panPath.shift()
			if (next != null) {
				map.panTo(new google.maps.LatLng(next[0], next[1]))
				setTimeout(doPan, 10)
			} else {
				let queued = panQueue.shift()
				if (queued != null) {
					panTo(queued[0], queued[1])
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {

	if ($('#map').length) {
		initMap(document.getElementById('map'), arrayOfPins)
	}

	if ($('.map').length) {
		$('.map').filter(function (index) {
			initMap(this, arrayOfPins[index], true)
		})
	}

	let docWindow = $(window),
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
		// $parallax,
		// $parallaxImg,
		// parallaxImgHeight,
		// parallaxFieldViewTop,
		// parallaxFieldViewBottom,
		// parallaxFieldView,
		// scrollParallax,
		topMenu,
		menuItems,
		scrollItems

	// Video append if not mobile
	if (!isMobile() && videoWrapper.data('src')) {
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video class="firstScreenFading" id="main-video" muted loop><source src="' + videoWrapper.data('src') + '" type="video/mp4"></video></div></div>')
		//videoWrapper.find('.video-poster').remove()
	}

	// function toggleBody (activeItem) {
	// 	return function () {
	// 		activeItem.toggleClass('active')
	// 		if (mobile) {
	// 			$('html').toggleClass('remodal-is-locked')
	// 		}
	// 		else {
	// 			$('html').toggleClass('remodal-is-locked')
	// 		}
	// 	}
	// }

	$('.callback-button').on('click', function () {
		let buttonText = $(this).text();
		$('#modal-title').text(buttonText)
	})

	//burger-menu
	burger.on('click', function () {
		$headerMenuWrapper.toggleClass('active')
		$headerModalWrapper.toggleClass('active')
		$('html').toggleClass('menu-is-locked')
	})

	if ($('#modal').length) {
		let $modalContent = $('#modal-content'),
			$brandProductsBlock = $('#brand-products-slider .products-slide'),
			$modalContentImages = $('#modal-content-images')

		$brandProductsBlock.on('click', function () {
			let slideno = $(this).data('slick-index')
			$('#modal-content-images').slick('slickGoTo', slideno)
		})

		$brandProductsBlock.filter(function () {
			let clo = $(this).find('img')
			$modalContent.append('<div class="slick-slide products-slide"><div class="slide-img"><img src="' + clo.attr('src') + '"></div></div>')
			$modalContentImages.append('<div class="slick-slide modal-img-slide"><div class="modal-img-slide-inner"><img src="' + clo.data('img') + '" alt=""></div><p class="h2">' + clo.data('text') + '</p></div>')
		})

		let inst = $('#modal').remodal(),
			$modal = $('#modal')

		$(document).on('opened', '.remodal', function (e) {

			if (inst.getState() == 'opened') {

				if (!$modal.hasClass('activated')) {

					$modal.addClass('activated')

					$modalContentImages.slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						fade: true,
						asNavFor: $modalContent
					})

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
						responsive: [
							{
								breakpoint: 1024,
								settings: {
									slidesToShow: 6,
									slidesToScroll: 6
								}
							},
							{
								breakpoint: 750,
								settings: {
									slidesToShow: 4,
									slidesToScroll: 4
								}
							},
							{
								breakpoint: 540,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3
								}
							}
						]
					})

				}
			}
		})
	}

	// Main screen "three list" events
	if ($('#main-screen .screen-link-text').length) {
		$('#main-screen .screen-link-text').on('mouseenter', function () {
			mainTitleWrapperInner.addClass('active')
		})
		$('#main-screen .screen-link-text').on('mouseleave', function () {
			mainTitleWrapperInner.removeClass('active')
		})
	}

	// Main screen fade out and video zoom out on scroll
	function scrollMainScreen (scrollPos) {

		let i = (120 - ((scrollPos / screenWrapperHeight) * 30)) / 100
		videoWrapper.css('opacity', (vHeight / scrollPos) / 3).find('.firstScreenFading').css('transform', 'translate(-50%, -50%) scale(' + (i <= 1 ? 1 : i) + ')')
		if (scrollPos > 150 && !screenLinks.hasClass('hiddened')) {
			screenLinks.fadeOut().addClass('hiddened')
		}
		else if (scrollPos < 150 && screenLinks.hasClass('hiddened')) {
			screenLinks.fadeIn().removeClass('hiddened')
		}
	}

	// Main title fade out on scroll
	function scrollMainTitle (scrollPos) {
		mainScreenTitle.css('transform', 'translatey(' + Math.round(-(scrollPos) / 2) + 'px)')
	}

	// docWindow.on('resize', function(){
	// 	console.log('Height '+docFunctions.findHeight())
	// });

	// PARALLAX event on scroll trigger
	// if (hasParallax) {
	// 	$parallax = $('#parallax')
	// 	$parallaxImg = $('#parallax .parallax-img img')
	// 	parallaxImgHeight = $parallaxImg.height()
	// 	parallaxFieldViewTop = $parallax.offset().top - vHeight
	// 	parallaxFieldViewBottom = $parallax.offset().top + $parallax.height() + $(window).height()
	// 	parallaxFieldView = parallaxFieldViewBottom - parallaxFieldViewTop
	//
	// 	scrollParallax = (scrollPos) => {
	// 		if (scrollPos >= parallaxFieldViewTop && scrollPos <= parallaxFieldViewBottom) {
	// 			$parallaxImg.css('transform', 'translate( 0, ' + ( -((scrollPos - parallaxFieldViewTop) / (parallaxFieldView / 100))) * (parallaxImgHeight / 150) + 'px)')
	// 		}
	// 	}
	// }

	if (hasParallax) {
		const rellax = new Rellax('.rellax')
	}

	// Scroll triggers
	docWindow.scroll(function (event) {
		let scrollPos = docWindow.scrollTop()
		if (scrollPos > screenWrapperHeight && !$('body').hasClass('menu-mobile')) {
			$headerMenuWrapper.addClass('sticked animated fadeInDownFast').css('animation-delay', '0')
			if (!mobile) {
				// if (hasParallax) {
				// 	scrollParallax(scrollPos)
				// }
				if (asideMenu) {
					changeAsideMenu()
				}
			}
			return
		}
		else if (scrollPos < 0) {
			return
		}
		if (!mobile) {
			scrollMainScreen(scrollPos)
			scrollMainTitle(scrollPos)
		}
		$headerMenuWrapper.removeClass('sticked animated fadeInDownFast')
	})

	// InView checker
	if ($(window).width() >= 992) {
		inView.offset(50)
		inView('.animateThis').on('enter', function (el) {
			$(el).addClass('animated ' + $(el).data('anim'))
		})
	}

	// Chart bar width maker
	$('#index-chart .chart-bar').filter(function () {
		$(this).css('width', $(this).data('scale') + '%')
	})

	// Brands appender and changer
	if ($('#brands').length) {
		let elemsInView = [],
			isPaused = false,
			$brands = $('#brands'),
			$brandsBlocks = $('#brands .brand-anim-block')

		$brandsBlocks.filter(function () {
			let _this = $(this),
				rand = Math.floor(Math.random() * (15000 - 8000)) + 8000,
				brandCounter = 0,
				elem
			// Brand appender
			if (brandCounter < $brandsBlocks.length + 1) {
				// Random element
				elem = Math.floor(Math.random() * brandElems.brands.length)
				// Random while element exist
				while (elemsInView[elem]) {
					elem = Math.floor(Math.random() * brandElems.brands.length)
				}
				// Write element in array
				elemsInView[elem] = true
				// Append brand
				_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>')
				brandCounter++
			}

			// Brands changer
			if (!mobile) {
				setInterval(function () {
					// Skip changing when mouse enter
					if (!isPaused) {
						// Random while elem exist
						while (elemsInView[elem]) {
							elem = Math.floor(Math.random() * brandElems.brands.length)
						}

						// Append new brand
						_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>')
						// Animating new appended brand
						_this.children('a:nth-of-type(2)').addClass('animated slideBrand')
						// Animate Out old Brand
						_this.children('a:first-of-type').addClass('animated slideBrandOut')
						// Write new brand
						elemsInView[elem] = true
						// Removing old brand after 1 sec
						setTimeout(function () {
							// Search and destroy old brand
							for (let key in brandElems.brands) {
								if (brandElems.brands[key].src == _this.children('a:first-of-type').children('img').attr('src')) {
									elemsInView[key] = false
								}

							}

							// Remove animation from new brand
							_this.children('a').removeClass('animated slideBrand')
							// Destroy old brand
							_this.children('a:first-of-type').remove()
						}, 1000)
					}
				}, rand)
			}
		})
		$brands.on('mouseenter', function () {
			isPaused = true
		})
		$brands.on('mouseleave', function () {
			isPaused = false
		})
	}

	// Scheme rotator and activator
	if ($('#scheme').length) {
		let ell = 1,
			$schemeButton = $('#scheme .scheme-button'),
			$schemeSlides = $('#scheme-slider .scheme-slider__slide'),
			currentSlide = 1,
			currentDeg = 0,
			slideDeg = 45;

		$schemeButton.on('click', function () {
			let _self = $(this)

			if (!_self.hasClass('active')) {

				// Removing all active classes on buttons
				$schemeButton.filter(function () {
					$(this).removeClass('active')
				})

				// Add active class to pressed button
				_self.addClass('active').siblings().removeClass('active')

				// Get pressed slide number
				ell = _self.data('slide')

				if (ell > currentSlide) {
					currentDeg += slideDeg * (ell - currentSlide)
					$('#scheme-menu').css('transform', 'rotate(-' + currentDeg + 'deg)')
					$('#scheme-menu .icon').css('transform', 'rotate(' + currentDeg + 'deg)')
					currentSlide = ell
				}
				else if (ell < currentSlide) {
					currentDeg += slideDeg * (8 + ell - currentSlide)
					$('#scheme-menu').css('transform', 'rotate(-' + currentDeg + 'deg)')
					$('#scheme-menu .icon').css('transform', 'rotate(' + currentDeg + 'deg)')
					currentSlide = ell
				}

				let slide = $schemeSlides.eq(ell - 1)
				slide.addClass('active').siblings().removeClass('active')
			}
		})

		// Scheme update button trigger
		$('#update-scheme-slider').on('click', function () {
			ell >= 8 ? ell = 1 : ell++
			$schemeButton.eq(ell - 1).trigger('click')
		})
	}

	if ($('#graphics').length) {
		let chartButton = $('#chart-control .button'),
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
				mouseover: function (d, i) {
					d3.select('#company-chart svg .mg-active-datapoint')
					.text('В ' + (i + 2011) + ' году произведено ' + d.value + ' тыс.тонн')
				}
			}

		chartButton.on('click', function () {
			let _thisChartButton = $(this)
			if (!_thisChartButton.hasClass('active')) {
				chartCurrent = _thisChartButton.data('chart')
			}
			chartParams.data = chartData[chartCurrent].values
			chartParams.y_label = chartData[chartCurrent].title
			// change button state
			_thisChartButton.addClass('active').siblings().removeClass('active')
			// update data
			delete chartParams.xax_format
			MG.data_graphic(chartParams)
		})
		MG.data_graphic(chartParams)
	}

	if (asideMenu) {
		$('.aside-menu-item').filter(function () {
			let _asideItem = $(this),
				itemId = _asideItem.attr('id')
			$('#aside-menu .aside-menu-wrapper').append('<a href="#' + itemId + '"><div class="aside-item-inner"><p>' + _asideItem.data('aside') + '</p></div></a>')
		})

		topMenu = $('#aside-menu .aside-menu-wrapper')
		menuItems = topMenu.find('a')
		scrollItems = menuItems.map(function () {
			let item = $($(this).attr('href'))
			if (item.length) { return item }
		})

		$('#aside-menu').stick_in_parent()
		animateAsideMenu()
	}

	if ($('.sticky-block').length) {

		let $stickyBlock = $('.sticky-block');

		$stickyBlock.filter(function () {

			let stickyBlockOffsetTop = $(this).data('offsettop');
			$(this).stick_in_parent({offset_top: stickyBlockOffsetTop})

		})

	}

	function animateAsideMenu () {

		$('#aside-menu').find('a').on('click', function (el) {
			el.preventDefault()
			let _asideHref = $(this).attr('href')
			$('html, body').animate({
				scrollTop: $(_asideHref).offset().top - 80
			}, 1000)

		})
	}

	function changeAsideMenu () {
		let fromTop = docWindow.scrollTop() + 120,
			cur = scrollItems.map(function (el) {
				if (scrollItems[el].offset().top < fromTop)
					return scrollItems[el]
			})
		cur = cur[cur.length - 1]
		let id = cur && cur.length ? cur[0].id : ''
		menuItems
		.siblings().removeClass('active')
		.filter('[href=\'#' + id + '\']').addClass('active')
	}

	if ($('#partners-slider-wrapper').length) {
		let $partnersSliderWrapper = $('#partners-slider-wrapper')
		$partnersSliderWrapper.slick({
			arrows: true,
			dots: true,
			slidesToShow: 6,
			slidesToScroll: 6,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 750,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 540,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		})

		let partnersSlidesLength = $partnersSliderWrapper.find('.slick-dots li').length
		$partnersSliderWrapper.append('<div class="slick-sum-slides">/ ' + partnersSlidesLength + '</div>')
	}

	if (!window.Promise) {
		window.Promise = Promise;
	}

	function lazyImage () {
		console.log('lazyImage init')
		var arr = document.querySelectorAll('.js-image');
		var images = [];
		for (var i = 0; i < arr.length; i++) {
			images.push(arr[i]);
		}
		var config = {
			rootMargin: '0px 0px',
			threshold: 0.01
		};

		var imageCount = images.length;
		var observer = void 0;
		if (!('IntersectionObserver' in window)) {
			for (var i = 0; i < imageCount; i++) {
				preloadImage(images[i]);
			}
		} else {
			observer = new IntersectionObserver(onIntersection, config);
			for (var i = 0; i < imageCount; i++) {
				if (images[i].classList.contains('js-image-handled')) {
					return;
				}
				observer.observe(images[i]);
			}
		}

		function fetchImage (url) {
			return new Promise(function (resolve, reject) {
				var image = new Image();
				image.src = url;
				image.onload = resolve;
				image.onerror = reject;
			});
		}

		function preloadImage (image) {
			var src = image.dataset.src;
			if (!src) {
				return;
			}
			return fetchImage(src).then(function () {
				applyImage(image, src);
			});
		}

		function loadImagesImmediately (images) {
			for (var i = 0; i < images.length; i++) {
				return preloadImage(images[i]);
			}
		}

		function disconnect () {
			if (!observer) {
				return;
			}
			observer.disconnect();
		}

		function onIntersection (entries) {
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

		function applyImage (img, src) {
			img.classList.add('js-image-handled');
			if (img.classList.contains('bg')) {
				img.style.backgroundImage = "url(" + src + ")";
			} else {
				img.src = src;
			}
			img.classList.add('fade-in');
		}
	}

	if ($('#standard-toggle').length) {
		$('#standard-toggle').find('.button').each(
			function () {
				$(this).on('click', function () {
					$(this).addClass('active').siblings().removeClass('active')
					let toggleItem = $(this).data('item')
					$('#toggleItems').find('.toggle-item').eq(toggleItem).addClass('active').siblings().removeClass('active')
				})
			})
	}

	if ($('#contacts').length) {
		const controllButtons = $('#chart-control .button'),
			contactBlocks = $('#blocks-wrapper .contacts-toggle-blocks'),
			$countryAsideMenyHrefs = $('.country-aside-menu .href');

		controllButtons.on('click', function () {
			const contBlock = $(this).data('block');
			$(this).addClass('active').siblings().removeClass('active')
			$(contactBlocks[contBlock]).addClass('active').siblings().removeClass('active')
		})

		$countryAsideMenyHrefs.on('click', function () {
			const contCountries = $(this).data('countries'),
				contBlock = $(this).data('block')
			;
			$(this).addClass('active').siblings().removeClass('active')
			$('#countryBlock' + contBlock + ' .country-block:nth-of-type(' + contCountries + ')').addClass('active').siblings().removeClass('active')
		})

	}
	if ($('#jobs-content-wrapper').length) {
		$('.jobs-tags-title-wrapper').on('click', function () {
			$(this).toggleClass('deactive')
			$(this).next().toggleClass('deactive')
		})
	}

	if ($('.formFocus').length) {
		$('.formFocus').filter(function () {
			$(this).find('label').filter(function () {
				$(this).on('focusout', function () {
					$(this).removeClass('focusing')
					if (!$(this).find('input').val() && !$(this).find('textarea').val()) {
						$(this).removeClass('active')
					}
				})
				$(this).on('focusin', function () {
					$(this).addClass('focusing')
					if (!$(this).hasClass('active')) {
						$(this).addClass('active')
					}
				})
			})
		})
	}

	if ($('.formFocus').length) {
		$.validate({
			form: '.formFocus',
			modules: 'html5, security, file',
			lang: 'ru',
			addValidClassOnAll: true,
			validateOnBlur: true, // disable validation when input looses focus
			errorMessagePosition: 'bottom',
			onSuccess: function ($form) {
				let modalSuccess = $('#callbackSuccess').remodal();
				modalSuccess.open();
				return false; // Will stop the submission of the form
			},
		});

		function initDropzoneCompany () {
			$('.formFocus').dropzone({
				url: "/",
				paramName: "file",
				maxFilesize: 10,
				uploadMultiple: true,
				previewsContainer: '#files-input',
				createImageThumbnails: false,
				addRemoveLinks: true,
				dictDefaultMessage: 'Прикрепить резюме',
				dictFileTooBig: 'Файл слишком большой',
				dictResponseError: 'Сервер ответил с ошибкой',
				dictInvalidFileType: 'Неверный тип файла',
				acceptedFiles: ".doc,.docx,.pdf,.txt,image/*",
				init: function () {
					this.on("removedfile", function (file) {
						$.ajax({
							type: "POST",
							url: "/",
							data: "del=" + file['name'] + '&action=FILE',
							dataType: "html"
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
				sending: function (file, xhr, formData) {
					formData.append('action', 'FILE');
				}
			});
		}

		function clearDropzone () {
			const obj = Dropzone.forElement(".formFocus");
			obj.emit("resetFiles");
		}

	}
});