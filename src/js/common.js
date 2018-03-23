//Helpers functions
function asyncro(u, c) {
	let d = document, t = 'script',
		o = d.createElement(t),
		s = d.getElementsByTagName(t)[0];
	o.src = u;
	if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
	s.parentNode.insertBefore(o, s);
}
function isMobile () {
	return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent))
}
function lazyImage () {
	let arr = document.querySelectorAll('.js-image')
	let images = []
	for (let i = 0; i < arr.length; i++) {
		images.push(arr[i])
	}
	let config = {
		rootMargin: '0px 0px',
		threshold: 0.01
	}

	let imageCount = images.length
	let observer = void 0
	if (!('IntersectionObserver' in window)) {
		for (let i = 0; i < imageCount; i++) {
			preloadImage(images[i])
		}
	} else {
		observer = new IntersectionObserver(onIntersection, config)
		for (let i = 0; i < imageCount; i++) {
			if (images[i].classList.contains('js-image-handled')) {
				return
			}
			observer.observe(images[i])
		}
	}

	function fetchImage (url) {
		return new Promise(function (resolve, reject) {
			let image = new Image()
			image.src = url
			image.onload = resolve
			image.onerror = reject
		})
	}

	function preloadImage (image) {
		let src = image.dataset.src
		if (!src) {
			return
		}
		return fetchImage(src).then(function () {
			applyImage(image, src)
		})
	}

	function loadImagesImmediately (images) {
		for (let i = 0; i < images.length; i++) {
			return preloadImage(images[i])
		}
	}

	function disconnect () {
		if (!observer) {
			return
		}
		observer.disconnect()
	}

	function onIntersection (entries) {
		if (imageCount === 0) {
			observer.disconnect()
		}
		entries.forEach(function (entry) {
			if (entry.intersectionRatio > 0) {
				imageCount--
				observer.unobserve(entry.target)
				preloadImage(entry.target)
			}
		})
	}

	function applyImage (img, src) {
		img.classList.add('js-image-handled')
		if (img.classList.contains('bg')) {
			img.style.backgroundImage = 'url(' + src + ')'
		} else {
			img.src = src
		}
		img.classList.add('fade-in')
	}
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
	let fromTop = pageYOffset + 120,
		cur = window.DOM.scrollItems.map(function (el) {
			if (window.DOM.scrollItems[el].offset().top < fromTop)
				return window.DOM.scrollItems[el]
		})
	cur = cur[cur.length - 1]
	let id = cur && cur.length ? cur[0].id : ''
	window.DOM.menuItems
		.siblings().removeClass('active')
		.filter('[href=\'#' + id + '\']').addClass('active')
}
function toggleMenu () {
	window.DOM.headerMenuWrapper.classList.toggle('active');
	window.DOM.headerModalWrapper.classList.toggle('active');
	window.DOM.html.classList.toggle('menu-is-locked');
}
// Main screen fade out and video zoom out on scroll
function scrollMainScreen (scrollPos) {

	let oneProcentOfTop = (scrollPos / (window.DOM.screenWrapperHeight/100) / 100).toFixed(4);
	let i = 1 + (1 - oneProcentOfTop)/10;
	let opacityScroll = 1 - oneProcentOfTop;

	window.DOM.videoWrapper.css('opacity', opacityScroll);
	window.DOM.firstScreenFading.css('transform', 'translate(-50%, -50%) scale(' + i + ')');

	window.DOM.screenLinks.forEach((item) => {
		if (scrollPos > 150 && !item.classList.contains('hiddened')) {
			$(item).fadeOut().addClass('hiddened')
		}
		else if (scrollPos < 150 && item.classList.contains('hiddened')) {
			$(item).fadeIn().removeClass('hiddened')
		}
	})
}
// Main title fade out on scroll
function scrollMainTitle (scrollPos) {
	window.DOM.mainScreenTitle.style.transform = 'translatey(' + Math.round(-(scrollPos) / 2) + 'px)'
}
let toggleVideo = () => {};
let scrollHeader = () => {};

//Map
function initMap (mapArg, arrayOfPins, styleMap, manyMaps = false, autoFoundMarkers = false) {
	let element = mapArg,
		zoomIn = parseFloat(element.getAttribute('data-zoom')),
		latcord = parseFloat(element.getAttribute('data-lat')),
		loncord = parseFloat(element.getAttribute('data-lon')),
		imgpath = element.getAttribute('data-icon'),
		centercords = {lat: latcord, lng: loncord};

	if (manyMaps) {
		latcord = arrayOfPins.lat;
		loncord = arrayOfPins.lng;
		centercords = {lat: latcord, lng: loncord};
	}

	let bounds = new google.maps.LatLngBounds();

	let map = new google.maps.Map(element, {
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

	let markerIcon = {
		url: '',
		scaledSize: new google.maps.Size(16, 26),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(8, 26)
	};

	const markerMaker = (obj) => {

		let labelTemplate = `
		<div class="map-label-wrapper">
				<img src="${imgpath}"/>
				<p class="map-label-text">${obj.name}</p>
		</div>`

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

	if(manyMaps){
		let obj = arrayOfPins;
		let marker = markerMaker(obj)
	}

	if ($(element).hasClass('map-elem-near')) {
		let markers = []

		for (let i = 0; i < arrayOfPins.length; i++) {
			let obj = arrayOfPins[i];

			let marker = markerMaker(obj)

			marker.fromTop = 0;

			bounds.extend(marker.position);

			markers.push(marker);

			google.maps.event.addListener(marker, 'click', function () {
				hidemarkers(markers);
				this.set('labelClass', 'labels place_open');
			});

			google.maps.event.addListener(map, 'click', function () {
				hidemarkers(markers);
			});
		} // end loop

		function hidemarkers (array) {
			for (let i = 0; i < array.length; i++) {
				let cur = array[i];
				cur.set('labelClass', 'labels')
			}
		}
	}
	if(autoFoundMarkers){
		map.fitBounds(bounds);
	}
}
const styleMapBig = [
	{
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
	}
	];
const styleMapContacts = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#999999"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"weight":"1.07"},{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"weight":"0.56"},{"visibility":"off"},{"saturation":"-41"},{"lightness":"-25"},{"gamma":"5.67"}]},{"featureType":"administrative.country","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"60"},{"gamma":"1.00"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"weight":"1.48"}]},{"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-88"},{"gamma":"0.00"},{"hue":"#a3ff00"},{"lightness":"46"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"gamma":"0.5"},{"hue":"#5aff00"},{"lightness":"0"},{"saturation":"19"},{"weight":"0.01"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e2e2e2"},{"lightness":"20"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"hue":"#ff0000"},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"saturation":"-28"},{"gamma":"5.59"},{"weight":"0.01"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"saturation":"36"},{"lightness":"-32"},{"color":"#bbbbbb"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"64"},{"weight":"1.47"},{"gamma":"0.79"}]}]

//Classes
class Parallax {
	constructor (item){
		this.image = item
		this.$image = $(this.image)
		this.parent = this.$image.parent()
		this.windowHeight = $(window).height()
		this.imageHeight = this.$image.height();
		this.imageStart = this.$image.offset().top;
		this.parentHeight = this.parent.height()
		this.parentStart = this.parent.offset().top
		this.parentEnd = this.parentStart + this.parentHeight
		this.safeScrollHeight = this.parentHeight - this.imageHeight
		$(window).on('scroll', () => {
			let scrollBottom = $(window).scrollTop() + this.windowHeight/1.5
			if (scrollBottom >= this.parentStart && scrollBottom <= this.parentEnd){
				setTimeout(() => {
					this.scrollPosition(scrollBottom, this.$image)
				}, 1)
			}
		})
	}
	scrollPosition(scrollBottom, image) {
		image.css('transform', 'translateY(' + ((this.safeScrollHeight/100) * (scrollBottom - this.parentStart)/(this.parentHeight/100)) + 'px) translateX(-50%)')
	}
}
class FormFocus {
	constructor (elem) {
		this.elem = elem;
		this.$elem = $(elem);
		$.validate({
			form: this.$elem,
			modules: 'html5, security, file',
			lang: 'ru',
			addValidClassOnAll: true,
			validateOnBlur: true, // disable validation when input looses focus
			errorMessagePosition: 'bottom',
			scrollToTopOnError: false,
			onSuccess: function onSuccess ($form) {
				$.ajax({
					type: 'POST',
					data: $form.serialize(),
					success: function (data) {
						let modalSuccess = $('#callbackSuccess').remodal();
						modalSuccess.open()
					}
				});
				return false // Will stop the submission of the form
			}
		});

		this.$elem.find('button[type=submit]').on('click', (el) => {
			el.preventDefault();
			this.$elem.submit();
			return false
		});

		this._dropzone = this.$elem.find('.dropzone');

		if(this._dropzone.length){
			this._dropzone.dropzone({
				url: '/',
				paramName: 'file',
				maxFilesize: 10,
				uploadMultiple: true,
				previewsContainer: this.elem.querySelector('.dz-show'),
				createImageThumbnails: false,
				dictDefaultMessage: `<div class="dz-block">
						<div class="dz-block__button">
							<img class="dz-block__icon" src="./img/6-2/attach.svg">
							Прикрепить файл
						</div>
					</div>`,
				dictFileTooBig: 'Файл слишком большой',
				dictResponseError: 'Сервер ответил с ошибкой',
				dictInvalidFileType: 'Неверный тип файла',
				acceptedFiles: '.doc,.docx,.pdf,.txt,image/*',
				previewTemplate: this.elem.parentNode.querySelector('.tpl').innerHTML,
				init: function () {
					this.on("removedfile", function (file) {
						$.ajax({
							type: "POST",
							url: "/",
							data: "del=" + file['name'] + '&action=FILE',
							dataType: "html"
						});
					});
					this.on("error", function () {
						$(this).find('.dz-message_waring').addClass('dis-error');
						$(this).find('.dz-message_error').removeClass('dis-error');
					});
					this.on('resetFiles', function () {
						if (this.files.length !== 0) {
							for (let i = 0; i < this.files.length; i++) {
								this.files[i].previewElement.remove();
							}
							this.files.length = 0;
						}
					});
				},
				sending: function (file, xhr, formData) {
					formData.append('action', 'FILE');
				}
			})
		}

	}

	//remove all files from drop zone
	clearDropzone () {
		Dropzone.forElement($(this.$elem)[0]).removeAllFiles()
	}
}

//Initials
let initials = {
	initAnchors: (anchors) => {
		anchors.forEach((item) => {
			let _href = item.getAttribute("href");
			if(_href.indexOf("#") !== -1) {
				let _hrefTo = document.getElementById(_href.slice(1)) || false;
				if(_hrefTo && !_hrefTo.classList.contains('remodal')){
					item.addEventListener('click', (e) => {
						e.preventDefault();
						$('html, body').animate({
							scrollTop: _hrefTo.getBoundingClientRect().top + pageYOffset - 100
						}, 1000)
					})
				}
			}
		})
	},
	passiveOrNot: () => {
		return window.DOM.passiveSupported ? { passive: true } : false;
	},
	checkPassive: () => {
		try {
			let options = Object.defineProperty({}, 'passive', {
				get: () => {
					window.DOM.passiveSupported = true;
				}
			});
			window.addEventListener('test', null, options);
		} catch(err) {}
	}
};

document.addEventListener('DOMContentLoaded', () => {
	window.DOM = {
		hrefs: document.querySelectorAll('a'),
		wWidth: $(window).width(),
		body: document.body,
		html: document.getElementsByTagName('html')[0],
		headerMenuWrapper: document.getElementById('header-menu-wrapper') || false,
		headerModalWrapper: document.getElementById('header-modal-wrapper') || false,
		videoWrapper: $('#main-first-screen-fading-wrapper') || false,
		firstScreenFading: $('#main-first-screen-fading-wrapper').find('.firstScreenFading') || false,
		screenWrapperHeight: document.getElementById('main-screen-wrapper').offsetHeight,
		burger: document.getElementById('header-burger') || false,
		screenLinks: $('#main-screen .screen-links-wrapper') || false,
		mainTitleWrapperInner: document.getElementById('title-wrapper-inner') || false,
		mainScreenTitle: document.getElementById('main-screen-title') || false,
		modal: $('#modal'),
		mobile: isMobile(),
		asideMenu: document.getElementById('aside-menu') ? true : false,
		hasParallax: document.getElementById('parallax') ? true : false,
		formFocus: $('.formFocus'),
		screenLinks: document.querySelectorAll('.screen-link-text') || false,
		chartBar: $('#index-chart .chart-bar'),
		$maps: $('.map'),
		$map: $('#map'),
		$brandContacts: $('#brand-contacts'),
		activeHeader: false,
		jobsTags: document.querySelectorAll('.jobs-tags-title-wrapper') || false,
	};

	initials.checkPassive();

	// InView checker
	if ($(window).width() >= 992) {
		inView.offset(50);
		inView('.animateThis').on('enter', function (el) {
			$(el).addClass('animated ' + $(el).data('anim'))
		})
	}
	//Prevent default scrollTo
	window.scrollTo = function( x,y ) {
		return true;
	};

	// Scroll triggers
	window.addEventListener('scroll', (event) => {
		let scrollPos = pageYOffset;

		if (scrollPos >= window.DOM.screenWrapperHeight) {
			if(!window.DOM.activeHeader){
				window.DOM.activeHeader = true;
				window.DOM.headerMenuWrapper.classList.add('sticked', 'animated', 'fadeInDownFast');
				window.DOM.headerMenuWrapper.style.animationDelay = '0';
				toggleVideo(window.DOM.activeHeader);
			}
			if (!window.DOM.mobile && window.DOM.asideMenu) {
				changeAsideMenu();
			}
			return;
		}

		if(window.DOM.activeHeader){
			window.DOM.activeHeader = false;
			window.DOM.headerMenuWrapper.classList.remove('sticked', 'animated', 'fadeInDownFast');
			toggleVideo(window.DOM.activeHeader);
		}

		scrollHeader(scrollPos);
	}, initials.passiveOrNot());

	if(!window.DOM.mobile){
		scrollHeader = (scrollPos) => {
			scrollMainScreen(scrollPos);
			scrollMainTitle(scrollPos);
		}
	}

	window.dispatchEvent( new Event('scroll') );

	//Ramodal close hash delete
	$(document).on('closed', function () {
		let scrollV, scrollH, loc = window.location;
		if ('pushState' in history)
			history.pushState('', document.title, loc.pathname + loc.search);
		else {
			// Prevent scrolling by storing the page's current scroll offset
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;

			loc.hash = '';

			// Restore the scroll offset, should be flicker free
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
	});

});

//LOADED
window.onload = function () {

	if (window.DOM.$map.length) {
			initMap(document.getElementById('map'), arrayOfPins, window.DOM.$brandContacts.length ? styleMapContacts : styleMapBig, false, window.DOM.$brandContacts.length)
	}
	else if (window.DOM.$maps.length) {
		window.DOM.$maps.filter(function (index) {
			initMap(this, arrayOfPins[index], styleMapContacts, true)
		})
	};

	// Video append if not mobile
	if (!window.DOM.mobile && window.DOM.videoWrapper.data('src')) {
		window.DOM.videoWrapper.append('<div class="homepage-hero-module"><div class="video-container"><div class="filter"></div><video class="firstScreenFading" id="main-video" autoplay muted loop><source src="' + window.DOM.videoWrapper.data('src') + '" type="video/mp4"></video></div></div>');
		window.DOM.firstScreenFading = window.DOM.videoWrapper.find('.firstScreenFading');
		window.DOM.mainVideo = $('#main-video');
		toggleVideo = (active) => {
			active ? window.DOM.mainVideo.get(0).pause() : window.DOM.mainVideo.get(0).play();
		}
	}

	//Change header in modals depend on open buttons text
	document.querySelectorAll('.callback-button').forEach((item) => {
		item.addEventListener('click', () => {
			let buttonText = item.textContent;
			$('#modal-title').text(buttonText)
		})
	});

	//Menu
	if(window.DOM.burger){
		window.DOM.burger.addEventListener('click', () => {
			toggleMenu()
		})
	}
	if(window.DOM.headerModalWrapper){
		window.DOM.headerModalWrapper.querySelectorAll('.menu-columns ul li a').forEach((item) =>{
			item.addEventListener('click', function () {
				toggleMenu();
			})
		});
	}

	//Modals in products
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
	if (window.DOM.screenLinks) {
		window.DOM.screenLinks.forEach((item) => {
			item.addEventListener('mouseenter', function () {
				window.DOM.mainTitleWrapperInner.classList.add('active');
			});
			item.addEventListener('mouseleave', function () {
				window.DOM.mainTitleWrapperInner.classList.remove('active');
			});
		});
	};

	if (window.DOM.hasParallax) {

		let p = new Parallax('.rellax')

	}

	// Chart bar width maker
	if(window.DOM.chartBar.length){
		window.DOM.chartBar.filter(function () {
			$(this).css('width', $(this).data('scale') + '%')
		})
	}

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
			if (!window.DOM.mobile) {
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
			slideDeg = 45

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

	if ($('.sticky-block').length && $(window).width() > 992) {
		let $stickyBlock = $('.sticky-block')
		$stickyBlock.filter(function () {
			let stickyBlockOffsetTop = $(this).data('offsettop')
			$(this).stick_in_parent({offset_top: stickyBlockOffsetTop})

		})

	}

	if(window.DOM.hrefs.length){
		initials.initAnchors(window.DOM.hrefs);
	}

	if (window.DOM.asideMenu) {
		let asideItems = 0;
		let $asideMenu = $('#aside-menu');
		let topMenu = $asideMenu.find('.aside-menu-wrapper');
		$('.aside-menu-item').filter(function () {
			let _asideItem = $(this),
				itemId = _asideItem.attr('id');
			topMenu.append('<a href="#' + itemId + '"><div class="aside-item-inner"><p>' + _asideItem.data('aside') + '</p></div></a>')
			asideItems++;
		});

		if (asideItems <= 0) {
			$asideMenu.remove();
			window.DOM.asideMenu = false;
		}
		else {
			window.DOM.menuItems = topMenu.find('a');
			window.DOM.scrollItems = window.DOM.menuItems.map(function () {
				let item = $($(this).attr('href'));
				if (item.length) { return item }
			});

			$('#aside-menu').stick_in_parent();
			initials.initAnchors(document.getElementById('aside-menu').querySelectorAll('a'))//animateAsideMenu()
		}
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
		window.Promise = Promise
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
			$countryAsideMenyHrefs = $('.country-aside-menu .href')

		controllButtons.on('click', function () {
			const contBlock = $(this).data('block')
			$(this).addClass('active').siblings().removeClass('active')
			$(contactBlocks[contBlock]).addClass('active').siblings().removeClass('active')
		})

		$countryAsideMenyHrefs.on('click', function () {
			const contCountries = $(this).data('countries'),
				contBlock = $(this).data('block')

			$(this).addClass('active').siblings().removeClass('active')
			$('#countryBlock' + contBlock + ' .country-block:nth-of-type(' + contCountries + ')').addClass('active').siblings().removeClass('active')
		})

	}

	if (window.DOM.jobsTags) {
		let tg = window.DOM.wWidth <= 1024;
		window.DOM.jobsTags.forEach((item) => {
			item.addEventListener('click', () => {
				item.classList.toggle('deactive');
				item.nextElementSibling.classList.toggle('deactive');
			});

			if(tg){
				item.classList.toggle('deactive');
				item.nextElementSibling.classList.toggle('deactive');
			}
		});
	}

	if (window.DOM.formFocus.length) {
		window.DOM.formFocus.filter(function () {
			let _this = $(this)
			_this.find('label').filter(function () {
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

		if(typeof $.validate === 'function') {
			let formsFocusArr = [];
			document.querySelectorAll('.formFocus').forEach((item) => {
				formsFocusArr.push(new FormFocus(item));
			})
		}
	}

	if ($('.graphic-line').length) {
		function initGraphLine () {
			$('.graphic-line').filter(function () {
				let thisChart = chartData[$(this).data('t')];
				let chartButton = $('.chart-controls .button'),
					chartCurrent = 0,
					chartParams = {
						data: thisChart[chartCurrent].values,
						animate_on_load: true,
						width: 600,
						height: 500,
						full_width: true,
						full_height: true,
						left: 100,
						y_extended_ticks: true,
						x_extended_ticks: true,
						point_size: 4,
						target: '#' + $(this).attr('id'),
						x_accessor: 'date',
						y_accessor: 'value',
						y_label: thisChart[chartCurrent].title,
						color_accessor: 'v',
						color_type: 'category',
						mouseover: function (d, i) {
							d3.select('#company-chart svg .mg-active-datapoint')
								.text('В ' + (i + 2011) + ' году произведено ' + d.value + ' тыс.тонн')
						}
					}

				chartButton.on('click', function () {
					var _thisChartButton = $(this)
					if (!_thisChartButton.hasClass('active')) {
						chartCurrent = _thisChartButton.data('chart')
					}
					chartParams.data = thisChart[chartCurrent].values
					chartParams.y_label = thisChart[chartCurrent].title
					// change button state
					_thisChartButton.addClass('active').siblings().removeClass('active')
					// update data
					delete chartParams.xax_format
					MG.data_graphic(chartParams)
				});
				MG.data_graphic(chartParams)
			})
		}

		asyncro('https://d3js.org/d3.v4.min.js', function () {
			asyncro('https://rawgit.com/mozilla/metrics-graphics/7b2f88189da8fcba055a4e9af75fe19b837144eb/dist/metricsgraphics.min.js', function () {
				initGraphLine();
			})
		})

	};

	if ($('.graphic-tab').length) {

		function initGraphTab() {
			$('.graphic-tab').filter(function () {
				let thisChart = barChartData[$(this).data('t')];
				let barNumber = 0,
					chartOptions = {
						type: 'bar',
						data: thisChart[barNumber],
						options: {
							title: {
								display: true,
								text: thisChart[barNumber].title
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
										callback: function (value) {
											return value + " " + thisChart[barNumber].value;
										}
									}
								}]
							}
						}
					}

				let ctx = document.getElementById($(this).attr('id') + '').getContext("2d");
				window.myBar = new Chart(ctx, chartOptions);

				$('#chart-control .button').on('click', function () {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					barNumber = $(this).data('chart')
					chartOptions.data = thisChart[barNumber]
					chartOptions.options.title.text = thisChart[barNumber].title
					chartOptions.options.scales.yAxes[0].ticks.callback = function (value) {return value + " " + thisChart[barNumber].value;}
					myBar.update()
				})
			})
		}

		asyncro('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js', function () {
			initGraphTab();
		})

	};

	if ($('#dates').length) {
		$('#dates-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			focusOnSelect: false,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: false,
						infinite: false
					}
				},
				{
					breakpoint: 750,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
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
			maxHeight = $verticalSlider.height()
		$verticalSlider.find('.img-wrapper').height(maxHeight)

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
};
