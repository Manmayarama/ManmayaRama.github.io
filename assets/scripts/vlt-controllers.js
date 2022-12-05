/***********************************************
 * WIDGET: ANIMATED BLOCK
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.animatedBlock = {
		init: function () {
			var el = $('.vlt-animated-block');
			el.each(function () {
				var $this = $(this);
				VLTJS.window.on('vlt.change-slide', function () {
					$this.removeClass('animated');
					if ($this.parents('.vlt-section').hasClass('active')) {
						$this.addClass('animated');
					}
				});
			});
		}
	}
	VLTJS.animatedBlock.init();

})(jQuery);
/***********************************************
 * WIDGET: CONTACT FORM
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.contactForm = {
		init: function () {
			// check if plugin defined
			if (typeof $.fn.validate == 'undefined') {
				return;
			}
			var el = $('.vlt-contact-form');
			el.each(function () {
				var thisForm = $(this),
					successMessage = thisForm.find('.message.success'),
					errorMessage = thisForm.find('.message.danger');
				thisForm.validate({
					errorClass: 'error',
					submitHandler: function (form) {
						$.ajax({
							type: 'POST',
							url: 'handler.php',
							data: new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success: function () {
								successMessage.fadeIn();
								setTimeout(function () {
									successMessage.fadeOut();
								}, 5000);
							},
							error: function () {
								errorMessage.fadeIn();
								setTimeout(function () {
									errorMessage.fadeOut();
								}, 5000);
							}
						});
					}
				});

			});
		}
	}
	VLTJS.contactForm.init();

})(jQuery);
/***********************************************
 * WIDGET: COUNTER UP
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.counterUp = {
		init: function () {
			// check if plugin defined
			if (typeof $.fn.numerator == 'undefined') {
				return;
			}
			var el = $('.vlt-counter-up, .vlt-counter-up-small');

			el.each(function () {
				var $this = $(this),
					animation_duration = $this.data('animation-speed') || 1000,
					ending_number = $this.data('ending-number') || 0,
					delimiter = $this.data('delimiter') || false;
				VLTJS.window.on('vlt.change-slide', function () {
					if ($this.parents('.vlt-section').hasClass('active')) {
						var counter_el = $this.find('.counter').html('0');
						setTimeout(function () {
							counter_el.numerator({
								easing: 'linear',
								duration: animation_duration,
								delimiter: delimiter,
								toValue: ending_number,
							});
						}, 500);
					}
				});
			});

		}
	}
	VLTJS.counterUp.init();

})(jQuery);
/***********************************************
 * SITE: CUSTOM CURSOR
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.customCursor = {
		init: function () {
			if (!$('.vlt-is--custom-cursor').length) {
				return;
			}
			VLTJS.body.append('<div class="vlt-custom-cursor"><div class="circle"><span></span></div></div>');
			var cursor = $('.vlt-custom-cursor'),
				circle = cursor.find('.circle'),
				startPosition = {
					x: 0,
					y: 0
				},
				endPosition = {
					x: 0,
					y: 0
				},
				delta = .25;
			if (typeof gsap != 'undefined') {
				gsap.set(circle, {
					xPercent: -50,
					yPercent: -50
				});
				VLTJS.document.on('mousemove', function (e) {
					var offsetTop = window.pageYOffset || document.documentElement.scrollTop;
					startPosition.x = e.pageX;
					startPosition.y = e.pageY - offsetTop;
				});
				gsap.ticker.add(function () {
					endPosition.x += (startPosition.x - endPosition.x) * delta;
					endPosition.y += (startPosition.y - endPosition.y) * delta;
					gsap.set(circle, {
						x: endPosition.x,
						y: endPosition.y
					})
				});
				VLTJS.document.on('mousedown', function () {
					gsap.to(circle, .3, {
						scale: .7
					});
				}).on('mouseup', function () {
					gsap.to(circle, .3, {
						scale: 1
					});
				});
				VLTJS.document.on('mouseenter', 'input, textarea, select, .vlt-video-button > a', function () {
					gsap.to(circle, .3, {
						scale: 0,
						opacity: 0
					});
				}).on('mouseleave', 'input, textarea, select, .vlt-video-button > a', function () {
					gsap.to(circle, .3, {
						scale: 1,
						opacity: .1
					});
				});
				VLTJS.document.on('mouseenter', 'a, button, [role="button"]', function () {
					gsap.to(circle, .3, {
						height: 60,
						width: 60,
					});
				}).on('mouseleave blur', 'a, button, [role="button"]', function () {
					gsap.to(circle, .3, {
						height: 15,
						width: 15,
					});
				});
				VLTJS.document.on('mouseenter', '[data-cursor]', function () {
					var $this = $(this);
					gsap.to(circle, .3, {
						height: 80,
						width: 80,
						opacity: 1,
						onStart: function () {
							circle.find('span').html($this.attr('data-cursor'));
						}
					});
				}).on('mouseleave', '[data-cursor]', function () {
					gsap.to(circle, .3, {
						height: 15,
						width: 15,
						opacity: .1,
						onStart: function () {
							circle.find('span').html('');
						}
					});
				});
			}
		}
	};
	if (!VLTJS.isMobile.any()) {
		VLTJS.customCursor.init();
	}
})(jQuery);
/***********************************************
 * PAGE: FULLPAGE SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.fullpageSlider = {
		init: function () {
			if (typeof $.fn.pagepiling == 'undefined') {
				return;
			}
			var el = $('.vlt-fullpage-slider'),
				progress_bar = el.find('.vlt-fullpage-slider-progress-bar'),
				numbers = el.find('.vlt-fullpage-slider-numbers'),
				loop_top = el.data('loop-top') ? true : false,
				loop_bottom = el.data('loop-bottom') ? true : false,
				speed = el.data('speed') || 800,
				anchors = [];

			VLTJS.body.css('overflow', 'hidden');
			VLTJS.html.css('overflow', 'hidden');

			el.find('[data-anchor]').each(function () {
				anchors.push($(this).data('anchor'));
			});

			function vlthemes_navbar_solid() {
				if (el.find('.pp-section.active').scrollTop() > 0) {
					$('.vlt-navbar').addClass('vlt-navbar--solid');
				} else {
					$('.vlt-navbar').removeClass('vlt-navbar--solid');
				}
			}
			vlthemes_navbar_solid();

			function vlthemes_show_navigation() {
				progress_bar.find('li:first-child').addClass('active').end().addClass('is-show');
			}

			function vlthemes_page_brightness() {
				var section = el.find('.vlt-section.active');
				switch (section.data('brightness')) {
					case 'light':
						VLTJS.html.removeClass('is-light').addClass('is-dark');
						break;
					case 'dark':
						VLTJS.html.removeClass('is-dark').addClass('is-light');
						break;
				}
			}

			function vlthemes_navigation(direction, index) {
				switch (direction) {
					case 'down':
						progress_bar.find('li:nth-child(' + index + ')').prevAll().addClass('prev');
						break;
					case 'up':
						progress_bar.find('li:nth-child(' + index + ')').removeClass('prev');
						break;
				}
			}

			function vlthemes_slide_counter() {
				var section = el.find('.vlt-section.active'),
					index = section.index();
				if (index == 0) {
					numbers.html('<a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></a>');
				} else {
					numbers.html(VLTJS.addLedingZero(index + 1));
				}
			}

			el.pagepiling({
				menu: '.vlt-offcanvas-menu ul.sf-menu, .vlt-fullpage-slider-progress-bar',
				scrollingSpeed: speed,
				loopTop: loop_top,
				loopBottom: loop_bottom,
				anchors: anchors,
				sectionSelector: '.vlt-section',
				navigation: false,
				afterRender: function () {
					vlthemes_show_navigation();
					vlthemes_page_brightness();
					vlthemes_slide_counter();
					VLTJS.window.trigger('vlt.change-slide');
				},
				onLeave: function (index, nextIndex, direction) {
					vlthemes_page_brightness();
					vlthemes_navigation(direction, nextIndex);
					vlthemes_slide_counter();
					VLTJS.window.trigger('vlt.change-slide');
				},
				afterLoad: function (anchorLink, index) {
					progress_bar.find('li.active').prevAll().addClass('prev');
					vlthemes_navbar_solid();
				}
			});

			numbers.on('click', '>a', function (e) {
				e.preventDefault();
				$.fn.pagepiling.moveSectionDown();
			});

			el.find('.pp-scrollable').on('scroll', function () {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > 0) {
					$('.vlt-navbar').addClass('vlt-navbar--solid');
				} else {
					$('.vlt-navbar').removeClass('vlt-navbar--solid');
				}
			});

		}
	};
	VLTJS.fullpageSlider.init();
})(jQuery);
/***********************************************
 * MENU OFFCANVAS
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	VLTJS.menuOffcanvas = {
		config: {
			easing: 'power2.out'
		},
		init: function () {
			var menu = $('.vlt-offcanvas-menu'),
				navigation = menu.find('ul.sf-menu'),
				navigationItem = navigation.find('> li'),
				header = $('.vlt-offcanvas-menu__header'),
				footer = $('.vlt-offcanvas-menu__footer > div'),
				menuOpen = $('.js-offcanvas-menu-open'),
				menuClose = $('.js-offcanvas-menu-close'),
				siteOverlay = $('.vlt-site-overlay');

			if (typeof $.fn.superclick !== 'undefined') {
				navigation.superclick({
					delay: 300,
					cssArrows: false,
					animation: {
						opacity: 'show',
						height: 'show'
					},
					animationOut: {
						opacity: 'hide',
						height: 'hide'
					},
				});
			}

			menuOpen.on('click', function (e) {
				e.preventDefault();
				if (!menuIsOpen) {
					VLTJS.menuOffcanvas.open_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			menuClose.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			VLTJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			// Close after click to anchor.
			navigationItem.filter('[data-menuanchor]').on('click', 'a', function () {
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

		},
		open_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = true;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 1,
					})
					// menu animation
					.fromTo(menu, .6, {
						x: '100%',
					}, {
						x: 0,
						visibility: 'visible'
					}, '-=.3')
					// header animation
					.fromTo(header, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1
					}, '-=.3')
					// navigation item animation
					.fromTo(navigationItem, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15')
					// footer animation
					.fromTo(footer, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15');
			}
		},
		close_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = false;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'inherit'
					})
					// footer animation
					.to(footer, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						}
					})
					// navigation item animation
					.to(navigationItem, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						},
					}, '-=.15')
					// header animation
					.to(header, .3, {
						x: 50,
						autoAlpha: 0,
					}, '-=.15')
					// menu animation
					.to(menu, .6, {
						x: '100%',
					}, '-=.15')
					// set visibility menu after animation
					.set(menu, {
						visibility: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 0
					}, '-=.6');
			}
		}
	};
	VLTJS.menuOffcanvas.init();
})(jQuery);
/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {

	'use strict';

	// Fast click
	if (typeof FastClick === 'function') {
		FastClick.attach(document.body);
	}

})(jQuery);
/***********************************************
 * SITE: PRELOADER
 ***********************************************/
(function ($) {
	'use strict';
	// check if plugin defined
	if (typeof $.fn.animsition == 'undefined') {
		return;
	}
	var el = $('.animsition');
	el.animsition({
		inDuration: 500,
		outDuration: 500,
		linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
		loadingClass: 'animsition-loading-2',
		loadingInner: '<div class="spinner"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>',
	});
	el.on('animsition.inEnd', function () {
		VLTJS.window.trigger('vlt.preloader_done');
		VLTJS.html.addClass('vlt-is-page-loaded');
	});
})(jQuery);
/***********************************************
 * WIDGET: PROGRESS BAR
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.progressBar = {
		init: function () {
			// check if plugin defined
			if (typeof gsap == 'undefined') {
				return;
			}
			var el = $('.vlt-progress-bar');
			el.each(function () {
				var $this = $(this),
					final_value = $this.data('final-value') || 0,
					animation_duration = $this.data('animation-speed') || 0,
					delay = 500,
					obj = {
						count: 0
					};

				VLTJS.window.on('vlt.change-slide', function () {
					if ($this.parents('.vlt-section').hasClass('active')) {

						obj.count = 0;
						$this.find('.vlt-progress-bar__title > .counter').text(Math.round(obj.count));
						gsap.set($this.find('.vlt-progress-bar__bar > span'), {
							width: 0
						});
						gsap.to(obj, (animation_duration / 1000) / 2, {
							count: final_value,
							delay: delay / 1000,
							onUpdate: function () {
								$this.find('.vlt-progress-bar__title > .counter').text(Math.round(obj.count));
							}
						});

						gsap.to($this.find('.vlt-progress-bar__bar > span'), animation_duration / 1000, {
							width: final_value + '%',
							delay: delay / 1000
						});

					}
				});

			});
		}
	}
	VLTJS.progressBar.init();

})(jQuery);
/***********************************************
 * WIDGET: PROJECT SHOWCASE
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.projectShowcase = {
		initSlider: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-project-showcase-slider .swiper-container');
			new Swiper(el, {
				speed: 1000,
				spaceBetween: 30,
				grabCursor: true,
				slidesPerView: 1,
				breakpoints: {
					575: {
						slidesPerView: 2,
					},
				},
			});
		},
		initParallax: function () {
			// check if plugin defined
			if (typeof gsap == 'undefined') {
				return;
			}
			var el = $('.vlt-project-showcase'),
				items = el.find('.vlt-project-showcase__items'),
				item = items.find('.vlt-project-showcase__item'),
				images = el.find('.vlt-project-showcase__images'),
				image = images.find('.vlt-project-showcase__image'),
				wDiff,
				value;

			var sliderWidth = el.outerWidth(true),
				sliderImageWidth = images.outerWidth(true),
				itemsWidth = items.outerWidth(),
				sliderImageDiff = (sliderWidth - sliderImageWidth) / sliderWidth;

			wDiff = (itemsWidth / sliderWidth) - 1;
			wDiff = (sliderWidth - itemsWidth) / sliderWidth;

			item.on('mouseenter', function () {
				item.removeClass('is-active');
				image.removeClass('is-active');
				$(this).addClass('is-active');
				image.eq($(this).index()).addClass('is-active');
			});

			item.eq(0).trigger('mouseenter');

			VLTJS.window.on('mousemove', function (e) {
				value = e.pageX - el.offset().left;
			});

			gsap.ticker.add(function () {
				gsap.set(items, {
					x: value * wDiff,
					ease: 'power3.out'
				});
				gsap.set(images, {
					right: value * sliderImageDiff,
					ease: 'power3.out'
				});
			});

		}
	}
	VLTJS.projectShowcase.initSlider();
	VLTJS.projectShowcase.initParallax();
	VLTJS.debounceResize(function () {
		VLTJS.projectShowcase.initParallax();
	});
})(jQuery);
/***********************************************
 * WIDGET: TESTIMONIAL SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.testimonialSlider = {
		init: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-testimonial-slider .swiper-container');
			el.each(function () {
				var $this = $(this);
				$this.find('.swiper-wrapper > *').wrap('<div class="swiper-slide">');
				new Swiper(this, {
					speed: 1000,
					spaceBetween: 30,
					grabCursor: true,
					effect: 'coverflow',
					slidesPerView: 1,
					navigation: {
						nextEl: $('.vlt-testimonial-slider-controls .next'),
						prevEl: $('.vlt-testimonial-slider-controls .prev'),
					},
					pagination: {
						el: $('.vlt-testimonial-slider-controls .pagination'),
						clickable: false,
						type: 'fraction',
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
								'<span class="sep">/</span>' +
								'<span class="' + totalClass + '"></span>';
						}
					}
				});
			});

		}
	};

	VLTJS.testimonialSlider.init()

})(jQuery);
/***********************************************
 * WIDGET: TIMELINE SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.timelineSlider = {
		init: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-timeline-slider .swiper-container');
			el.each(function () {
				var $this = $(this);
				$this.find('.swiper-wrapper > *').wrap('<div class="swiper-slide">');
				new Swiper(this, {
					speed: 1000,
					spaceBetween: 0,
					grabCursor: true,
					slidesPerView: 1,
					navigation: {
						nextEl: $('.vlt-timeline-slider-controls .next'),
						prevEl: $('.vlt-timeline-slider-controls .prev'),
					},
					pagination: {
						el: $('.vlt-timeline-slider-controls .pagination'),
						clickable: false,
						type: 'fraction',
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
								'<span class="sep">/</span>' +
								'<span class="' + totalClass + '"></span>';
						}
					}
				});
			});

		}
	};

	VLTJS.timelineSlider.init()

})(jQuery);