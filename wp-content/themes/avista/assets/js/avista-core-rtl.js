/*
	Author: themexriver
	Version: 1.0
*/

(function ($) {
	"use strict";

	// tochspin for product count
	if ($("input.product-count").length) {
		$("input.product-count").TouchSpin({
			min: 1,
			max: 1000,
			step: 1,
			buttondown_class: "btn btn-link",
			buttonup_class: "btn btn-link",
		});
	}

	gsap.config({
		nullTargetWarn: false,
	});

	// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: 0.9,
		easing: (t) => 1 - Math.pow(1 - t, 4),
		direction: "vertical",
		smooth: true,
		smoothTouch: false,
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	$('a[href^="#"]').on("click", function (e) {
		e.preventDefault();

		const target = $(this.getAttribute("href"));

		if (target.length) {
			lenis.scrollTo(target[0], {
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			});
		}
	});

	// sticky-header-default
	function waStickyHeader() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $(".wa_sticky_header");
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass("wa_sticky");
			} else {
				$header.removeClass("wa_sticky");
				$header.removeClass("wa_sticky_show");
			}

			if ($header.hasClass("wa_sticky")) {
				if (windowTop < lastScrollTop) {
					$header.addClass("wa_sticky_show");
				} else {
					$header.removeClass("wa_sticky_show");
				}
			}

			lastScrollTop = windowTop;
		});
	}

	waStickyHeader();

	// offcanvas
	$(".offcanvas_toggle").on("click", function () {
		$(".wa-overly, .offcanvas_box_active").addClass("active");
	});

	$(".wa-overly, .offcanvas_box_close").on("click", function () {
		$(".offcanvas_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});
	$(document).on("keydown", function (event) {
		if (event.key === "Escape") {
			$(".offcanvas_box_active").removeClass("active");
			$(".wa-overly").removeClass("active");
		}
	});

	$(".offcanvas_box_active a").on("click", function () {
		$(".offcanvas_box_active").removeClass("active"); // Remove 'active' from the parent
		$(".wa-overly").removeClass("active"); // Remove 'active' from overlay
	});

	// mobile-dropdown
	jQuery(".mobile-main-navigation li.dropdown").append(
		'<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'
	),
		jQuery(".mobile-main-navigation li .dropdown-btn").on(
			"click",
			function () {
				jQuery(this).hasClass("active")
					? (jQuery(this)
							.closest("ul")
							.find(".dropdown-btn.active")
							.toggleClass("active"),
					  jQuery(this)
							.closest("ul")
							.find(".dropdown-menu.active")
							.toggleClass("active")
							.slideToggle())
					: (jQuery(this)
							.closest("ul")
							.find(".dropdown-btn.active")
							.toggleClass("active"),
					  jQuery(this)
							.closest("ul")
							.find(".dropdown-menu.active")
							.toggleClass("active")
							.slideToggle(),
					  jQuery(this).toggleClass("active"),
					  jQuery(this)
							.parent()
							.find("> .dropdown-menu")
							.toggleClass("active"),
					  jQuery(this)
							.parent()
							.find("> .dropdown-menu")
							.slideToggle());
			}
		);

	// search-box
	$(".search_btn_toggle").on("click", function () {
		$(".wa-overly, .search_box_active").addClass("active");
	});

	$(".wa-overly, .search_box_close").on("click", function () {
		$(".search_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});

	$(document).on("keydown", function (event) {
		if (event.key === "Escape") {
			$(".search_box_active").removeClass("active");
			$(".wa-overly").removeClass("active");
		}
	});

	// windows-loaded-before-functions
	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener("load", function () {
			CustomEase.create("ease1", ".645,.045,.355,1");

			// preloader
			let preloader = document.querySelector(".lw-preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000);
			}

			// after-preloader-functions-start
			setTimeout(function () {
				// hero-4-slider
				if ($(".bs-h4-img-active").length) {
					let bsH4imgSlider = new Swiper(".bs-h4-thum-active", {
						loop: true,
						spaceBetween: 16,
						speed: 1000,

						breakpoints: {
							0: {
								slidesPerView: 1,
							},
							576: {
								slidesPerView: 2,
							},
							768: {
								slidesPerView: 2,
							},
							992: {
								slidesPerView: 2,
							},
							1200: {
								slidesPerView: 3,
							},
						},
					});

					let slider = new Swiper(".bs-h4-img-active", {
						loop: true,
						speed: 1000,
						effect: "fade",
						fadeEffect: {
							crossFade: true,
						},

						autoplay: {
							delay: 4000,
						},

						pagination: {
							el: ".bs-t1-pagi",
							clickable: true,
						},

						thumbs: {
							swiper: bsH4imgSlider,
						},
					});
				}
			}, 1000);

			// hero-1-tl
			const lwH1Tl = gsap.timeline({
				defaults: {
					ease: "ease1",
					duration: 0.8,
				},
			});

			lwH1Tl.from(".bs-hero-1-success", {
				yPercent: -100,
				opacity: 0,
				delay: 1,
			});
			lwH1Tl.fromTo(
				".bs-hero-1-success .content",
				{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				}
			);
			lwH1Tl.fromTo(
				".bs-hero-1-img",
				{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				}
			);

			// hero-2-tl
			const lwH2Tl = gsap.timeline({
				defaults: {
					ease: "ease1",
					duration: 0.8,
				},
			});

			lwH2Tl.from(".bs-hero-2-img-2", {
				xPercent: 100,
				opacity: 0,
				delay: 2.5,
			});
			lwH2Tl.from(
				".bs-hero-2-img-1",
				{ xPercent: -100, opacity: 0 },
				"<"
			);

			// hero-3-tl
			const lwH3Tl = gsap.timeline({
				defaults: {
					ease: "ease1",
				},
			});

			lwH3Tl.fromTo(
				".bs-hero-3-img",
				{
					clipPath:
						"polygon(25% 0%,25% 0%,25% 100%,50% 100%,50% 0%,50% 0%,50% 100%,100% 100%,100% 0%,100% 0%,100% 100%,25% 100%)",
				},
				{
					clipPath:
						"polygon(25% 0%,0% 0%,0% 100%,50% 100%,50% 0%,23% 0%,24% 100%,100% 100%,100% 0%,46% 0%,45% 100%,25% 100%)",
					delay: 1.5,
					duration: 1.2,
				}
			);
			lwH3Tl.from(".bs-hero-3-img img", { scale: 1.2, duration: 2 }, "<");

			// hero-1-title-responsive
			const hero1Area = document.querySelector(".bs-hero-1-area");
			if (hero1Area) {
				const bsH1title = hero1Area.querySelector(".bs-hero-1-title");
				const bsH1title2 =
					hero1Area.querySelector(".bs-hero-1-title-2");

				if (window.innerWidth <= 1199) {
					if (bsH1title)
						bsH1title.setAttribute("data-split-delay", "0s");
					if (bsH1title2)
						bsH1title2.setAttribute("data-split-delay", "0s");
				}
			}

			// hero-2-title-responsive
			const hero2Area = document.querySelector(".bs-hero-2-area");
			if (hero2Area) {
				const bsH2title = hero2Area.querySelector(".bs-hero-2-title-3");
				const bsH2title2 =
					hero2Area.querySelector(".bs-hero-2-title-4");

				if (window.innerWidth <= 575) {
					if (bsH2title)
						bsH2title.setAttribute("data-split-delay", "0s");
					if (bsH2title2)
						bsH2title2.setAttribute("data-split-delay", "0s");
				}
			}

			// wa-split-text
			if ($(".wa-split-text").length) {
				var waSplitText = $(".wa-split-text");
				if (waSplitText.length == 0) return;
				gsap.registerPlugin(SplitText);
				waSplitText.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});
				});
			}

			// wa-split-right
			if ($(".wa-split-right").length) {
				var waSplitRight = $(".wa-split-right");
				if (waSplitRight.length == 0) return;

				gsap.registerPlugin(SplitText);

				waSplitRight.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					gsap.set(el, { perspective: 400 });

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa-split-right")) {
						gsap.set(el.split.chars, {
							x: "50",
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						x: 0,
						opacity: 1,
						duration: 0.8,
						ease: "ease1",
						stagger: 0.02,
						delay: delayValue,
					});
				});
			}

			// wa-split-clr
			if ($(".wa-split-clr").length) {
				var waSplitClr = $(".wa-split-clr");
				if (waSplitClr.length == 0) return;

				gsap.registerPlugin(SplitText);

				waSplitClr.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					gsap.set(el, { perspective: 400 });

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa-split-clr")) {
						gsap.set(el.split.chars, {
							x: "50",
							color: getComputedStyle(
								document.documentElement
							).getPropertyValue("--lbt-pr-1"),
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						x: 0,
						color: "inherit",
						opacity: 1,
						duration: 0.8,
						ease: "ease1",
						stagger: 0.02,
						delay: delayValue,
					});
				});
			}

			// wa-split-y
			if ($(".wa-split-y").length) {
				var waSplitX = $(".wa-split-y");
				if (waSplitX.length == 0) return;
				gsap.registerPlugin(SplitText);
				waSplitX.each(function (index, el) {
					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					el.split = new SplitText(el, {
						type: "lines",
						linesClass: "split-line",
					});

					gsap.set(el, {
						perspective: 2000,
						transformOrigin: "50% 0%",
						transformStyle: "preserve-3d",
					});

					if ($(el).hasClass("wa-split-y")) {
						gsap.set(el.split.lines, {
							y: 70,
							z: -75,
							rotationX: -76,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.lines, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						opacity: 1,
						rotation: 0,
						rotationX: 0,
						rotationY: 0,
						yPercent: 0,
						xPercent: 0,
						x: 0,
						y: 0,
						z: 0,
						duration: 1,
						ease: "ease1",
						stagger: 0.3,
						delay: delayValue,
					});
				});
			}

			// wa-split-up
			if ($(".wa-split-up").length) {
				var waSplitup = $(".wa-split-up");
				if (waSplitup.length == 0) return;
				gsap.registerPlugin(SplitText);
				waSplitup.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa-split-up")) {
						gsap.set(el.split.chars, {
							yPercent: 100,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						opacity: 1,
						yPercent: 0,
						xPercent: 0,
						duration: 0.8,
						ease: "back.out(2)",
						stagger: {
							amount: 0.7,
							from: "random",
						},
						delay: delayValue,
					});
				});
			}

			// subtitle-4
			gsap.utils.toArray(".bs-subtitle-4").forEach((item) => {
				gsap.from(item, {
					width: "0%",
					ease: "ease1",
					duration: 2,
					scrollTrigger: {
						trigger: item,
						start: "top 80%",
						toggleActions: "play none none reverse",
						markers: false,
					},
				});
			});
		});
	});

	// gsap-common

	// fadeInUp
	gsap.utils.toArray(".wa-fadeInUp").forEach((item) => {
		gsap.from(item, {
			y: 30,
			ease: "ease1",
			autoAlpha: 0,
			duration: 0.4,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});
	// fadeInRight
	gsap.utils.toArray(".wa-fadeInRight").forEach((item) => {
		gsap.from(item, {
			x: 30,
			ease: "ease1",
			autoAlpha: 0,
			duration: 0.4,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// slideInUp
	gsap.utils.toArray(".wa-slideInRight").forEach((item) => {
		gsap.from(item, {
			xPercent: 100,
			ease: "ease1",
			duration: 1,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// fadeInUp
	gsap.utils.toArray(".wa-slideInUp").forEach((item) => {
		gsap.from(item, {
			yPercent: 100,
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 95%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// scaleInUp
	gsap.utils.toArray(".wa-scaleInUp").forEach((item) => {
		gsap.from(item, {
			scale: 0,
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// scaleYInUp
	gsap.utils.toArray(".wa-scaleYInUp").forEach((item) => {
		gsap.from(item, {
			scaleY: 0,
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// scaleYInUp
	gsap.utils.toArray(".wa-scaleXInUp").forEach((item) => {
		gsap.from(item, {
			scaleX: 0,
			ease: "ease1",
			duration: 1.5,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// slideInRight
	gsap.utils.toArray(".wa-slideInRight").forEach((item) => {
		gsap.from(item, {
			xPercent: 100,
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// slideInLeft
	gsap.utils.toArray(".wa-slideInLeft").forEach((item) => {
		gsap.from(item, {
			xPercent: -100,
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// 3dup
	gsap.utils.toArray(".wa-3dUp").forEach((item) => {
		gsap.from(item, {
			transformOrigin: "50% 100%",
			transform: "rotateX(15deg) translateY(50px)",
			ease: "ease1",
			duration: 0.5,
			scrollTrigger: {
				trigger: item,
				start: "top 70%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// wa-skew-1
	gsap.utils.toArray(".wa-skew-1").forEach((item) => {
		gsap.from(item, {
			rotation: 7,
			ease: "Back.easeOut",
			autoAlpha: 0,
			duration: 1,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// wa-progress
	gsap.utils.toArray(".wa-progress").forEach((item) => {
		gsap.from(item, {
			scaleX: 0,
			transformOrigin: "left",
			ease: "ease1",
			duration: 3,
			scrollTrigger: {
				trigger: item,
				start: "top 90%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
	});

	// wa-parallax-img
	gsap.utils.toArray(".wa-parallax-img").forEach((element) => {
		gsap.fromTo(
			element,
			{ objectPosition: "50% 0%" },
			{
				objectPosition: "50% 100%",
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: true,
					markers: false,
				},
			}
		);
	});

	// wa-bg-parallax
	gsap.utils.toArray(".wa-bg-parallax").forEach((element) => {
		gsap.fromTo(
			element,
			{ backgroundPosition: "50% 0%" },
			{
				backgroundPosition: "50% 100%",
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: true,
					markers: false,
				},
			}
		);
	});

	// wa-parallax-item-right-left
	gsap.utils.toArray(".wa-parallax-item-right-left").forEach((element) => {
		gsap.from(element, {
			xPercent: 50,
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: true,
				markers: false,
			},
		});
	});

	// wa-parallax-item-left-right
	gsap.utils.toArray(".wa-parallax-item-left-right").forEach((element) => {
		gsap.from(element, {
			xPercent: -50,
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: true,
				markers: false,
			},
		});
	});

	// wa-clip-left-right
	gsap.utils.toArray(".wa-clip-left-right").forEach((element) => {
		gsap.fromTo(
			element,
			{ clipPath: "polygon(0% 0%, 0% 0%, 0 100%, 0% 100%)" },
			{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "ease1",
				duration: 0.8,
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			}
		);
	});

	// wa-clip-right-left
	gsap.utils.toArray(".wa-clip-right-left").forEach((element) => {
		gsap.fromTo(
			element,
			{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
			{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "ease1",
				duration: 0.8,
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			}
		);
	});

	// wa-clip-top-bottom
	gsap.utils.toArray(".wa-clip-top-bottom").forEach((element) => {
		gsap.fromTo(
			element,
			{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
			{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "ease1",
				duration: 0.8,
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			}
		);
	});

	// img-split
	if ($(".wa-img-split").length) {
		class waImgSplit {
			constructor($element) {
				// Initialize variables for the specific element
				this.$t = $element;
				this.gridX = 6; // Default number of columns
				this.gridY = 4; // Default number of rows
				this.w = this.$t.width(); // Container width
				this.h = this.$t.height(); // Container height
				this.img = $("img", this.$t).attr("src"); // Image source
				this.delay = 0.05; // Transition delay for each grid piece

				// Create the grid
				this.create();
			}

			create() {
				// Remove existing divs
				this.$t.find("div").remove();

				// Loop through the grid dimensions and create divs
				for (let x = 0; x < this.gridX; x++) {
					for (let y = 0; y < this.gridY; y++) {
						// Calculate dimensions and positions
						const width =
							((this.w / this.gridX) * 100) / this.w + "%";
						const height =
							((this.h / this.gridY) * 100) / this.h + "%";
						const top =
							((this.h / this.gridY) * y * 100) / this.h + "%";
						const left =
							((this.w / this.gridX) * x * 100) / this.w + "%";
						const bgPosX = -(this.w / this.gridX) * x + "px";
						const bgPosY = -(this.h / this.gridY) * y + "px";

						// Create and style the grid piece
						$("<div />")
							.css({
								top: top,
								left: left,
								width: width,
								height: height,
								backgroundImage: `url(${this.img})`,
								backgroundPosition: `${bgPosX} ${bgPosY}`,
								transitionDelay: `${
									x * this.delay + y * this.delay
								}s`,
							})
							.appendTo(this.$t);
					}
				}
			}
		}

		window.onload = function () {
			$(".wa-img-split").each(function () {
				new waImgSplit($(this));
			});
		};
	}

	// gsap-section-start

	// hero-1-shape
	if ($(".bs-hero-1-bg-shape").length) {
		var $bsH1shape = $(".bs-hero-1-bg-shape");
		var $bsH1area = $(".bs-hero-1-area");

		function bsH1moveCircle(e) {
			var offset = $bsH1area.offset();
			var relativeX = e.pageX - offset.left;
			var relativeY = e.pageY - offset.top;

			TweenLite.to($bsH1shape, 0.3, {
				css: {
					left: relativeX + "px",
					top: relativeY + "px",
				},
			});
		}

		$bsH1area.on("mousemove", bsH1moveCircle);
	}

	var bsH1imgParallax = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-hero-1-area",
			start: "top 0",
			toggleActions: "play none none reverse",
			markers: false,
			scrub: true,
		},
	});
	bsH1imgParallax.fromTo(
		".bs-hero-1-img img",
		{ objectPosition: "50% 0%" },
		{
			objectPosition: "50% 100%",
		}
	);

	// core-feature
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".bs-core-features-1-area").hover(function () {
			$(this).find(".bs-core-features-1-item").addClass("active");
		});
	}

	// about-1-item
	var bsAbout1item = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-about-1-item",
			start: "top 95%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.8,
		},
	});

	bsAbout1item.fromTo(
		".bs-about-1-item",
		{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
		{
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			stagger: 0.3,
		}
	);

	// about-drag
	if ($(".bs-about-1-slider-drag").length) {
		var $bsA1shape = $(".bs-about-1-slider-drag");
		var $bsA1area = $(".bs-about-1-slider");

		function bsA1moveCircle(e) {
			var offset = $bsA1area.offset();
			var relativeX = e.pageX - offset.left;
			var relativeY = e.pageY - offset.top;

			TweenLite.to($bsA1shape, 0.3, {
				css: {
					left: relativeX + "px",
					top: relativeY + "px",
				},
			});
		}

		$bsA1area.on("mousemove", bsA1moveCircle);
	}

	// video-1
	var bsVideo1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-video-1-content .title",
			start: "top 100%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.8,
		},
	});

	bsVideo1.from(".bs-video-1-content .title ", { yPercent: 100 });
	bsVideo1.from(
		".bs-video-1-content-list ",
		{ xPercent: 100, opacity: 0 },
		"<80%"
	);

	// testimonial-1
	var bsTestimonial1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-testimonial-1-rating",
			start: "top 65%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.4,
		},
	});

	bsTestimonial1.from(".bs-testimonial-1-rating .disc ", { yPercent: 200 });
	bsTestimonial1.from(
		".bs-testimonial-1-rating .left ",
		{ yPercent: 200 },
		"<"
	);

	// contact-1
	var bsContact = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-contact-1-bg-color",
			start: "top 65%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.4,
		},
	});

	bsContact.from(".bs-contact-1-bg-color ", { backgroundColor: "#f1631975" });

	// team-1-item
	var bsTeam1item = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-team-1-slider",
			start: "top 95%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.8,
		},
	});

	bsTeam1item.from(".bs-team-1-slider .swiper-slide", {
		yPercent: 100,
		stagger: 0.1,
	});

	// faq-1-bg
	var bsf1bg = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-faq-1-bg-img",
			start: "top 80%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "ease1",
			duration: 0.8,
		},
	});

	bsf1bg.from(".bs-faq-1-bg-img img", { yPercent: 100 });

	// gallery-1
	var bsGallery1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-gallery-2-wrap",
			start: "top 50%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			duration: 1,
			ease: "back.out(3)",
		},
	});
	let images = gsap.utils
		.toArray(".bs-gallery-2-img")
		.sort(() => Math.random() - 0.5);

	bsGallery1.from(images, { rotationY: -90, stagger: 0.1 });

	// home-3-multi-section-shape
	if ($(".bs-hero-x-services-shape").length) {
		var $bsHome3shape = $(".bs-hero-x-services-shape");
		var $bsHome3area = $(".bs-hero-x-services-area");

		function bsHome3moveCircle(e) {
			var offset = $bsHome3area.offset();
			var relativeX = e.pageX - offset.left;
			var relativeY = e.pageY - offset.top;

			TweenLite.to($bsHome3shape, 0.3, {
				css: {
					left: relativeX + "px",
					top: relativeY + "px",
				},
			});
		}

		$bsHome3area.on("mousemove", bsHome3moveCircle);
	}

	// about-3
	var about3card = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-about-3-feature",
			start: "top 70%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			duration: 0.7,
			ease: "ease1",
		},
	});
	about3card.from(".bs-about-3-feature-single", {
		yPercent: 100,
		stagger: 0.2,
	});

	// team-3
	var team3card = gsap.timeline({
		scrollTrigger: {
			trigger: ".bs-team-3-wrap",
			start: "top 50%",
			toggleActions: "play none none reverse",
			markers: false,
		},
	});
	team3card.from(".bs-team-3-item:nth-child(3)", { x: -100, rotationY: -40 });
	team3card.from(
		".bs-team-3-item:nth-child(1)",
		{ x: 100, rotationY: 40 },
		"<"
	);
	team3card.from(".bs-team-3-item:nth-child(2)", { scale: 0.9 }, "<");

	// choose-4
	if (window.matchMedia("(min-width: 992px)").matches) {
		gsap.to(".bs-choose-4-content-pin", {
			scrollTrigger: {
				trigger: ".bs-choose-4-content-height",
				start: "top top",
				end: "bottom bottom",
				pin: ".bs-choose-4-content-pin",
				pinSpacing: true,
				markers: false,
			},
		});

		var ch4content = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-choose-4-content-height",
				start: "top 0%",
				toggleActions: "play none none reverse",
				markers: false,
				scrub: true,
			},
		});
		ch4content.to(".bs-choose-4-content", { scale: 0, xPercent: -50 });

		var ch4item = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-choose-4-feature",
				start: "top 80%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
		ch4item.from(".bs-choose-4-feature .item-margin", {
			xPercent: -200,
			rotation: -200,
			stagger: -0.1,
			duration: 1.5,
			ease: "back.out(2)",
		});
	}

	// project-4
	if (window.matchMedia("(min-width: 992px)").matches) {
		var p4content = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-project-4-content",
				start: "top 40%",
				end: "top 0%",
				toggleActions: "play none none reverse",
				markers: false,
				scrub: true,
			},
		});
		p4content.to(".bs-project-4-content .title-2 .right-text", {
			xPercent: 150,
		});
		p4content.to(
			".bs-project-4-content .title-2 .left-text",
			{ xPercent: -150 },
			"<"
		);
		p4content.to(
			".bs-project-4-content .big-title ",
			{ yPercent: 100, scale: 0 },
			"<"
		);
		p4content.fromTo(
			".bs-project-4-card ",
			{ transform: "translateY(-210px) scale(30%)" },
			{ transform: "translateY(-210px) scale(100%)" },
			"<"
		);

		var p4cardIns = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-project-4-card-single",
				start: "top 50%",
				end: "top 0%",
				toggleActions: "play none none reverse",
				markers: false,
			},
			defaults: {
				duration: 0.1,
				ease: "none",
			},
		});
		p4cardIns.to(".bs-project-4-card .has-card-2", { y: -30, scale: 0.9 });
		p4cardIns.to(".bs-project-4-card .has-card-3", { y: -60, scale: 0.8 });
		p4cardIns.to(".bs-project-4-card .has-card-4", { y: -90, scale: 0.7 });

		gsap.to(".bs-project-4-card-pin", {
			scrollTrigger: {
				trigger: ".bs-project-4-height",
				start: "top -15%",
				end: "bottom bottom",
				pin: ".bs-project-4-card-pin",
				pinSpacing: true,
				markers: false,
			},
		});

		var p4cardTransform = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-project-4-height",
				start: "top -10%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				markers: false,
				scrub: true,
			},
		});
		p4cardTransform.to(".bs-project-4-card .has-card-1 .content", {
			opacity: 1,
		});
		p4cardTransform.to(".bs-project-4-card .has-card-1", { yPercent: 100 });
		p4cardTransform.to(".bs-project-4-card .has-card-1", { opacity: 0 });
		p4cardTransform.to(
			".bs-project-4-card .has-card-2 .content",
			{ opacity: 1 },
			"<-50%"
		);
		p4cardTransform.to(".bs-project-4-card .has-card-2", { yPercent: 100 });
		p4cardTransform.to(".bs-project-4-card .has-card-2", { opacity: 0 });
		p4cardTransform.to(
			".bs-project-4-card .has-card-3 .content",
			{ opacity: 1 },
			"<-50%"
		);
		p4cardTransform.to(".bs-project-4-card .has-card-3", { yPercent: 100 });
		p4cardTransform.to(".bs-project-4-card .has-card-3", { opacity: 0 });
		p4cardTransform.to(
			".bs-project-4-card .has-card-4 .content",
			{ opacity: 1 },
			"<-50%"
		);
	}

	// services-4
	if (window.matchMedia("(min-width: 992px)").matches) {
		var services4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-services-4-item-single",
				start: "top 40%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
		services4.from(".bs-services-4-item", { x: 324, stagger: 0.2 });
	}

	// team-4
	if (window.matchMedia("(min-width: 992px)").matches) {
		var team4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".bs-team-4-member",
				start: "top 50%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
		team4.from(".bs-team-4-member-single:nth-child(1)", {
			x: 120,
			rotationY: 50,
			scale: 0.9,
		});
		team4.from(
			".bs-team-4-member-single:nth-child(2)",
			{ scale: 0.85, x: 30 },
			"<"
		);
		team4.from(
			".bs-team-4-member-single:nth-child(3)",
			{ scale: 0.85, x: -30 },
			"<"
		);
		team4.from(
			".bs-team-4-member-single:nth-child(4)",
			{ x: -120, rotationY: -50, scale: 0.9 },
			"<"
		);
	}

	// gsap-section-end

	// slider-start

	// about-1-slider
	if ($(".bs-a1-active").length) {
		let slider = new Swiper(".bs-a1-active", {
			loop: true,
			spaceBetween: 25,
			speed: 1000,
			slidesPerView: 3,

			autoplay: {
				delay: 5000,
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	// services-1-slider
	if ($(".bs-s1-active").length) {
		let slider = new Swiper(".bs-s1-active", {
			loop: true,
			spaceBetween: 40,
			speed: 1000,
			slidesPerView: 4,

			autoplay: {
				delay: 5000,
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1600: {
					slidesPerView: 4,
				},
			},
		});
	}

	// testimonial-1-slider
	if ($(".bs-t1-comment-active").length) {
		let bsT1slider = new Swiper(".bs-t1-active", {
			loop: true,
			speed: 1000,

			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		});

		let slider = new Swiper(".bs-t1-comment-active", {
			loop: true,
			speed: 1000,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},

			autoplay: {
				delay: 4000,
			},

			pagination: {
				el: ".bs-t1-pagi",
				clickable: true,
			},

			thumbs: {
				swiper: bsT1slider,
			},

			on: {
				slideChangeTransitionStart: () => {
					bsT1sliderSplit();
				},
			},
		});

		function bsT1sliderSplit() {
			const currentSlide = document.querySelectorAll(
				".swiper-slide-active .bs-testimonial-1-item-comment"
			);

			const split = new SplitText(currentSlide, {
				type: "lines",
				linesClass: "split-line",
			});
			gsap.set(split.lines, {
				perspective: 2000,
				transformStyle: "preserve-3d",
			});
			gsap.set(split.lines, {
				y: 70,
				z: -75,
				rotationX: -120,
				opacity: 0,
			});

			gsap.to(split.lines, {
				opacity: 1,
				y: 0,
				z: 1,
				rotationX: 0,
				duration: 0.8,
				ease: "ease1",
				stagger: 0.3,
			});
		}

		bsT1sliderSplit();
	}

	// team-1-slider
	if ($(".bs-team1-active").length) {
		let slider = new Swiper(".bs-team1-active", {
			loop: true,
			speed: 1000,
			spaceBetween: 18,
			centeredSlides: true,

			navigation: {
				nextEl: ".lw-team1-next",
				prevEl: ".lw-team1-prev",
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4,
				},
				1600: {
					slidesPerView: 5,
				},
			},
		});
	}

	// showcase-1-slider
	if ($(".bs-sh1-active").length) {
		let slider = new Swiper(".bs-sh1-active", {
			loop: true,
			speed: 1000,

			navigation: {
				nextEl: ".lw-sh1-next",
				prevEl: ".lw-sh1-prev",
			},

			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},

			autoplay: {
				delay: 4000,
			},
		});
	}

	// projects-3-slider
	if ($(".bs-p3-active").length) {
		let slider = new Swiper(".bs-p3-active", {
			loop: true,
			speed: 1000,
			spaceBetween: 40,

			pagination: {
				el: ".bs-p3-pagi",
				clickable: true,
			},

			autoplay: {
				delay: 5000,
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1600: {
					slidesPerView: 4,
				},
			},
		});
	}

	// showcase-3-slider
	if ($(".bs-showc3-active").length) {
		let slider = new Swiper(".bs-showc3-active", {
			loop: true,
			speed: 1000,
			spaceBetween: 0,

			pagination: {
				el: ".bs-showc3-pagi",
				type: "fraction",
			},

			navigation: {
				nextEl: ".bs-showc-3-next",
				prevEl: ".bs-showc-3-prev",
			},
		});
	}

	// testimonial-4-slider
	if ($(".bs-t4-active").length) {
		let slider = new Swiper(".bs-t4-active", {
			loop: true,
			speed: 1000,
			spaceBetween: 32,

			autoplay: {
				delay: 5000,
			},

			pagination: {
				el: ".bs-t4-pagination",
				type: "progressbar",
			},

			navigation: {
				nextEl: ".bs-t4-next",
				prevEl: ".bs-t4-prev",
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 3,
				},
			},
		});
	}

	// btn-1
	if ($(".bs-btn-1").length) {
		$(".bs-btn-1")
			.on("mouseenter", function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find(".shape").css({ top: relY, left: relX });
			})
			.on("mouseout", function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find(".shape").css({ top: relY, left: relX });
			});
	}

	// btn-1
	if ($(".btn-span").length) {
		$(".btn-span")
			.on("mouseenter", function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find(".shape").css({ top: relY, left: relX });
			})
			.on("mouseout", function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find(".shape").css({ top: relY, left: relX });
			});
	}

	// project-1-tabs-hover-active
	document
		.querySelectorAll(".bs-projects-1-tabs-btn .nav-link")
		.forEach((link) => {
			link.addEventListener("mouseenter", function () {
				const tabTrigger = new bootstrap.Tab(this); // Create a Bootstrap tab instance
				tabTrigger.show(); // Show the corresponding tab
			});
		});

	// work-1-tabs-hover-active
	document
		.querySelectorAll(".bs-work-1-tabs-btn .nav-link")
		.forEach((link) => {
			link.addEventListener("mouseenter", function () {
				const tabTrigger = new bootstrap.Tab(this); // Create a Bootstrap tab instance
				tabTrigger.show(); // Show the corresponding tab
			});
		});

	// services-4-hover-active
	$(".bs-services-4-item-single").on("mouseover", function () {
		var current_class = document.getElementsByClassName(
			"bs-services-4-item-single active"
		);
		current_class[0].className = current_class[0].className.replace(
			" active",
			""
		);
		this.className += " active";
	});

	// faq-1-active
	$(document).on("click", ".bs-accordion-item", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	// cursor-parallax
	if (window.matchMedia("(min-width: 992px)").matches) {
		document.addEventListener("mousemove", parallax);
		function parallax(e) {
			document.querySelectorAll(".object").forEach(function (move) {
				var moving_value = move.getAttribute("data-value");
				var x = (e.clientX * moving_value) / 250;
				var y = (e.clientY * moving_value) / 250;

				move.style.transform =
					"translateX(" + x + "px) translateY(" + y + "px)";
			});
		}
	}

	// magnetic-item
	if ($(".wa-magnetic").length) {
		var waMagnets = document.querySelectorAll(".wa-magnetic");
		var waStrength = 100;

		waMagnets.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet);
			magnet.addEventListener("mouseout", function (event) {
				gsap.to(event.currentTarget, {
					x: 0,
					y: 0,
					duration: 1,
					ease: "elastic.out(1,0.3)",
				});
			});
		});

		function moveMagnet(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();

			gsap.to(magnetButton, {
				x:
					((event.clientX - bounding.left) /
						magnetButton.offsetWidth -
						0.5) *
					waStrength,
				y:
					((event.clientY - bounding.top) /
						magnetButton.offsetHeight -
						0.5) *
					waStrength,
				duration: 1,
				ease: "elastic.out(1,0.3)",
			});
		}
	}

	if ($(".wa-magnetic-btn").length) {
		var waMagnets = document.querySelectorAll(".wa-magnetic-btn");
		var waStrength = 30;

		waMagnets.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet);
			magnet.addEventListener("mouseout", function (event) {
				gsap.to(event.currentTarget, {
					x: 0,
					y: 0,
					duration: 1,
					ease: "elastic.out(1,0.3)",
				});
			});
		});

		function moveMagnet(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();

			gsap.to(magnetButton, {
				x:
					((event.clientX - bounding.left) /
						magnetButton.offsetWidth -
						0.5) *
					waStrength,
				y:
					((event.clientY - bounding.top) /
						magnetButton.offsetHeight -
						0.5) *
					waStrength,
				duration: 1,
				ease: "elastic.out(1,0.3)",
			});
		}
	}

	// slide-text-1
	if ($(".bs-hero-2-marquee-active").length) {
		$(".bs-hero-2-marquee-active").marquee({
			gap: 30,
			speed: 80,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}

	// slide-text-1
	if ($(".bs-preloader-logo").length) {
		$(".bs-preloader-logo").marquee({
			gap: 90,
			speed: 90,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}

	// footer-2-line-2
	if ($(".bs-footer-2-marquee").length) {
		$(".bs-footer-2-marquee").marquee({
			gap: 0,
			speed: 70,
			delayBeforeStart: 0,
			direction: "right",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}
	if ($(".bs-footer-2-marquee-2").length) {
		$(".bs-footer-2-marquee-2").marquee({
			gap: 0,
			speed: 70,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}

	if ($(".bs-marquee-text-1-active").length) {
		$(".bs-marquee-text-1-active").marquee({
			gap: 30,
			speed: 70,
			delayBeforeStart: 0,
			direction: "right",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}

	if ($(".bs-marquee-text-2-active").length) {
		$(".bs-marquee-text-2-active").marquee({
			gap: 30,
			speed: 70,
			delayBeforeStart: 0,
			direction: "right",
			duplicated: true,
			pauseOnHover: false,
			startVisible: true,
		});
	}

	if ($(".bs-work-3-marquee-active").length) {
		$(".bs-work-3-marquee-active").marquee({
			gap: 0,
			speed: 80,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: true,
			startVisible: true,
		});
	}

	// video-4-active
	if ($(".bs-video-4-marquee-active").length) {
		$(".bs-video-4-marquee-active").marquee({
			gap: 50,
			speed: 80,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: true,
			startVisible: true,
		});
	}

	if ($(".bs-brand-4-marquee-active").length) {
		$(".bs-brand-4-marquee-active").marquee({
			gap: 0,
			speed: 80,
			delayBeforeStart: 0,
			direction: "left",
			duplicated: true,
			pauseOnHover: true,
			startVisible: true,
		});
	}

	// counter-activation
	$(".counter").counterUp({
		delay: 10,
		time: 5000,
	});

	if ($(".wa-counter").length) {
		let elements = document.querySelectorAll(".wa-counter");

		elements.forEach((element) => {
			let innerWidth = element.clientWidth;
			element.style.width = innerWidth + "px";
		});
	}

	// bootstrap-tooltip
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	// back-to-top
	if ($(".wa-back-to-top").length) {
		var scrollTopbtn = document.querySelector(".wa-back-to-top");
		var offset = 500;
		var duration = 1000;

		$(window).on("scroll", function () {
			if ($(this).scrollTop() > offset) {
				$(scrollTopbtn).addClass("active");
			} else {
				$(scrollTopbtn).removeClass("active");
			}
		});

		$(scrollTopbtn).on("click", function (event) {
			event.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, duration, "swing");
		});
	}

	// popup-video-activation
	if ($(".popup-video").length) {
		$(".popup-video").magnificPopup({
			type: "iframe",
		});
	}

	// popup-img-activation
	if ($(".popup-img").length) {
		$(".popup-img").magnificPopup({
			type: "image",
			gallery: {
				enabled: true,
			},
		});
	}

	// nice-selector-active
	if ($(".nice-select").length) {
		$(".nice-select select").niceSelect();
	}

	// data-background
	$("[data-background]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-background") + ") "
		);
	});

	// wow-activation
	if ($(".wow").length) {
		var wow = new WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: true,
			live: true,
		});
		wow.init();
	}

	if ($(".copyright-year").length) {
		const currentYear = new Date().getFullYear();
		$(".copyright-year").text(currentYear);
	}

	if ($(".tilt_scale").length) {
		$(".tilt_scale").tilt({
			glare: true,
			maxGlare: 0.5,
		});
	}

	// if ($('priyo').length) {
	// 	nonSmoker();
	// 	earlySleep();
	// 	depressionFree();
	//   } else {
	// 	watchman();
	//   }

	class Cursor {
		constructor(options) {
			this.options = $.extend(
				true,
				{
					container: "body",
					speed: 0.7,
					ease: "expo.out",
					visibleTimeout: 300,
				},
				options
			);
			this.body = $(this.options.container);
			this.el = $('<div class="wa-cursor"></div>');
			this.text = $('<div class="wa-cursor-text"></div>');
			this.init();
		}

		init() {
			this.el.append(this.text);
			this.body.append(this.el);
			this.bind();
			this.move(-window.innerWidth, -window.innerHeight, 0);
		}

		bind() {
			const self = this;

			this.body
				.on("mouseleave", () => {
					self.hide();
				})
				.on("mouseenter", () => {
					self.show();
				})
				.on("mousemove", (e) => {
					this.pos = {
						x: this.stick
							? this.stick.x - (this.stick.x - e.clientX) * 0.15
							: e.clientX,
						y: this.stick
							? this.stick.y - (this.stick.y - e.clientY) * 0.15
							: e.clientY,
					};
					this.update();
				})
				.on("mousedown", () => {
					self.setState("-active");
				})
				.on("mouseup", () => {
					self.removeState("-active");
				})
				.on("mouseenter", "a,input,textarea,button", () => {
					self.setState("-pointer");
				})
				.on("mouseleave", "a,input,textarea,button", () => {
					self.removeState("-pointer");
				})
				.on("mouseenter", "iframe", () => {
					self.hide();
				})
				.on("mouseleave", "iframe", () => {
					self.show();
				})
				.on("mouseenter", "[data-cursor]", function () {
					self.setState(this.dataset.cursor);
				})
				.on("mouseleave", "[data-cursor]", function () {
					self.removeState(this.dataset.cursor);
				})
				.on("mouseenter", "[data-cursor-text]", function () {
					self.setText(this.dataset.cursorText);
				})
				.on("mouseleave", "[data-cursor-text]", function () {
					self.removeText();
				})
				.on("mouseenter", "[data-cursor-stick]", function () {
					self.setStick(this.dataset.cursorStick);
				})
				.on("mouseleave", "[data-cursor-stick]", function () {
					self.removeStick();
				});
		}

		setState(state) {
			this.el.addClass(state);
		}

		removeState(state) {
			this.el.removeClass(state);
		}

		toggleState(state) {
			this.el.toggleClass(state);
		}

		setText(text) {
			this.text.html(text);
			this.el.addClass("-text");
		}

		removeText() {
			this.el.removeClass("-text");
		}

		setStick(el) {
			const target = $(el);
			const bound = target.get(0).getBoundingClientRect();
			this.stick = {
				y: bound.top + target.height() / 2,
				x: bound.left + target.width() / 2,
			};
			this.move(this.stick.x, this.stick.y, 5);
		}

		removeStick() {
			this.stick = false;
		}

		update() {
			this.move();
			this.show();
		}

		move(x, y, duration) {
			gsap.to(this.el, {
				x: x || this.pos.x,
				y: y || this.pos.y,
				force3D: true,
				overwrite: true,
				ease: this.options.ease,
				duration: this.visible ? duration || this.options.speed : 0,
			});
		}

		show() {
			if (this.visible) return;
			clearInterval(this.visibleInt);
			this.el.addClass("-visible");
			this.visibleInt = setTimeout(() => (this.visible = true));
		}

		hide() {
			clearInterval(this.visibleInt);
			this.el.removeClass("-visible");
			this.visibleInt = setTimeout(
				() => (this.visible = false),
				this.options.visibleTimeout
			);
		}
	}
	// Init cursor
	const cursor = new Cursor();
})(jQuery);
