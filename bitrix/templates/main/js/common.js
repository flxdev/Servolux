window.onload = function() {
	$('video').get(0).play();
};


document.addEventListener("DOMContentLoaded", function() {

	if(!isMobile()){
		var videoWrapper = $('.main-video-wrapper');
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video id="#video" preload loop><source src="'+videoWrapper.data('src')+'" type="video/mp4"></video></div></div>')
		videoWrapper.find('.video-poster').remove()
	}

	var docWindow = $(window),
		vHeight = docWindow.height(),
		mainScreen = $('.main-screen'),
		headerMenu = $('.header-mainwrap'),
		videoWrapper = $('.main-video-wrapper'),
		burger = $('#main-burger'),
		secMenu = $('.header-menu-modal'),
		screenLinks = $('.screen-links-wrapper'),
		logo = $('.logo'),
		mainTitle = $('.title-wrapper'),
		mobile = isMobile(),
		screenLinksHeight = screenLinks.height();



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

	//main-screen-title-scale
	$('.screen-link-text').on('mouseenter', function(){
		if(!mainTitle.hasClass('activated')){
			mainTitle.addClass('activated')
		}
		mainTitle.addClass('active')
	});
	$('.screen-link-text').on('mouseleave', function(){
		mainTitle.removeClass('active')
	});


	var docFunctions = {
		findHeight: function(){
			return docWindow.height()
		},
		findScroll: function(){
			return docWindow.scrollTop()
		}
	}


	function scrollMainScreen(scrollPos){
		var i = (140-((scrollPos/vHeight)*50))/100;
		videoWrapper.css('opacity', (vHeight/scrollPos)/3).find('video').css('transform', 'translate(-50%, -50%) scale('+ (i<=1 ? 1 : i) +')');
		if(scrollPos>200 && !screenLinks.hasClass('hiddened')){
			screenLinks.fadeOut().addClass('hiddened')
		}
		else if(scrollPos<200 && screenLinks.hasClass('hiddened')){
			screenLinks.fadeIn().removeClass('hiddened')
		}
	}


	function scrollMainTitle(scrollPos){
		mainTitle.css('margin-top', -(scrollPos)/1.5)
	}


	docWindow.on('resize', function(){
		//console.log('Height '+docFunctions.findHeight())
	});


	docWindow.scroll(function (event) {

		var scrollPos = docWindow.scrollTop();

		if(scrollPos > screenLinksHeight) {

			headerMenu.addClass('sticked animated fadeInDownFast').css('animation-delay', '0')
			return;
		}


    	if(!mobile){
    		scrollMainScreen(scrollPos);
    		scrollMainTitle(scrollPos);
    	}

		headerMenu.removeClass('sticked animated fadeInDown')

	});

	if($(window).width() >= 1024){
		inView.offset(100)
		inView('.animateThis').on('enter', function(el){
	    	$(el).addClass('animated ' + $(el).data('anim'))
	    });
	}

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

	$('.chart-bar').each(function(){
		$(this).css('width', $(this).data('scale')+'%')
	})

	var elemsInView = [],
		isPaused = false;

	$('.brand-anim-block').each(function(el){
		var _this = $(this),
			rand = Math.floor(Math.random() * (15000 - 8000)) + 8000,
			brandCounter = 0;
		if(brandCounter < 6){
			var elem = Math.floor(Math.random() * brandElems.brands.length)
			while(elemsInView[elem] == true){
				elem = Math.floor(Math.random() * brandElems.brands.length)
			}
			elemsInView[elem] = true;
			_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>')
			brandCounter++;
		}
		if(!mobile){
			setInterval( function(){
				if(!isPaused){
					while(elemsInView[elem]){
						elem = Math.floor(Math.random() * brandElems.brands.length);
					}
					_this.append('<a href="' + brandElems.brands[elem].href + '"><img src="' + brandElems.brands[elem].src + '" alt="brand"></a>');
					_this.children('a:nth-of-type(2)').addClass('animated slideBrand')
					_this.children('a:first-of-type').addClass('animated slideBrandOut')
					elemsInView[elem] = true;
					setTimeout(function(){
						for(var key in brandElems.brands){
							if(brandElems.brands[key].src == _this.children('a:first-of-type').children('img').attr('src')){
								elemsInView[key] = false;
							}
						}
						_this.children('a').removeClass('animated slideBrand');
						_this.children('a:first-of-type').remove();
					}, 1000);

				}
			}, rand)
		}
	})

	$('.brands').on('mouseenter', function(){
		isPaused = true
	})
	$('.brands').on('mouseleave', function(){
		isPaused = false
	})



	var ell = 0,
		isSchemePaused = false

	$('.scheme-button').on('click', function(elem){
		var _self = $(this);
		if(!_self.hasClass('active')){
			$('.scheme-button').each(function(){
				$(this).removeClass('active')
			})
			$('.scheme-slider__slide').each(function(){
				$(this).removeClass('active')
			})
			_self.addClass('active')
			var slide = $('.scheme-slider').children(':nth-of-type(' + _self.data('slide') + ')');
			$('.scheme-slider').children('active').removeClass('active')
			slide.addClass('animated scaleIn active')
			setTimeout(function(){
				slide.removeClass('animated scaleIn')
			}, 1000)
			ell = _self.data('slide')
			$('svg#scheme .scheme-menu').css('transform', 'rotate(' + (((360/8)*(- _self.data('slide'))) + 45) + 'deg)')
			$('svg#scheme .scheme-menu g.icon').css('transform', 'rotate(' + (((360/8)*(_self.data('slide')))-45) + 'deg)')
		}
	})

	setInterval(function(){
		if(!isSchemePaused){
			$('.scheme-button').eq(ell).trigger('click')
			ell ++;

			if(ell > 8){
				ell = 0
			}
		}

	}, 10000)

	$('.scheme-button').on('mouseenter', function(){
		isSchemePaused = true
	})
	$('.scheme-button').on('mouseleave', function(){
		isSchemePaused = false
	})


})

function isMobile()	{
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}
