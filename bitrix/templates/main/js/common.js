window.onload = function() {
	if($('video').length){
		$('video').get(0).play();
	}
	setTimeout(function(){
		$('#title-wrapper').removeClass('animated fadeInDownMenu')
	}, 300)
};


function isMobile()	{
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}


document.addEventListener("DOMContentLoaded", function() {


	var docWindow = $(window),
		vHeight = docWindow.height(),
		headerMenu = $('#header-mainwrap'),
		videoWrapper = $('#main-video-wrapper'),
		screenWrapperHeight = $('#main-screen-wrapper').height(),
		burger = $('#main-burger'),
		screenLinks = $('#main-screen .screen-links-wrapper'),
		mainTitle = $('#title-wrapper'),
		mobile = isMobile();

	// Video append if not mobile
	if(!isMobile()){
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video id="#video" muted loop><source src="'+videoWrapper.data('src')+'" type="video/mp4"></video></div></div>')
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

		var i = (140-((scrollPos/vHeight)*50))/100;
		videoWrapper.css('opacity', (vHeight/scrollPos)/3).find('video').css('transform', 'translate(-50%, -50%) scale('+ (i<=1 ? 1 : i) +')');
		if(scrollPos>150 && !screenLinks.hasClass('hiddened')){
			screenLinks.fadeOut().addClass('hiddened')
		}
		else if(scrollPos<150 && screenLinks.hasClass('hiddened')){
			screenLinks.fadeIn().removeClass('hiddened')
		}
	}



	// Main title fade out on scroll
	function scrollMainTitle(scrollPos){
		mainTitle.css('margin-top', -(scrollPos)/1.5)
	}



	// PARALLAX event on scroll trigger
	if($('#parallax').length){
		var $parallax = $('#parallax'),
			$parallaxImg = $('#parallax .parallax-img img'),
			parallaxFieldViewTop = $parallax.offset().top - vHeight,
			parallaxFieldViewBottom = $parallax.offset().top + $parallax.height(),
			parallaxFieldView = parallaxFieldViewBottom - parallaxFieldViewTop;

		function scrollParallax(scrollPos){
			console.log()
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
		MG.data_graphic({
			//title: "Производство мяса птицы, тыс. тонн",
			data: chartData[0].values,
			animate_on_load: true,
			width: 600,
			height: 500,
			left: 100,
			y_extended_ticks: true,
			x_extended_ticks: true,
			target: '#company-chart',
			x_accessor: 'date',
			y_accessor: 'value',
			y_label: chartData[0].title,
			color_accessor: 'v',
        	color_type:'category',
        	mouseover: function(d, i) {
            // custom format the rollover text, show days
		var pf = d3.format('.0s');
		d3.select('#company-chart svg .mg-active-datapoint')
                .text('В ' + (i + 2011) + ' году произведено ' + d.value+' тыс.тонн');
        	},
		});
	}


})
