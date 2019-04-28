/*import libs*/
//= libs/libs.js


$(document).ready(function () {

	let sandwich = function () {
		$(document).on('click', '.catalog-nav__header', function () {
			let sandwich = $(this).find('.sandwich'),
			catalog = $(this).parent();
			sandwich.toggleClass('sandwich--active');
			catalog.toggleClass('catalog-nav--active');
		});

		if($(window).width() < 768) {
			$(document).on('click', '.sandwich', function () {
				$(this).toggleClass('sandwich--active');
				$('body').toggleClass('fixed');
				$('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
			});
		}

	};

	let popularCategoriesSlider = function () {
		if($(window).width() < 768) {
			$('.js-categories-prev').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: '.categories-prev__btn--prev',
				nextArrow: '.categories-prev__btn--next',
				adaptiveHeight: true,
				infinite: false,
				dots: true,
			}) 
		} 
	};

	let productPrevSlider = function () {
		let sliderCount = $('.product-slider__count'),
		prodSlider = $('.js-product-slider');

		prodSlider.on('init afterChange', function (event, slick, 
			currentSlide, nextSlide) {
				let i = (currentSlide ? currentSlide : 0) + 1;
				sliderCount.text('Страница ' + i + ' из ' + slick.slideCount);
			});
		
		prodSlider.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: '.products-prev-slider__nav-prev',
			nextArrow: '.products-prev-slider__nav-next',
			infinite: false,
			responsive: [
				{
					breakpoint: 1239,
					settings: {
						slidesToShow: 3,
						arrows: false,
						dots: true,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						arrows: true,
						dots: false,
					}
				},
			]
		});
	};


	let catalogNavClick = function () {
		if($(window).width() < 767) {
			$(document).on('click', '.catalog-nav__item', function () {
				$(this).addClass('catalog-nav__item--active');
				$(this).siblings().removeClass('catalog-nav__item--active');
			});
			$(document).on('click', '.catalog-subnav__header', function () {
				$('.catalog-subnav__block').removeClass('catalog-subnav__block--active');
				$(this).closest('.catalog-subnav__block').addClass('catalog-subnav__block--active');
			});
		}
	};

	let locationChoose = function () {
		$(document).on('click', '.location-question__btn', function () {
			let answer = $(this).data('location');
			$(this).closest('.location-question').hide();
			if(answer === 'no') {
				$(this).closest('.location__body').addClass('is-location-choose');
			}
		});
		$(document).on('click', '.location-choose__item, .location-choose__close', function () {
			$(this).closest('.location__body').removeClass('is-location-choose');
		});
		$(document).on('click', '.location__header', function () {
			$(this).siblings('.location__body').addClass('is-location-choose');
		});
	};

	let popupLink = function (){
		$('.js-popup-link').magnificPopup({
			showCloseBtn: false,
		});

		$(document).on('click', '.popup__close', function () {
			$.magnificPopup.close();
		});
	};

	let formValidate = function () {
		$('form').each(function () {
			$(this).on('submit', function () {
				$(this).validate({
					rules: {
						name: 'required',
						phone: 'required',
						password: 'required',
						"req-textarea": 'required'
					},
					messages: {
						name: 'Введите корректное имя',
						phone: 'Введите корректный номер',
						password: 'Введите корректный пароль',
						"req-textarea": 'Заполните поле'
					},
					errorPlacement: function (error, element) {
						element.attr("placeholder", error[0].outerText);
					}
				});
				if ($(this).valid()) {
					let wrap = $(this)[0].closest('.hide-on-success');
					if (wrap) {
						$(wrap).siblings('.show-on-success').show();
						$(wrap).hide();
					}
				}
				return false;
			})
		});
	};

	sandwich();
	popularCategoriesSlider();
	productPrevSlider();
	locationChoose();
	popupLink();
	formValidate();
	catalogNavClick();
});

let popularCategoriesSlider = function () {
	let sliderElement = $('.js-categories-prev');
	if ($(window).width() < 768 && !(sliderElement.hasClass('slick-initialized'))){
		sliderElement.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
		})
	} else if ($(window).width() > 768 && sliderElement.hasClass('slick-initialized')) {
		sliderElement.slick('unslick')
	}
};

$(window).on('resize', function () {
	popularCategoriesSlider();
});