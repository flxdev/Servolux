window.onload = function() {
	if($('#main-video').length){
		$('#main-video').get(0).play();
	}

	setTimeout(function(){
		$('#title-wrapper').removeClass('animated fadeInDownMenu')
	}, 500);

};



function isMobile()	{
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}

//Map init
function initMap() {
	var trel = document.getElementById('map');
	var originalMapCenter = new google.maps.LatLng(23, 55);
	var mapopts = {
		zoom: 3,
		minZoom: 3,
		fullscreenControl: false,
		scrollwheel: false,
		scaleControl: false,
		mapTypeControl: false,
		center: originalMapCenter,
		// center: centercords,
		streetViewControl: false,
		gestureHandling: "greedy",
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"saturation":"-14"},{"weight":"1"},{"lightness":"67"},{"gamma":"1.41"},{"color":"#c7d7c7"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"hue":"#ff0000"},{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"-39"},{"lightness":"35"},{"gamma":"1.08"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"saturation":"0"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"10"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"-14"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"10"},{"gamma":"2.26"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"saturation":"-100"},{"lightness":"-3"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"54"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"-7"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"-2"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"saturation":"-100"},{"lightness":"100"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"-100"}]}]
	};


	initialize(trel,mapopts)


	function initialize(elem, mapopts){
		var _ = elem;
		var latcord = parseFloat(_.getAttribute('data-lat')),
			loncord = parseFloat(_.getAttribute('data-lon')),
			imgpath = _.getAttribute('data-icon'),
			centercords = new google.maps.LatLng(latcord, loncord),
			arrayOfPins = [[43, 33], [38, 37], [43, 55]]
		mapvar = new google.maps.Map(_,mapopts);
		var img = {
			url: imgpath,
			size: new google.maps.Size(76, 114),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(38, 114),
			scaledSize: new google.maps.Size(38, 57)
		};
		// var marker = new google.maps.Marker({
		// 	position: centercords,
		// 	map: mapvar,
		// 	icon: img,
		// 	zIndex: 99999
		// });
		function createMarker(array){
			array.filter(function(index){
				console.log(index)
				new google.maps.Marker({
					position: new google.maps.LatLng(index[0], index[1]),
					map: mapvar,
					icon: img,
					zIndex: 99999
				});
			})
		} createMarker(arrayOfPins);
		elem.classList.add('inited');
	}

}



document.addEventListener("DOMContentLoaded", function() {


	var docWindow = $(window),
		vHeight = docWindow.height(),
		headerMenu = $('#header-mainwrap'),
		videoWrapper = $('#main-first-screen-fading-wrapper'),
		screenWrapperHeight = $('#main-screen-wrapper').height(),
		burger = $('#main-burger'),
		screenLinks = $('#main-screen .screen-links-wrapper'),
		mainTitle = $('#title-wrapper'),
		mobile = isMobile();

	// Video append if not mobile
	if(!isMobile() && videoWrapper.data('src')){
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video class="firstScreenFading" id="main-video" muted loop><source src="'+videoWrapper.data('src')+'" type="video/mp4"></video></div></div>')
		videoWrapper.find('.video-poster').remove()
	}




	//burger-menu
	burger.on('click', function(){
		headerMenu.toggleClass('active')
		if(mobile){
			$('body').toggleClass('menu-mobile')
		}
		else{
			$('body').toggleClass('menu-stuck')
		}
	});


	// Main screen "three list" events
	if( $('#main-screen .screen-link-text').length ){
		$('#main-screen .screen-link-text').on('mouseenter', function(){
			mainTitle.addClass('active')
		});
		$('#main-screen .screen-link-text').on('mouseleave', function(){
			mainTitle.removeClass('active')
		});
	}


	// Main screen fade out and video zoom out on scroll
	function scrollMainScreen(scrollPos){

		var i = (140-((scrollPos/screenWrapperHeight)*50))/100;
		videoWrapper.css('opacity', (vHeight/scrollPos)/3).find('.firstScreenFading').css('transform', 'translate(-50%, -50%) scale('+ (i<=1 ? 1 : i) +')');
		if(scrollPos>150 && !screenLinks.hasClass('hiddened')){
			screenLinks.fadeOut().addClass('hiddened')
		}
		else if(scrollPos<150 && screenLinks.hasClass('hiddened')){
			screenLinks.fadeIn().removeClass('hiddened')
		}
	}



	// Main title fade out on scroll
	function scrollMainTitle(scrollPos){
		mainTitle.css('transform', 'translatey('+ Math.round(-(scrollPos)/2) + 'px)')
	}



	// PARALLAX event on scroll trigger
	if($('#parallax').length){
		var $parallax = $('#parallax'),
			$parallaxImg = $('#parallax .parallax-img img'),
			parallaxFieldViewTop = $parallax.offset().top - vHeight,
			parallaxFieldViewBottom = $parallax.offset().top + $parallax.height(),
			parallaxFieldView = parallaxFieldViewBottom - parallaxFieldViewTop;

		function scrollParallax(scrollPos){
			if( scrollPos >= parallaxFieldViewTop && scrollPos <= parallaxFieldViewBottom){
				$parallaxImg.css('transform', 'translate( 0, ' + (-((scrollPos - parallaxFieldViewTop)-(parallaxFieldView/2))/6) + 'px)')
			}
		}
	}


	// docWindow.on('resize', function(){
	// 	console.log('Height '+docFunctions.findHeight())
	// });

	if($('#dates').length){


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
		});
	}

	// Scroll triggers
	docWindow.scroll(function (event) {

		var scrollPos = docWindow.scrollTop();

		if(scrollPos > screenWrapperHeight && !$('body').hasClass('menu-mobile')) {

			headerMenu.addClass('sticked animated fadeInDownFast').css('animation-delay', '0')
			if(!mobile){
				scrollParallax(scrollPos);
			}
			return;
		}

		else if(scrollPos < 0){
			return
		}


		if(!mobile){
			scrollMainScreen(scrollPos);
			scrollMainTitle(scrollPos);
		}

		headerMenu.removeClass('sticked animated fadeInDownFast')

	});

	// InView checker
	if($(window).width() >= 1024){
		inView.offset(100)
		inView('.animateThis').on('enter', function(el){
			$(el).addClass('animated ' + $(el).data('anim'))
		});
	}

	// Chart bar width maker
	$('#index-chart .chart-bar').filter(function(){
		$(this).css('width', $(this).data('scale')+'%')
	})



	// Brands appender and changer
	if($('#brands').length){
		var elemsInView = [],
			isPaused = false,
			$brands = $('#brands'),
			$brandsBlocks = $('#brands .brand-anim-block');

		$brandsBlocks.filter(function(el){
			var _this = $(this),
				rand = Math.floor(Math.random() * (15000 - 8000)) + 8000,
				brandCounter = 0;

			// Brand appender
			if(brandCounter < $brandsBlocks.length+1){

				// Random element
				var elem = Math.floor(Math.random() * brandElems.brands.length)

				// Random while element exist
				while(elemsInView[elem]){
					elem = Math.floor(Math.random() * brandElems.brands.length)
				}

				// Write element in array
				elemsInView[elem] = true;

				// Append brand
				_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>')

				brandCounter++;
			}

			// Brands changer
			if(!mobile){
				setInterval( function(){

					// Skip changing when mouse enter
					if(!isPaused){

						// Random while elem exist
						while(elemsInView[elem]){
							elem = Math.floor(Math.random() * brandElems.brands.length);
						}

						// Append new brand
						_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>');

						// Animating new appended brand
						_this.children('a:nth-of-type(2)').addClass('animated slideBrand')

						// Animate Out old Brand
						_this.children('a:first-of-type').addClass('animated slideBrandOut')

						// Write new brand
						elemsInView[elem] = true;

						// Removing old brand after 1 sec
						setTimeout(function(){

							// Search and destroy old brand
							for(var key in brandElems.brands){
								if(brandElems.brands[key].src == _this.children('a:first-of-type').children('img').attr('src')){
									elemsInView[key] = false;
								}
							}

							// Remove animation from new brand
							_this.children('a').removeClass('animated slideBrand');

							// Destroy old brand
							_this.children('a:first-of-type').remove();

						}, 1000);

					}
				}, rand)
			}
		})

		$brands.on('mouseenter', function(){
			isPaused = true
		})
		$brands.on('mouseleave', function(){
			isPaused = false
		})

	}

	// Scheme rotator and activator
	if($('#scheme').length){
		var ell = 1,
			$schemeButton = $('#scheme .scheme-button'),
			$schemeSlides = $('#scheme-slider .scheme-slider__slide');

		$schemeButton.on('click', function(){
			var _self = $(this);
			console.log(ell)
			if(!_self.hasClass('active')){

				// Removing all active classes on buttons
				$schemeButton.filter(function(){
					$(this).removeClass('active')
				});

				// Removing all active classes on slides
				// $schemeSlides.eq(ell-1).removeClass('active')


				// Add active class to pressed button
				_self.addClass('active').siblings().removeClass('active');


				var slide = $schemeSlides.eq(_self.data('slide')-1);

				slide.addClass('active').siblings().removeClass('active');

				ell = _self.data('slide')
				$('#scheme .scheme-menu').css('transform', 'rotate(' + (((360/8)*(- _self.data('slide'))) + 45) + 'deg)')
				$('#scheme .scheme-menu g.icon').css('transform', 'rotate(' + (((360/8)*(_self.data('slide')))-45) + 'deg)')
			}
		})

		// Scheme update button trigger
		$('#update-scheme-slider').on('click', function(){
			ell >= 8 ? ell = 1 : ell++;
			$schemeButton.eq(ell-1).trigger('click');
			console.log(ell);
		})
	}



	if($('#graphics').length){


		var chartButton = $('#chart-control .button'),
			chartButtonsLength = chartButton.length,
			chartCurrent = 0,
			globals = {},
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
	        	color_type:'category',
	        	mouseover: function(d, i) {
		            d3.select('#company-chart svg .mg-active-datapoint')
		                .text('В ' + (i + 2011) + ' году произведено ' + d.value+' тыс.тонн');
	        	}
			};

		chartButton.on('click', function(){
			var _thisChartButton = $(this)
			if(!_thisChartButton.hasClass('active')){
				console.log(_thisChartButton.data('chart'))
				chartCurrent = _thisChartButton.data('chart')
			}

    			chartParams.data = chartData[chartCurrent].values;
    			chartParams.y_label = chartData[chartCurrent].title;
			    // change button state
			    _thisChartButton.addClass('active').siblings().removeClass('active');

			    // update data
			    delete chartParams.xax_format;
			    MG.data_graphic(chartParams);

		})


		MG.data_graphic(chartParams);
	}






	//SMOOTH SCROLL
	//
	//
	//
	//
	//
	//
	//
	//
	//
	(function() {

		var defaultOptions = {
        // Scrolling Variables (tweakable)
			frameRate: 60, // [Hz] 60
			animationTime: 400, // [px] 400
			stepSize: 100, // [px] 100

        // Pulse (less tweakable)
        // ratio of 'tail' to 'acceleration'
			pulseAlgorithm: true, // true
			pulseScale: 8, // 8
			pulseNormalize: 1, // 1

        // Acceleration
			accelerationDelta: 200, // 200
			accelerationMax: 1, // 1

        // Keyboard Settings
			keyboardSupport: true, // true
			arrowScroll: 50, // [px] 50

        // Overscroll
			overscroll: false, // false
			overscrollThreshold: 150, // [px] 150
			overscrollSelector: 'body', // body

        // Other
			touchpadSupport: true, // true
			fixedBackground: true, // true
			excluded: '', // ''
		};

    // Other Variables
		var isExcluded = false;
		var isFrame = false;
		var direction = {
			x: 0,
			y: 0
		};
		var initDone = false;
		var root = document.documentElement;
		var activeElement;
		var overscrollElement;
		var deltaBuffer = [120, 120, 120];

		var key = {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			spacebar: 32,
			pageup: 33,
			pagedown: 34,
			end: 35,
			home: 36
		};


    /***********************************************
     * SETTINGS
     ***********************************************/

		var options = deepExtend(defaultOptions, window.SmoothScrollOptions || {});


    /***********************************************
     * INITIALIZE
     ***********************************************/

    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
		function initTest() {
			var disableKeyboard = false;

        // disable keyboard support if anything above requested it
			if (disableKeyboard) {
				removeEvent('keydown', keydown);
			}

			if (options.keyboardSupport && !disableKeyboard) {
				addEvent('keydown', keydown);
			}
		}

    /**
     * Sets up scrolls array, determines if frames are involved.
     */
		function init() {
			if (!document.body) {
				return;
			}

			var body = document.body;
			var html = document.documentElement;
			var windowHeight = window.innerHeight;
			var scrollHeight = body.scrollHeight;

        // check compat mode for root element
			root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
			activeElement = body;

			initTest();
			initDone = true;

        // Checks if this script is running in a frame
			if (top !== self) {
				isFrame = true;

			} else if (scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight ||
                html.offsetHeight <= windowHeight)) {
            /**
             * This fixes a bug where the areas left and right to
             * the content does not trigger the onmousewheel event
             * on some pages. e.g.: html, body { height: 100% }
             */

            // DOMChange (throttle): fix height
				var pending = false;
				var refresh = function() {
					if (!pending && html.scrollHeight !== document.height) {
						pending = true; // add a new pending action
						setTimeout(function() {
							html.style.height = document.height + 'px';
							pending = false;
						}, 500); // act rarely to stay fast
					}
				};
				html.style.height = 'auto';
				setTimeout(refresh, 10);

            // clearfix
				if (root.offsetHeight <= windowHeight) {
					var underlay = document.createElement('div');
					underlay.style.clear = 'both';
					body.appendChild(underlay);
				}
			}

        // disable fixed background
			if (!options.fixedBackground && !isExcluded) {
				body.style.backgroundAttachment = 'scroll';
				html.style.backgroundAttachment = 'scroll';
			}

        // observe changes and update document min-height
			if (options.overscroll) {
				var observer = new MutationObserver(function(mutations) {
					resetOverscroll();
				});

				observer.observe(document.body, {
					childList: true,
					subtree: true
				});

				resetOverscroll();
			}
		}


    /************************************************
     * SCROLLING
     ************************************************/

		var que = [];
		var pending = false;
		var lastScroll = +new Date();
		var overscrolled = false;
		var overscrollMax = 0;

    /**
     * Pushes scroll actions to the scrolling queue.
     */
		function scrollArray(elem, left, top, touchpad, delay) {
			touchpad = touchpad || false;
			delay = delay || 1000;
			directionCheck(left, top);

			var accelerationMax = touchpad ? options.accelerationMax / 2 : options.accelerationMax;
			var accelerationDelta = options.accelerationDelta;

			if (accelerationMax !== 1) {
				var now = +new Date();
				var elapsed = now - lastScroll;
				if (elapsed < accelerationDelta) {
					var factor = (1 + (30 / elapsed)) / 2;
					if (factor > 1) {
						factor = Math.min(factor, accelerationMax);
						left *= factor;
						top *= factor;
					}
				}
				lastScroll = +new Date();
			}

        // push a scroll command
			que.push({
				x: left,
				y: top,
				lastX: (left < 0) ? 0.99 : -0.99,
				lastY: (top < 0) ? 0.99 : -0.99,
				start: +new Date()
			});

        // don't act if there's a pending queue
			if (pending) {
				return;
			}

			var scrollWindow = (elem === document.body);

			var step = function(time) {
				var now = +new Date();
				var scrollX = 0;
				var scrollY = 0;
				var animationTime = options.animationTime;

				for (var i = 0; i < que.length; i++) {

					var item = que[i];
					var elapsed = now - item.start;
					var finished = elapsed >= animationTime;

                // scroll position: [0, 1]
					var position = finished ? 1 : elapsed / animationTime;

                // easing [optional]
					if (options.pulseAlgorithm) {
						position = pulse(position, touchpad);
					}

                // only need the difference
					var x = (item.x * position - item.lastX) >> 0;
					var y = (item.y * position - item.lastY) >> 0;

                // add this to the total scrolling
					scrollX += x;
					scrollY += y;

                // update last values
					item.lastX += x;
					item.lastY += y;

                // delete and step back if it's over
					if (finished) {
						que.splice(i, 1);
						i--;
					}
				}

            // scroll left and top
				if (scrollWindow) {
					var overscrollDisabled = !!(overscrollElement && overscrollElement.getAttribute('overscroll') && JSON.parse(overscrollElement.getAttribute('overscroll')) === false);

					if (options.overscroll && !overscrollDisabled) {

						var translateY = 0;

                    // translate if scroll is top/bottom of window
						if ((window.scrollY === 0 && scrollY <= 0) || (window.scrollY === overscrollElement.scrollHeight - window.innerHeight && scrollY >= 0)) {
							translateY = -scrollY;

						} else {
							window.scrollBy(scrollX, scrollY);
						}

                    // reset overscrolled after snap back
						if (translateY === 0) {
							overscrolled = false;
							overscrollMax = 0;
						}

                    // dispatch overscroll event if over threshold
						if (Math.abs(translateY) > options.overscrollThreshold && !overscrolled) {
							overscrolled = true;

							var event = new CustomEvent('overscroll', {
								detail: {
									direction: scrollY < 0 ? 'top' : 'bottom'
								}
							});

							window.dispatchEvent(event);
						}

						if (Math.abs(translateY) > overscrollMax) {
							overscrollMax = Math.abs(translateY);
						}

                    // if (!overscrolled || Math.abs(translateY) >= overscrollMax) {
						overscrollElement.style.transform = 'translate(0, ' + translateY + 'px)';
                    // }

					} else {
						window.scrollBy(scrollX, scrollY);
					}

				} else {
					if (scrollX) {
						elem.scrollLeft += scrollX;
					}
					if (scrollY) {
						elem.scrollTop += scrollY;
					}
				}

            // clean up if there's nothing left to do
				if (!left && !top) {
					que = [];
				}

				if (que.length) {
					requestFrame(step, elem, (delay / options.frameRate + 1));
				} else {
					pending = false;
				}
			};

        // start a new queue of actions
			requestFrame(step, elem, 0);

			pending = true;
		}


    /***********************************************
     * EVENTS
     ***********************************************/

    /**
     * Resize handler
     * @param {Object} event
     */
		function resize(event) {
			if (options.overscroll) {
				resetOverscroll();
			}
		}

    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
		function wheel(event) {
			if (!initDone) {
				init();
			}

			var target = event.target;
			var overflowing = overflowingAncestor(target);
			var preventOverscroll = !options.overscroll && event.defaultPrevented;

        // use default if there's no overflowing
        // element or default action is prevented
			if (!overflowing || preventOverscroll ||
            isNodeName(activeElement, 'embed') ||
            (isNodeName(target, 'embed') && /\.pdf/i.test(target.src))) {
				return true;
			}

			var deltaX = event.wheelDeltaX || 0;
			var deltaY = event.wheelDeltaY || 0;

        // use wheelDelta if deltaX/Y is not available
			if (!deltaX && !deltaY) {
				deltaY = event.wheelDelta || 0;
			}

			var touchpad = isTouchpad(deltaY);

        // check if it's a touchpad scroll that should be ignored
			if (!options.touchpadSupport && touchpad) {
				return true;
			}

        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
			if (Math.abs(deltaX) > 1.2) {
				deltaX *= options.stepSize / 120;
			}

			if (Math.abs(deltaY) > 1.2) {
				deltaY *= options.stepSize / 120;
			}

			scrollArray(overflowing, -deltaX, -deltaY, touchpad);

			event.preventDefault();
		}

    /**
     * Keydown event handler.
     * @param {Object} event
     */
		function keydown(event) {
			var target = event.target;
			var modifier = event.ctrlKey || event.altKey || event.metaKey ||
            (event.shiftKey && event.keyCode !== key.spacebar);

        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
			if (/input|textarea|select|embed/i.test(target.nodeName) ||
            target.isContentEditable ||
            event.defaultPrevented ||
            modifier) {
				return true;
			}

        // spacebar should trigger button press
			if (isNodeName(target, 'button') &&
            event.keyCode === key.spacebar) {
				return true;
			}

			var shift, x = 0,
				y = 0;
			var elem = overflowingAncestor(activeElement);
			var clientHeight = elem.clientHeight;

			if (elem === document.body) {
				clientHeight = window.innerHeight;
			}

			switch (event.keyCode) {
			case key.up:
				y = -options.arrowScroll;
				break;
			case key.down:
				y = options.arrowScroll;
				break;
			case key.spacebar: // (+ shift)
				shift = event.shiftKey ? 1 : -1;
				y = -shift * clientHeight * 0.9;
				break;
			case key.pageup:
				y = -clientHeight * 0.9;
				break;
			case key.pagedown:
				y = clientHeight * 0.9;
				break;
			case key.home:
				y = -elem.scrollTop;
				break;
			case key.end:
				var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
				y = (damt > 0) ? damt + 10 : 0;
				break;
			case key.left:
				x = -options.arrowScroll;
				break;
			case key.right:
				x = options.arrowScroll;
				break;
			default:
				return true; // a key we don't care about
			}

			scrollArray(elem, x, y);

			event.preventDefault();
		}

    /**
     * Mousedown event only for updating activeElement
     */
		function mousedown(event) {
			activeElement = event.target;
		}


    /***********************************************
     * OVERFLOW
     ***********************************************/

		var cache = {}; // cleared out every once in while
		setInterval(function() {
			cache = {};
		}, 10 * 1000);

		var uniqueID = (function() {
			var i = 0;
			return function(el) {
				return el.uniqueID || (el.uniqueID = i++);
			};
		})();

		function setCache(elems, overflowing) {
			for (var i = elems.length; i--;) {
				cache[uniqueID(elems[i])] = overflowing;
			}
			return overflowing;
		}

		function overflowingAncestor(el) {
			var elems = [];
			var rootScrollHeight = root.scrollHeight;
			do {
				var cached = cache[uniqueID(el)];
				if (cached) {
					return setCache(elems, cached);
				}
				elems.push(el);
				if (rootScrollHeight === el.scrollHeight) {
					if (!isFrame || root.clientHeight + 10 < rootScrollHeight) {
						return setCache(elems, document.body); // scrolling root in WebKit
					}
				} else if (el.clientHeight + 10 < el.scrollHeight) {
					overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
					if (overflow === 'scroll' || overflow === 'auto') {
						return setCache(elems, el);
					}
				}
			} while (el = el.parentNode);
		}


    /***********************************************
     * HELPERS
     ***********************************************/

		function addEvent(type, fn, bubble) {
			window.addEventListener(type, fn, (bubble || false));
		}

		function removeEvent(type, fn, bubble) {
			window.removeEventListener(type, fn, (bubble || false));
		}

		function isNodeName(el, tag) {
			return (el.nodeName || '').toLowerCase() === tag.toLowerCase();
		}

		function directionCheck(x, y) {
			x = (x > 0) ? 1 : -1;
			y = (y > 0) ? 1 : -1;
			if (direction.x !== x || direction.y !== y) {
				direction.x = x;
				direction.y = y;
				que = [];
				lastScroll = 0;
			}
		}

		var deltaBufferTimer;

		function isTouchpad(deltaY) {
			if (!deltaY) {
				return;
			}
			deltaY = Math.abs(deltaY);
			deltaBuffer.push(deltaY);
			deltaBuffer.shift();
			clearTimeout(deltaBufferTimer);
			var allDivisable = (isDivisible(deltaBuffer[0], 120) &&
            isDivisible(deltaBuffer[1], 120) &&
            isDivisible(deltaBuffer[2], 120));
			return !allDivisable;
		}

		function isDivisible(n, divisor) {
			return (Math.floor(n / divisor) === n / divisor);
		}

		var requestFrame = (function() {
			return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(callback, element, delay) {
	window.setTimeout(callback, delay || (1000 / 60));
};
		})();

		function resetOverscroll() {
			overscrollElement = document.querySelector(options.overscrollSelector);
			overscrollElement.style.transition = 'transform 100ms';
			overscrollElement.style.minHeight = '100%';
		}

		function debounce(fn, delay) {
			var timer = null;
			return function() {
				var context = this,
					args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		}

		function deepExtend(destination, source) {
			for (var property in source) {
				if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					arguments.callee(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
			return destination;
		}

		function normaliseDelta(eventDetail, wheelDeltaY) {
			var d = eventDetail,
				w = wheelDeltaY,
				n = 225,
				n1 = n - 1;

        // Normalize delta
			d = d ? w && (f = w / d) ? d / f : -d / 1.35 : w / 120;

        // Quadratic scale if |d| > 1
			d = d < 1 ? d < -1 ? (-Math.pow(d, 2) - n1) / n : d : (Math.pow(d, 2) + n1) / n;

        // Delta *should* not be greater than 2...
			return (Math.min(Math.max(d / 2, -1), 1)) * 2;
		}


    /***********************************************
     * PULSE
     ***********************************************/

    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
		function _pulse(x, touchpad) {
			var val, start, expx;

        // test
			x = x * options.pulseScale;

			if (x < 1) { // acceleartion
				val = x - (1 - Math.exp(-x));

			} else { // tail
            // the previous animation ended here:
				start = Math.exp(-1);

            // simple viscous drag
				x -= 1;
				expx = 1 - Math.exp(-x);
				val = start + (expx * (1 - start));
			}

			return val * options.pulseNormalize;
		}

		function pulse(x, touchpad) {
			if (x >= 1) {
				return 1;
			}

			if (x <= 0) {
				return 0;
			}

			if (options.pulseNormalize === 1) {
				options.pulseNormalize /= _pulse(1, touchpad);
			}

			return _pulse(x);
		}

		var isChrome = /chrome/i.test(window.navigator.userAgent);
		var wheelEvent = null;
		if ('onwheel' in document.createElement('div')) {
			wheelEvent = 'wheel';
		} else if ('onmousewheel' in document.createElement('div')) {
			wheelEvent = 'mousewheel';
		}

		if (wheelEvent && isChrome) {
			addEvent(wheelEvent, wheel);
			addEvent('mousedown', mousedown);
			addEvent('load', init);
		}

		if (options.overscroll) {
			addEvent('resize', resize);
			addEvent('orientationchange', resize);
		}

	})();


})

