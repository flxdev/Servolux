$(window).on('load', function() {
	if(!isMobile()){
		var videoWrapper = $('.main-video-wrapper');
		videoWrapper.find('.video-poster').remove()
		videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video autoplay preload loop><source src="'+videoWrapper.data('src')+'" type="video/mp4"></video></div></div>')
	}
});


document.addEventListener("DOMContentLoaded", function() {

	var docWindow = $(window),
		vHeight = docWindow.height(),
		mainScreen = $('.main-screen'),
		headerMenu = $('.header-mainwrap'),
		videoWrapper = $('.main-video-wrapper'),
		burger = $('#main-burger'),
		secMenu = $('.header-menu-modal'),
		screenLinks = $('.screen-links-wrapper'),
		logo = $('.logo'),
		mainTitle = $('.title-wrapper');


	//burger-menu
	burger.on('click', function(){
		headerMenu.toggleClass('active')
		if(isMobile()){
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

	function scrollMainScreen(){
		var scrollPos = docWindow.scrollTop(),
			i = (140-((scrollPos/vHeight)*50))/100;
		videoWrapper.css('opacity', (vHeight/scrollPos)/3).find('video').css('transform', 'translate(-50%, -50%) scale('+ (i<=1 ? 1 : i) +')');
		if(scrollPos>200 && !screenLinks.hasClass('hiddened')){
			screenLinks.fadeOut().addClass('hiddened')
		}
		if(scrollPos<200 && screenLinks.hasClass('hiddened')){
			screenLinks.fadeIn().removeClass('hiddened')
		}
		//mainScreen.css('opacity', ((vHeight/scrollPos)/40))
	}

	function scrollMainTitle(){
		mainTitle.css('margin-top', -(docWindow.scrollTop())/1.5)
	}

	docWindow.on('resize', function(){
		//console.log('Height '+docFunctions.findHeight())
	});

	docWindow.scroll(function (event) {
    	//console.log('Scroll '+docFunctions.findScroll())
    	if(!isMobile()){
    		scrollMainScreen();
    		scrollMainTitle();
    	}
    	if(docFunctions.findScroll()>=mainScreen.height()){
    		headerMenu.addClass('sticked')
    		if(headerMenu.hasClass('active')){
    			headerMenu.toggleClass('active')
    		}
    	}
    	if(docFunctions.findScroll()<=mainScreen.height()){
    		headerMenu.removeClass('sticked')
    	}
	});

	if($(window).width() >= 1024){
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

})

function isMobile()	{
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}