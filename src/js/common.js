window.onload = function() {
	if($('video').length){
		$('video').get(0).play();
	}
};


function isMobile()	{
    return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}


document.addEventListener("DOMContentLoaded", function() {


	var docWindow = $(window),
		vHeight = docWindow.height(),
		mainScreen = $('#main-screen'),
		headerMenu = $('#header-mainwrap'),
		videoWrapper = $('#main-video-wrapper'),
		screenWrapperHeight = $('#main-screen-wrapper').height(),
		burger = $('#main-burger'),
		secMenu = $('#header-mainwrap .header-menu-modal'),
		screenLinks = $('#main-screen .screen-links-wrapper'),
		mainTitle = $('#title-wrapper'),
		mobile = isMobile(),
		screenLinksHeight = screenLinks.height(),
		$fullPage = $('#fullpage');

	// Video append if not mobile
	if(!isMobile()){
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video id="#video" preload loop><source src="'+videoWrapper.data('src')+'" type="video/mp4"></video></div></div>')
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
	$('#main-screen .screen-link-text').on('mouseenter', function(){
		if(!mainTitle.hasClass('activated')){
			mainTitle.addClass('activated')
		}
		mainTitle.addClass('active')
	});
	$('#main-screen .screen-link-text').on('mouseleave', function(){
		mainTitle.removeClass('active')
	});


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
		var $parallax = $('#parallax');

			parallaxFieldViewTop = $parallax.offset().top - vHeight
			parallaxFieldViewBottom =  $parallax.offset().top + $parallax.height()
			parallaxFieldView = parallaxFieldViewBottom - parallaxFieldViewTop

		function scrollParallax(scrollPos){
			console.log()
			if( scrollPos >= parallaxFieldViewTop && scrollPos <= parallaxFieldViewBottom){
				$parallax.css('background-position', '50% ' + (-((scrollPos - parallaxFieldViewTop)-(parallaxFieldView/2))/2) + 'px')
			}
		}
	}


	// docWindow.on('resize', function(){
	// 	console.log('Height '+docFunctions.findHeight())
	// });


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
	var elemsInView = [],
		isPaused = false,
		$brands = $('#brands')
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
					};

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
							};
						};

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


	// Scheme rotator and activator
	var ell = 1,
		$schemeButton = $('#scheme .scheme-button'),
		$schemeSlider = $('#scheme-slider'),
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
		$schemeButton.eq(ell-1).trigger('click')
		console.log(ell)
	})


	if($('.left_scroll-container').length){


        var scrolling = false,
        	contentSections = $('.block-section'),
            verticalNavigation = $('.left_scroll_pagin-wrap'),
            navigationItems = verticalNavigation.find('.left_scroll-item');

            $(window).on('scroll', checkScroll);

            function checkScroll() {
                if( !scrolling ) {
                    scrolling = true;
                    (!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
                }
            }

            verticalNavigation.on('click','.left_scroll-item',function(event){
                event.preventDefault();
                smoothScroll($(this));
                verticalNavigation.removeClass('open');
            });

            function updateSections() {
                var halfWindowHeight = $(window).height()/2,
                    scrollTop = $(window).scrollTop();
                contentSections.each(function(){
                    var section = $(this),
                        sectionId = section.attr('id'),
                        count = section.data('count'),
                        trg = section.data('target');
                        navigationItem = navigationItems.filter("[data-target=" + trg + "]");
                    ( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.outerHeight() - halfWindowHeight > scrollTop) )
                        ? navigationItem.addClass('active')
                        : navigationItem.removeClass('active');
                });
                scrolling = false;
            }

    function smoothScroll(target) {
        var data = target.data('target');
        var elem = $('.' + data);

       $('body,html').animate(
            {'scrollTop':elem.offset().top},
            500
        );
    }

}


})



/*var ctx = document.getElementById("index-chart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    data: {
	        labels: ["Корма и компоненты", "Мясо птицы", "Мясо-колбасные изделия", "Молоко"],
	        datasets: [{
	            label: '# of Votes',
	            data: [100, 90, 80, 70],
	            backgroundColor: [
	                'rgba(86, 182, 34, 1)',
	                'rgba(86, 182, 34, 0.8)',
	                'rgba(86, 182, 34, 0.6)',
	                'rgba(86, 182, 34, 0.4)'
	            ],
	            hoverBackgroundColor: '#0056b8'
	        }]
	    },
	    options: {
	    	layout: {
	            padding: {
	                left: 0,
	                right: 0,
	                top: 0,
	                bottom: 0
	            }
	        },
	        legend: {
	        	display: false
	        },
	        scales: {
	        	pointLabels :{
		           display: false
		        },
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                },
	                gridLines: {
                    	display: false
                	},
                	categoryPercentage: 1.0,
           			barPercentage: 1.0
	            }],
	            xAxes: [{
		            stacked: true,
		            gridLines: {
	                   	display: false
	                },
	                categoryPercentage: 1.0,
            		barPercentage: 1.0
			    }]
	        },
	    }
	});*/