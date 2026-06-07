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

	/*
	lenis-smooth-scroll-activation
*/
	const lenis = new Lenis({
		duration: 1,
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
	gsap.config({
		nullTargetWarn: false,
	});
	PIXI.utils.skipHello();

	/*
	sticky-header-function
*/

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

	/*
	header-3-sticky-function
*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(".as-header-3-area").addClass("has-sticky");
		} else {
			$(".as-header-3-area").removeClass("has-sticky");
		}
	});

	/*
	offcanvas-function
*/

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
		$(".offcanvas_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});

	/*
	mobile-dropdown-function
*/

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

	/*
	search-popup-function
*/

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

	/*
	header-1-toggle
*/
	$(".as-header-1-menu-toggle-btn").on("click", function () {
		$(this).toggleClass("active");

		$(".as-header-1-menu").toggleClass("show");
	});

	/*
	home-3-menu-spy
*/

	if ($(".as-header-3-menu").length) {
		$(window).on("scroll", function () {
			var scrollPos = $(window).scrollTop();
			var windowHeight = $(window).height();

			$("section[id]").each(function () {
				var sectionTop = $(this).offset().top;
				var sectionHeight = $(this).outerHeight();

				if (
					scrollPos + windowHeight * 0.8 >= sectionTop &&
					scrollPos < sectionTop + sectionHeight
				) {
					var id = $(this).attr("id");

					$(".as-header-3-menu a").removeClass("active");
					$('.as-header-3-menu a[href="#' + id + '"]').addClass(
						"active"
					);
				}
			});
		});
	}

	/*
	windows-load-function
*/

	window.addEventListener("load", function () {
		if (document.querySelectorAll(".as-preloader").length) {
			const loader = document.querySelector(".as-preloader");

			setTimeout(() => {
				loader.classList.add("loaded");
				afterPreloader();
			});
			setTimeout(function () {
				loader.remove();
			}, 1500);
		} else {
			afterPreloader();
		}

		afterPageLoad();
	});

	CustomEase.create("ease3", ".44,0,.56,1");
	/*
	after-preloader-start
*/
	function afterPreloader() {
		/*
		only-LTR-direction
	*/
		if (getComputedStyle(document.body).direction !== "rtl") {
			/*
			menu-1-split
		*/
			if ($(".menu_1_split").length) {
				var menu_1_split = $(".menu_1_split a");
				gsap.registerPlugin(SplitText);

				menu_1_split.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "words,chars",
					});

					$(el).on("mouseenter", function () {
						el.split.chars.forEach((char, i) => {
							let yValue = i % 2 === 0 ? -180 : 180;

							gsap.fromTo(
								char,
								{ rotateY: yValue },
								{
									rotateY: 0,
									opacity: 1,
									duration: 0.6,
									ease: "case1",
								}
							);
						});
					});
				});
			}

			/*
			button-animation
		*/
			if ($(".wa_btn_split_1").length) {
				var wa_btn_split_1 = $(".wa_btn_split_1");
				gsap.registerPlugin(SplitText);

				wa_btn_split_1.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "words,chars",
					});

					$(el).on("mouseenter", function () {
						el.split.chars.forEach((char, i) => {
							let yValue = i % 2 === 0 ? -30 : 30;

							gsap.fromTo(
								char,
								{ y: yValue },
								{
									y: 0,
									opacity: 1,
									duration: 0.4,
									ease: "power2.out",
									delay: i * 0.05,
								}
							);
						});
					});
				});
			}

			/*
			wa-split-right
		*/
			if ($(".wa_split_up").length) {
				var wa_split_up = $(".wa_split_up");
				if (wa_split_up.length == 0) return;

				gsap.registerPlugin(SplitText);


				wa_split_up.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					gsap.set(el, { perspective: 400 });

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa_split_up")) {
						gsap.set(el.split.chars, {
							y: 50,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						y: 0,
						opacity: 1,
						duration: 0.3,
						ease: "ease1",
						stagger: 0.15,
						delay: delayValue,
					});
				});
			}

			document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {
				const atSplit = new SplitText(atEl, {
					type: "words,chars",
					wordsClass: "word",
					charsClass: "char",
				});

				let atDuration =
					parseFloat(atEl.getAttribute("data-speed")) || 1;
				let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

				if (window.innerWidth <= 768) {
					atDuration = atDuration * 0.3;
				}

				gsap.set(atSplit.words, {
					willChange: "transform",
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.set(atSplit.chars, {
					willChange: "transform",
					opacity: 0,
					rotateX: -80,
					transformOrigin: "center center -10px",
				});

				gsap.set(atEl, {
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.to(atSplit.chars, {
					scrollTrigger: {
						trigger: atEl,
						start: "top 80%",
					},
					opacity: 1,
					rotateX: 0,
					duration: atDuration,
					delay: atDelay,
					ease: "power3.out",
					stagger: {
						each: 0.05,
						from: "center",
						grid: "auto",
					},
				});
			});

			document.querySelectorAll(".wa_title_split_2").forEach((twbEl) => {
				twbEl.style.display = "block";

				const twbSplit = new SplitText(twbEl, {
					type: "words",
				});
				const twbWords = twbSplit.words;

				const twbY = parseFloat(twbEl.getAttribute("data-y")) || 20;
				const twbRotation =
					parseFloat(twbEl.getAttribute("data-rotation")) || 0;
				const twbBlur =
					parseFloat(twbEl.getAttribute("data-blur")) || 5;
				const twbDuration =
					parseFloat(twbEl.getAttribute("data-duration")) || 0.75;
				const twbStagger =
					parseFloat(twbEl.getAttribute("data-stagger")) || 0.02;
				const twbOpacity = twbBlur > 0 ? 0 : 1;

				if (twbBlur > 0) {
					twbWords.forEach((twbWord) => {
						twbWord.style.opacity = 1;
					});
				}

				let atDelay = parseFloat(twbEl.getAttribute("data-delay")) || 0;

				gsap.from(twbWords, {
					y: twbY,
					rotation: twbRotation,
					filter: `blur(${twbBlur}px)`,
					opacity: twbOpacity,
					duration: twbDuration,
					delay: atDelay,
					stagger: twbStagger,
					ease: "power3.out",
					scrollTrigger: {
						trigger: twbEl,
						start: "top 100%",
						once: true,
					},
				});
			});

			/*
			data-wa-split-1
		*/
			if ($("[data-wa-split-1]").length) {
				var dataWaSplit1 = $("[data-wa-split-1]");
				if (dataWaSplit1.length == 0) return;
				gsap.registerPlugin(SplitText);
				dataWaSplit1.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words",
						linesClass: "split-line",
					});
				});
			}

			/*
			footer-title-animation
		*/
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
							rotate: 90,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 86%",
							toggleActions: "play none none reverse",
						},
						opacity: 1,
						rotate: 0,
						duration: 0.8,
						ease: "back.out(3)",
						stagger: 0.08,
						delay: delayValue,
					});
				});
			}

			/*
			hero-4-title-animation
		*/
			if ($(".wa-split-up2").length) {
				var waSplitup2hero = $(".wa-split-up2");
				if (waSplitup2hero.length == 0) return;
				gsap.registerPlugin(SplitText);
				waSplitup2hero.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa-split-up2")) {
						gsap.set(el.split.chars, {
							scaleY: 1.5,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							toggleActions: "play none none reverse",
						},
						opacity: 1,
						scaleY: 1,
						duration: 0.6,
						ease: "ease1",
						stagger: -0.08,
						delay: delayValue,
					});
				});
			}

			/*
			split-scroll-animation
		*/
			if ($(".as-partner-3-big-title").length) {
				var waSplitup2hero2 = $(".as-partner-3-big-title");
				if (waSplitup2hero2.length == 0) return;
				gsap.registerPlugin(SplitText);
				waSplitup2hero2.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					if ($(el).hasClass("as-partner-3-big-title")) {
						gsap.set(el.split.chars, {
							yPercent: -60,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							end: "top 10%",
							toggleActions: "play none none reverse",
							scrub: true,
						},
						opacity: 1,
						yPercent: 0,
						duration: 0.2,
						ease: "ease1",
						stagger: 0.2,
					});
				});
			}
			var asP3bigTitle = gsap.timeline({
				scrollTrigger: {
					trigger: ".as-partner-3-big-title",
					end: "top 10%",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});

			asP3bigTitle.from(".as-partner-3-big-title", {
				xPercent: 100,
			});
		}

		/*
		hero-3-animation
	*/

		var hero3ani = gsap.timeline({});

		hero3ani.from(".as-hero-3-img-1 img", {
			xPercent: -100,
			duration: 2.5,
			ease: CustomEase.create(
				"custom",
				"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
			),
		});
		hero3ani.from(
			".as-hero-3-img-2 img",
			{
				xPercent: -100,
				duration: 2.5,
				ease: CustomEase.create(
					"custom",
					"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
				),
			},
			"<2%"
		);

		var hero3ani2 = gsap.timeline({});

		hero3ani2.from(".as-hero-3-content .title img", {
			rotation: 360,
			duration: 1,
			ease: CustomEase.create(
				"custom",
				"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
			),
			delay: 1,
		});
		hero3ani2.from(
			".as-hero-3-content .title",
			{
				yPercent: 100,
				opacity: 0,
				duration: 1,
				ease: CustomEase.create(
					"custom",
					"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
				),
			},
			"<"
		);
		hero3ani2.from(
			".as-hero-3-content .disc",
			{
				yPercent: 100,
				opacity: 0,
				duration: 1,
				ease: CustomEase.create(
					"custom",
					"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
				),
			},
			"<50%"
		);
		hero3ani2.from(
			".as-hero-3-big-title",
			{
				yPercent: 100,
				opacity: 0,
				duration: 1,
				ease: CustomEase.create(
					"custom",
					"M0,0 C0.272,0 0.282,0.517 0.35,0.678 0.409,0.821 0.744,1 1,1 "
				),
			},
			"<50%"
		);

		if (window.matchMedia("(min-width: 1200px)").matches) {
			gsap.to(".as-hero-3-pin", {
				scrollTrigger: {
					trigger: ".as-hero-3-height",
					start: "top 0%",
					end: "1100px",
					pin: ".as-hero-3-pin",
					pinSpacing: false,
					markers: false,
				},
			});

			var hero3ani3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".as-hero-3-height",
					start: "top 0%",
					end: "1100px",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});

			hero3ani3.to(".as-hero-3-img-1", {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			});
		}

		// hero-4-animation
		if (window.matchMedia("(min-width: 1200px)").matches) {
			var hero4ani3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".as-hero-4-area",
					start: "top -600px",
					end: "1000px",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});

			hero4ani3.to(".as-home-4-logo-fixed", {
				top: "30px",
			});
			hero4ani3.to(
				".as-home-4-logo-fixed .logo-text",
				{
					fontSize: "50px",
				},
				"<"
			);
		}

		/*
	after-preloader-end
*/
	}

	/*
	after-page-load-start
*/
	function afterPageLoad() {
		/*
		hero-1-img-animation
	*/
		if (window.matchMedia("(min-width: 1200px)").matches) {
			if ($("#wa_liquid_img").length) {
				const waWrapper = document.getElementById("wa_liquid_img");
				const waImg = waWrapper.querySelector("img");
				const waImageURL = waImg.getAttribute("src");
				waImg.remove();

				const { width: waWidth, height: waHeight } =
					waWrapper.getBoundingClientRect();

				const waApp = new PIXI.Application({
					width: waWidth,
					height: waHeight,
					transparent: true,
					autoDensity: true,
					resolution: window.devicePixelRatio,
				});
				waApp.view.style.pointerEvents = "none";

				waWrapper.appendChild(waApp.view);

				const heroElement = document.querySelector('[data-heroImgUrl]');
				let imgUrl = heroElement.dataset.heroimgurl;
				const waDisplacementURL = imgUrl;

				waApp.loader
					.add("waHero", waImageURL)
					.add("waDisplacement", waDisplacementURL)
					.load((waLoader, waResources) => {
						const waContainer = new PIXI.Container();
						waApp.stage.addChild(waContainer);

						const waHero = new PIXI.Sprite(
							waResources.waHero.texture
						);
						waContainer.addChild(waHero);

						const waTextureRatio =
							waHero.texture.width / waHero.texture.height;
						const waContainerRatio = waWidth / waHeight;

						if (waContainerRatio > waTextureRatio) {
							waHero.width = waWidth;
							waHero.height = waWidth / waTextureRatio;
						} else {
							waHero.height = waHeight;
							waHero.width = waHeight * waTextureRatio;
						}

						waHero.x = (waWidth - waHero.width) / 2;
						waHero.y = (waHeight - waHero.height) / 2;

						const waDispSprite = new PIXI.Sprite(
							waResources.waDisplacement.texture
						);
						waDispSprite.texture.baseTexture.wrapMode =
							PIXI.WRAP_MODES.REPEAT;
						const waDispFilter =
							new PIXI.filters.DisplacementFilter(waDispSprite);
						waDispSprite.scale.set(2);
						waApp.stage.addChild(waDispSprite);
						waContainer.filters = [waDispFilter];

						function waPlayDistortionIn() {
							gsap.fromTo(
								waDispFilter.scale,
								{ x: -220, y: -220 },
								{ x: 0, y: 0, duration: 2, ease: "ease1" }
							);
						}
						waPlayDistortionIn();

						waApp.ticker.add(() => {
							waDispSprite.x += 1;
							waDispSprite.y += 1;
						});
					});
			}
		}
		/*
		add-active-class
	*/
		const waAddClass = gsap.utils.toArray(".wa_add_class");
		waAddClass.forEach((waAddClassItem) => {
			gsap.to(waAddClassItem, {
				scrollTrigger: {
					trigger: waAddClassItem,
					start: "top 90%",
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					toggleClass: "active",
					once: true,
					markers: false,
				},
			});
		});

		/*
		wow-activation
	*/
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: "wow",
				animateClass: "animated",
				offset: 50,
				mobile: true,
				live: true,
			});
			wow.init();
		}

		/*
	after-page-load-start
*/
	}

	/*
	hero-1-cursor-effect
*/
	if ($("#wa_cursor_noise").length) {
		const waCanvas = document.getElementById("wa_cursor_noise");
		const waCtx = waCanvas.getContext("2d");

		let waParticles = [];
		const waNoiseColor = "rgba(0,0,0,0.5)";
		const waRadius = 250;
		const waDotSize = 2;

		function waResizeCanvas() {
			waCanvas.width = window.innerWidth;
			waCanvas.height = window.innerHeight;
		}
		waResizeCanvas();
		window.addEventListener("resize", waResizeCanvas);

		class waParticle {
			constructor(x, y) {
				const angle = Math.random() * Math.PI * 2;
				const dist = Math.random() * waRadius;

				this.x = x + Math.cos(angle) * dist;
				this.y = y + Math.sin(angle) * dist;

				this.size = waDotSize;
				this.alpha = 1;
				this.life = 0;
				this.maxLife = 60;

				this.vx = Math.cos(angle) * 1;
				this.vy = Math.sin(angle) * 1;
			}

			update() {
				this.life++;
				this.x += this.vx;
				this.y += this.vy;
				this.alpha -= 0.02;
				if (this.alpha < 0) this.alpha = 0;
			}

			draw() {
				waCtx.fillStyle = waNoiseColor;
				waCtx.globalAlpha = this.alpha;
				waCtx.fillRect(this.x, this.y, this.size, this.size);
				waCtx.globalAlpha = 1;
			}
		}

		window.addEventListener("mousemove", (e) => {
			for (let i = 0; i < 60; i++) {
				waParticles.push(new waParticle(e.clientX, e.clientY));
			}
		});

		function waAnimate() {
			waCtx.clearRect(0, 0, waCanvas.width, waCanvas.height);
			waParticles.forEach((p, i) => {
				p.update();
				p.draw();
				if (p.life > p.maxLife) {
					waParticles.splice(i, 1);
				}
			});
			requestAnimationFrame(waAnimate);
		}
		waAnimate();
	}

	/*
	magnetic-button-animation
*/
	if ($(".wa_magnetic_btn_1").length) {
		var waMagnets = document.querySelectorAll(".wa_magnetic_btn_1");
		var waStrength = 10;

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

	/*
	tilt-1
*/
	$(".wa_tilt").each(function () {
		const $section = $(this);
		const $target = $section.find(".wa_tilt_elm");

		$section.on("mousemove", function (e) {
			const offset = $section.offset();
			const width = $section.outerWidth();
			const height = $section.outerHeight();

			const x = e.pageX - offset.left;
			const y = e.pageY - offset.top;

			const rotateY = (x / width - 0.5) * 11;
			const rotateX = (y / height - 0.5) * -11;

			$target.css({
				transform: `perspective(1000px) rotateY(${rotateY}deg)`,
			});
		});

		$section.on("mouseleave", function () {
			$target.css({
				transform:
					"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
			});
		});
	});

	// wa-bg-parallax
	gsap.utils.toArray(".wa_parallax_bg").forEach((element) => {
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

	// wa-parallax-img
	gsap.utils.toArray(".wa_parallax_img").forEach((element) => {
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

	/*
	hover-elm-moving
*/
	if ($(".wa_magnetic_1_trigger").length) {
		var waMagnets2v2 = document.querySelectorAll(".wa_magnetic_1_trigger");
		var waStrength2v2 = 30;

		waMagnets2v2.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet2);
			magnet.addEventListener("mouseout", function (event) {
				const innerElements =
					event.currentTarget.querySelectorAll(".wa_magnetic_1_elm");
				innerElements.forEach((elm) => {
					gsap.to(elm, {
						x: 0,
						y: 0,
						duration: 1,
						ease: "ease1",
					});
				});
			});
		});

		function moveMagnet2(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();
			const innerElements =
				magnetButton.querySelectorAll(".wa_magnetic_1_elm");

			const xMove =
				((event.clientX - bounding.left) / magnetButton.offsetWidth -
					0.5) *
				waStrength2v2;
			const yMove =
				((event.clientY - bounding.top) / magnetButton.offsetHeight -
					0.5) *
				waStrength2v2;

			innerElements.forEach((elm) => {
				gsap.to(elm, {
					x: xMove,
					y: yMove,
					duration: 1,
					ease: "ease1",
				});
			});
		}
	}

	/*
	button-2-animation
*/
	if (document.querySelectorAll(".as-pr-btn-2").length) {
		document.querySelectorAll(".as-pr-btn-2").forEach((btn) => {
			const icon = btn.querySelector(".icon");
			const text = btn.querySelector(".text");

			function hoverEnter() {
				gsap.timeline()
					.to(icon, {
						left: "-20%",
						duration: 0.2,
						ease: "power4.in",
					})
					.to(icon, {
						left: "calc(100% - 44px)",
						rotation: -45,
						duration: 0.2,
						ease: "power4.in",
					});
				gsap.to(text, { x: -35, duration: 0.2, ease: "power4.in" });
			}

			function hoverLeave() {
				gsap.timeline()
					.to(icon, {
						left: "calc(120% - 44px)",
						duration: 0.2,
						ease: "power4.out",
					})
					.to(icon, {
						left: "3%",
						rotation: 0,
						duration: 0.2,
						ease: "power4.out",
					});
				gsap.to(text, { x: 0, duration: 0.2, ease: "power4.out" });
			}

			btn.addEventListener("mouseenter", hoverEnter);
			btn.addEventListener("mouseleave", hoverLeave);
		});
	}

	/*
	team-1-animation
*/

	if ($(".as-team-1-wrap").length) {
		const teamWrap = document.querySelector(".as-team-1-wrap");
		const members = document.querySelectorAll(".as-team-1-member");

		if (teamWrap) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							members.forEach((member) =>
								member.classList.add("is_active")
							);
						} else {
							members.forEach((member) =>
								member.classList.remove("is_active")
							);
						}
					});
				},
				{ threshold: 0.1 }
			);

			observer.observe(teamWrap);
		}
	}

	if (window.matchMedia("(min-width: 1600px)").matches) {
		var team1ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".t1_ani_trigger",
				start: "top 10%",
				end: "top -70%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		team1ani.from(".as-team-1-member-ani:nth-of-type(1)", {
			x: 1187,
			y: -828,
			scale: 0.7,
		});
		team1ani.from(
			".as-team-1-member-ani:nth-of-type(2)",
			{
				x: 830,
				y: -828,
				scale: 0.7,
			},
			"<50%"
		);
		team1ani.from(
			".as-team-1-member-ani:nth-of-type(3)",
			{
				x: 460,
				y: -828,
				scale: 0.7,
			},
			"<50%"
		);
		team1ani.from(
			".as-team-1-member-ani:nth-of-type(4)",
			{
				x: 100,
				y: -828,
				scale: 0.7,
			},
			"<50%"
		);
	}

	/*
	partner-1-animation
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		var partner1ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".partner1_trigger",
				start: "top 90%",
				end: "top -10%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		partner1ani.from(".as-partner-1-cloud .cloud-1", {
			x: 150,
		});
		partner1ani.from(
			".as-partner-1-cloud .cloud-2",
			{
				x: -150,
			},
			"<"
		);
		partner1ani.from(
			".as-partner-1-cloud .rocket",
			{
				y: 300,
				x: 100,
				rotation: -30,
			},
			"<10%"
		);
	}

	/*
	process-1-animation
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		gsap.to(".p1_pin_elm", {
			scrollTrigger: {
				trigger: ".p1_pin_elm_trigger",
				start: "top 0%",
				end: "900px",
				pin: ".p1_pin_elm",
				pinSpacing: false,
				markers: false,
			},
		});

		var p1ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".p1_pin_elm_trigger",
				start: "top 0%",
				end: "900px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		p1ani.to(".p1_ani_elm:nth-of-type(2)", {
			x: -505,
		});

		p1ani.to(
			".p1_ani_elm:nth-of-type(3)",
			{
				x: -505,
			},
			"<"
		);

		p1ani.to(".p1_ani_elm:nth-of-type(3)", {
			x: -1010,
		});
	}

	/*
	cta-1-animation
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		var cta1ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".cta1_trigger",
				start: "top 50%",
				end: "top top",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		cta1ani.from(".as-cta-1-hand-1", {
			x: 150,
			y: 150,
		});

		cta1ani.from(
			".as-cta-1-hand-2",
			{
				x: -150,
				y: -150,
			},
			"<"
		);

		cta1ani.from(
			".as-cta-1-img-1",
			{
				x: 250,
				rotation: 30,
				opacity: 0,
			},
			"<10%"
		);

		cta1ani.from(
			".as-cta-1-img-2",
			{
				x: -250,
				y: 150,
				rotation: -30,
				opacity: 0,
			},
			"<10%"
		);

		cta1ani.from(
			".as-cta-1-content .title-1",
			{
				x: 100,
				y: -50,
				opacity: 0,
			},
			"<10%"
		);

		cta1ani.from(
			".as-cta-1-content .title-2",
			{
				x: 250,
				y: -150,
				opacity: 0,
			},
			"<10%"
		);

		cta1ani.from(
			".as-cta-1-content .btn-wrap",
			{
				x: 250,
				y: -150,
				opacity: 0,
			},
			"<10%"
		);
	}

	/*
	portfolio-1-pin
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		gsap.to(".portfolio1_pin_elm", {
			scrollTrigger: {
				trigger: ".portfolio1_pin_elm_trigger",
				start: "top 10%",
				end: "bottom 85%",
				pin: ".portfolio1_pin_elm",
				pinSpacing: false,
				markers: false,
			},
		});

		var portfolio1title = gsap.timeline({
			scrollTrigger: {
				trigger: ".portfolio1_pin_elm_trigger",
				start: "top 10%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		portfolio1title.to(".as-portfolio-1-sec-title .big-title", {
			scale: 0.5,
		});
	}

	/*
	testimonial-2-animation
*/
	if (window.matchMedia("(min-width: 1400px)").matches) {
		var portfolio1title = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-testimonial-2-wrap",
				start: "top 40%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		portfolio1title.from(".as_t2_item1", {
			yPercent: 60,
		});
		portfolio1title.from(
			".as_t2_item2",
			{
				yPercent: 60,
			},
			"<"
		);
		portfolio1title.from(
			".as_t2_item3",
			{
				yPercent: -130,
			},
			"<"
		);
		portfolio1title.from(
			".as_t2_item4",
			{
				xPercent: -100,
			},
			"<"
		);
	}

	/*
	firefly-animation
*/
	const paths = document.querySelectorAll(".as-faqs-3-top-bg-dot path");

	paths.forEach((path) => {
		function animatePath() {
			gsap.to(path, {
				opacity: Math.random() > 0.5 ? 1 : 0,
				duration: Math.random() * 0.2 + 0.2,
				delay: Math.random() * 0.1,
				onComplete: animatePath,
				ease: "power1.inOut",
			});
		}
		animatePath();
	});

	/*
	portfolio-2-animation
*/
	if (window.matchMedia("(min-width: 1400px)").matches) {
		gsap.to(".as-portfolio-2-bg-color .circle", {
			scrollTrigger: {
				trigger: ".as-portfolio-2-bg-color",
				start: "bottom-=300 bottom",
				end: "bottom bottom",
				scrub: true,
				markers: false,
			},
			width: "300vh",
			height: "300vh",
			ease: "none",
		});

		gsap.to(".as-portfolio-2-pin", {
			scrollTrigger: {
				trigger: ".as-portfolio-2-height",
				start: "top 10%",
				end: "2900px",
				pin: ".as-portfolio-2-pin",
				pinSpacing: false,
				markers: false,
			},
		});

		var portfolio2ani23 = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-portfolio-2-sec-title",
				start: "bottom+=400 bottom",
				end: "bottom +100px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		portfolio2ani23.from(".as-portfolio-2-main-wrap", {
			scale: 0.25,
			yPercent: -70,
			x: 40,
		});

		var portfolio2ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-portfolio-2-height",
				start: "top 10%",
				end: "2900px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		portfolio2ani.to(
			".as-portfolio-2-item:nth-of-type(1) .as-portfolio-2-item-content",
			{
				opacity: 0,
				duration: 0.5,
			}
		);
		portfolio2ani.to(".as-portfolio-2-item:nth-of-type(1)", {
			height: 0,
		});
		portfolio2ani.to(
			".as-portfolio-2-sm-item-scroll",
			{
				y: -488,
			},
			"<"
		);
		portfolio2ani.to(
			".as-portfolio-2-item:nth-of-type(2) .as-portfolio-2-item-content",
			{
				opacity: 0,
				duration: 0.5,
			}
		);
		portfolio2ani.to(".as-portfolio-2-item:nth-of-type(2)", {
			height: 0,
		});
		portfolio2ani.to(
			".as-portfolio-2-sm-item-scroll",
			{
				y: -976,
			},
			"<"
		);

		var portfolio2ani2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-portfolio-2-height",
				start: "top 40%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
		portfolio2ani2.from(".as-portfolio-2-sm-item", {
			opacity: 0,
			duration: 0.7,
		});

		var portfolio2ani24 = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-portfolio-2-height",
				start: "top 80%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});
		portfolio2ani24.from(".as-portfolio-2-item-content", {
			opacity: 0,
			duration: 0.3,
		});
	}

	// services-2-img
	if (window.matchMedia("(min-width: 1200px)").matches) {
		if ($(".as-services-2-item").length) {
			const featureItems = document.querySelectorAll(
				".as-services-2-item"
			);

			featureItems.forEach((featureItem) => {
				const flair = featureItem.querySelector(".cursor-follow");

				gsap.set(flair, {
					scale: 0,
					opacity: 0,
					xPercent: -50,
					yPercent: -50,
				});

				const xTo = gsap.quickTo(flair, "x", {
					duration: 0.2,
					ease: "power1.out",
				});
				const yTo = gsap.quickTo(flair, "y", {
					duration: 0.2,
					ease: "power1.out",
				});

				featureItem.addEventListener("mouseenter", () => {
					gsap.to(flair, {
						scale: 1,
						opacity: 1,
						duration: 0.2,
						ease: "power1.out",
					});
				});

				featureItem.addEventListener("mousemove", (e) => {
					const rect = featureItem.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					xTo(x);
					yTo(y);
				});

				featureItem.addEventListener("mouseleave", () => {
					gsap.to(flair, {
						scale: 0,
						opacity: 0,
						duration: 0.2,
						ease: "power1.out",
					});
				});
			});
		}
	}

	/*
	faqs-3-top-animation
*/
	if (window.matchMedia("(min-width: 1600px)").matches) {
		var faqs3topAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-faqs-3-top",
				start: "top 20%",
				end: "+=700",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		faqs3topAnimation.to(".as-faqs-3-top-img-1", {
			yPercent: -100,
			xPercent: -120,
		});
		faqs3topAnimation.to(
			".as-faqs-3-top-img-2",
			{
				yPercent: -180,
				xPercent: 60,
			},
			"<"
		);
		faqs3topAnimation.to(
			".as-faqs-3-top-img-3",
			{
				yPercent: -70,
				xPercent: 250,
			},
			"<"
		);
		faqs3topAnimation.to(
			".as-faqs-3-top-img-4",
			{
				yPercent: 100,
				xPercent: 220,
			},
			"<"
		);
		faqs3topAnimation.to(
			".as-faqs-3-top-img-5",
			{
				yPercent: 60,
				xPercent: 200,
			},
			"<"
		);
		faqs3topAnimation.to(
			".as-faqs-3-top-img-7",
			{
				yPercent: 30,
				xPercent: -240,
			},
			"<"
		);
		faqs3topAnimation.to(
			".as-faqs-3-top-img-6",
			{
				yPercent: 150,
				xPercent: -80,
			},
			"<"
		);

		faqs3topAnimation.from(
			".as-faqs-3-top-content",
			{
				opacity: 0,
				scale: 0.5,
			},
			"<10%"
		);
		faqs3topAnimation.from(
			".as-faqs-3-top-bg-circle .boll",
			{
				opacity: 0,
				scale: 0.5,
			},
			"<"
		);

		faqs3topAnimation.to(".as-faqs-3-top-img-1", {
			y: 1600,
			x: 355,
			width: "670px",
			height: "735px",
		});

		gsap.to(".as-faqs-3-accordion-pin", {
			scrollTrigger: {
				trigger: ".as-faqs-3-bottom-height",
				start: "top 10%",
				end: "600px",
				pin: ".as-faqs-3-accordion-pin",
				pinSpacing: false,
				markers: false,
			},
		});

		var faqs3ctopAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-faqs-3-bottom-height",
				start: "top 10%",
				end: "900px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		faqs3ctopAnimation.to(".as-faqs-3-top-img-1", {
			y: 2350,
		});

		var faqs3ctopAnimationv = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-faqs-3-bottom-height",
				start: "top 10%",
				end: "500px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		faqs3ctopAnimationv.from(".as-faqs-3-top-img-1 .inner-video", {
			height: "0px",
		});

		var faqs3ctopAnimationC = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-faqs-3-bottom-height",
				start: "top 10%",
				end: "300px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		faqs3ctopAnimationC.to(".as-faqs-3-accordion", {
			opacity: 0,
		});
	}
	/*
	team-3-animation
*/
	if (window.matchMedia("(min-width: 1600px)").matches) {
		var team3Animation = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-team-3-wrap",
				start: "top 80%",
				end: "top 40%",
				toggleActions: "play none none reverse",
				scrub: 1.5,
				markers: false,
			},
		});

		team3Animation.from(".as-team-3-item:nth-of-type(1)", {
			x: 700,
			rotateY: 70,
			scaleX: 0.5,
			scaleY: 0.5,
			opacity: 0,
		});

		team3Animation.from(
			".as-team-3-item:nth-of-type(2)",
			{
				x: 500,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(3)",
			{
				x: 290,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(4)",
			{
				x: 100,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(5)",
			{
				x: -100,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(6)",
			{
				x: -290,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(7)",
			{
				x: -500,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-item:nth-of-type(8)",
			{
				x: -700,
				rotateY: 70,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-ani-title-1",
			{
				x: 816,
				opacity: 1,
			},
			"<"
		);
		team3Animation.from(
			".as-team-3-ani-title-2",
			{
				x: -770,
				opacity: 1,
			},
			"<"
		);
	}

	/*
	testimonial-3-animation
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".as-testimonial-3-pin", {
			scrollTrigger: {
				trigger: ".as-testimonial-3-area",
				start: "top 0%",
				end: "1650px",
				pin: ".as-testimonial-3-pin",
				pinSpacing: false,
				markers: false,
			},
		});

		var asTestimonial3ani = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-testimonial-3-area",
				start: "top 0%",
				end: "1400px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		asTestimonial3ani.from(".as-testimonial-3-bg-color", {
			width: "3000px",
			height: "3000px",
		});

		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(3)",
			{
				x: 160,
				duration: 0.5,
			}
		);
		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(2)",
			{
				x: 350,
				duration: 0.5,
			},
			"<"
		);
		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(1)",
			{
				x: 600,
				duration: 0.5,
			},
			"<"
		);
		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(5)",
			{
				x: -160,
				duration: 0.5,
			},
			"<"
		);
		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(6)",
			{
				x: -350,
				duration: 0.5,
			},
			"<"
		);
		asTestimonial3ani.from(
			".as-testimonial-3-slider-preview-item:nth-of-type(7)",
			{
				x: -600,
				duration: 0.5,
			},
			"<"
		);
	}

	/*
	project-3-title-img-animation
*/
	if (window.matchMedia("(min-width: 768px)").matches) {
		var project3titleImg = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-projects-3-sec-title",
				start: "top 50%",
				end: "top 20%",
				toggleActions: "play none none reverse",
				scrub: 0.3,
				markers: false,
			},
		});

		project3titleImg.to(".as-projects-3-sec-title .title-img-elm", {
			width: "0px",
		});

		project3titleImg.to(
			".as-projects-3-sec-title .title-2",
			{
				gap: "0px",
			},
			"<"
		);

		project3titleImg.to(
			".as-projects-3-sec-title .title-img",
			{
				gap: "0px",
			},
			"<"
		);
	}

	/*
	services-4-animation
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".as-services-4-pin", {
			scrollTrigger: {
				trigger: ".as-services-4-height",
				start: "top 5%",
				end: "2150px",
				pin: ".as-services-4-pin",
				pinSpacing: false,
				markers: false,
			},
		});

		var asServicesAni = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-services-4-height",
				start: "top -5%",
				end: "2150px",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		asServicesAni.to(".as-services-4-item-img", {
			y: -1200,
		});

		ScrollTrigger.create({
			trigger: ".as-services-4-height",
			start: "top-=500px top",
			end: "2150px",
			scrub: true,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;

				if (progress < 0.33) {
					gsap.to(".as-services-4-item-number", {
						y: -0,
						duration: 0.5,
						ease: "power2.out",
					});
				} else if (progress < 0.66) {
					gsap.to(".as-services-4-item-number", {
						y: -130,
						duration: 0.5,
						ease: "power2.out",
					});
				} else {
					gsap.to(".as-services-4-item-number", {
						y: -280,
						duration: 0.5,
						ease: "power2.out",
					});
				}
			},
		});

		const sections = gsap.utils.toArray(
			".as-services-4-item-list .single-item"
		);
		ScrollTrigger.create({
			trigger: ".as-services-4-height",
			start: "top-=500px top",
			end: "2150px",
			scrub: true,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;
				let activeIndex = 0;

				if (progress < 0.33) {
					activeIndex = 0;
				} else if (progress < 0.66) {
					activeIndex = 1;
				} else {
					activeIndex = 2;
				}

				sections.forEach((el, i) => {
					el.classList.toggle("active", i === activeIndex);
				});
			},
		});

		ScrollTrigger.create({
			trigger: ".as-services-4-height",
			start: "top-=500px top",
			end: "2150px",
			scrub: true,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;

				if (progress < 0.33) {
					gsap.to(".as-services-4-item-title", {
						y: -0,
						duration: 0.5,
						ease: "power2.out",
					});
				} else if (progress < 0.66) {
					gsap.to(".as-services-4-item-title", {
						y: -60,
						duration: 0.5,
						ease: "power2.out",
					});
				} else {
					gsap.to(".as-services-4-item-title", {
						y: -130,
						duration: 0.5,
						ease: "power2.out",
					});
				}
			},
		});

		ScrollTrigger.create({
			trigger: ".as-services-4-height",
			start: "top-=500px top",
			end: "2150px",
			scrub: true,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;

				if (progress < 0.33) {
					gsap.to(".as-services-4-item-disc", {
						y: -0,
						duration: 0.5,
						ease: "power2.out",
					});
				} else if (progress < 0.66) {
					gsap.to(".as-services-4-item-disc", {
						y: -75,
						duration: 0.5,
						ease: "power2.out",
					});
				} else {
					gsap.to(".as-services-4-item-disc", {
						y: -150,
						duration: 0.5,
						ease: "power2.out",
					});
				}
			},
		});
	}

	/*
	testimonial-4-bg-shape
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		var asServicesAni = gsap.timeline({
			scrollTrigger: {
				trigger: ".as-testimonial-4-area",
				start: "top 50%",
				end: "top top",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		asServicesAni.from(".as-testimonial-4-bg-circle", {
			scale: 1.3,
		});
	}

	/*
	faqs-4-animation
*/

	var faqs4star = gsap.timeline({
		scrollTrigger: {
			trigger: ".as-faqs-1-wrap",
			start: "top 50%",
			end: "bottom top",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	faqs4star.from(".as-faqs-4-left-icon i", {
		rotation: 360,
	});

	/*
	marquee-text-3-animation
*/

	var marqueeText3 = gsap.timeline({
		scrollTrigger: {
			trigger: ".as-marquee-text-3-area",
			start: "top bottom",
			end: "bottom top",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	marqueeText3.to(".as_mt3_ani_left", {
		xPercent: -50,
	});

	marqueeText3.from(
		".as_mt3_ani_right",
		{
			xPercent: -50,
		},
		"<"
	);

	/*
	testimonial-1-slider-function
*/
	if ($(".t1_slider_active").length) {
		var t1_slider_active = new Swiper(".t1_slider_active", {
			loop: true,
			speed: 600,
			spaceBetween: 25,
			slidesPerView: "auto",
		});
	}

	/*
	services-4-slider-function
*/
	if ($(".s4_slider_active").length) {
		var t2_slider_active = new Swiper(".s4_slider_active", {
			loop: true,
			speed: 600,
			spaceBetween: 0,
			slidesPerView: "auto",
			direction: "vertical",

			allowTouchMove: false,

			navigation: {
				nextEl: ".sr_s4_next",
				prevEl: ".sr_s4_prev",
			},
		});
	}

	/*
	testimonial-4-slider-active
*/
	if ($(".as_t4_main_slider").length) {
		const as_t4_main_slider = new Swiper(".as_t4_main_slider", {
			loop: true,
			speed: 700,
			slidesPerView: 1,
			spaceBetween: 30,

			effect: "fade",
			fadeEffect: { crossFade: true },

			pagination: {
				el: ".as_t4_pagination",
				clickable: true,
			},

			navigation: {
				nextEl: ".as_t4_next",
				prevEl: ".as_t4_prev",
			},

			autoplay: { delay: 4000 },

			on: {
				slideChangeTransitionStart: function () {
					const previewContainer = document.querySelector(
						".as-testimonial-3-slider-preview"
					);
					const imgs = previewContainer.querySelectorAll("img");

					previewContainer.classList.remove("is_class_fade");
					void previewContainer.offsetWidth;
					previewContainer.classList.add("is_class_fade");

					const srcs = Array.from(imgs).map((img) =>
						img.getAttribute("src")
					);

					const shuffled = srcs.sort(() => Math.random() - 0.5);

					imgs.forEach((img, i) => {
						img.setAttribute("src", shuffled[i]);
					});
				},
			},
		});
	}

	/*
    marquee-right
*/

	$(".wa_marquee_right").marquee({
		speed: 50,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "right",
		duplicated: true,
		pauseOnHover: true,
	});

	/*
    marquee-left
*/

	$(".wa_marquee_left").marquee({
		speed: 50,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "left",
		duplicated: true,
		pauseOnHover: true,
	});

	/*
    marquee-left-nopause
*/
	$(".wa_marquee_left_nopause").marquee({
		speed: 20,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "left",
		duplicated: true,
		pauseOnHover: false,
	});

	/*
    marquee-right-nopause
*/
	$(".wa_marquee_right_nopause").marquee({
		speed: 20,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "right",
		duplicated: true,
		pauseOnHover: false,
	});

	/*
	marquee-down-top
*/
	if ($(".wa_marquee_down_top").length) {
		document
			.querySelectorAll(".wa_marquee_down_top")
			.forEach((waMarqueeTop) => {
				const waMarqueeClone = waMarqueeTop.cloneNode(true);
				waMarqueeTop.parentNode.appendChild(waMarqueeClone);

				const waMarqueeTotalHeight = waMarqueeTop.offsetHeight;

				gsap.to([waMarqueeTop, waMarqueeClone], {
					y: `-${waMarqueeTotalHeight}px`,
					ease: "none",
					duration: 30,
					repeat: -1,
					modifiers: {
						y: gsap.utils.unitize(
							(waY) => parseFloat(waY) % waMarqueeTotalHeight
						),
					},
				});
			});
	}

	/*
	faqs-active-class
*/
	$(document).on("click", ".wa_accordion_item", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	// placeholder-typing
	document
		.querySelectorAll(".wa_placeholder")
		.forEach((waPlaceholderInput) => {
			const waPlaceholderText = waPlaceholderInput.placeholder;
			const waStartDelay = waPlaceholderInput.dataset.startDelay
				? parseInt(waPlaceholderInput.dataset.startDelay)
				: 0;
			let waPlaceholderIndex = 0;
			waPlaceholderInput.placeholder = "";

			const waPlaceholderObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							waPlaceholderType();
							waPlaceholderObserver.unobserve(waPlaceholderInput);
						}
					});
				},
				{ threshold: 0.5 }
			);

			setTimeout(() => {
				waPlaceholderObserver.observe(waPlaceholderInput);
			}, waStartDelay);

			function waPlaceholderType() {
				if (waPlaceholderIndex < waPlaceholderText.length) {
					waPlaceholderInput.placeholder +=
						waPlaceholderText.charAt(waPlaceholderIndex);
					waPlaceholderIndex++;
					setTimeout(waPlaceholderType, 70);
				}
			}
		});

	/*
	bootstrap-tooltip-activation
*/
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/*
	back-to-top-button-function
*/
	if ($(".wa_backToTop").length) {
		var scrollTopbtn = document.querySelector(".wa_backToTop");
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

	/*
	popup-video-activation
*/
	if ($(".popup_video").length) {
		$(".popup_video").magnificPopup({
			type: "iframe",
		});
	}

	/*
	popup-image-activation
*/
	if ($(".popup_img").length) {
		$(".popup_img").magnificPopup({
			type: "image",
			gallery: {
				enabled: true,
			},
		});
	}

	/*
	nice-selector-activation
*/
	if ($(".nice-select").length) {
		$(".nice-select select").niceSelect();
	}

	/*
	background-image-function
*/
	$("[data-background]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-background") + ") "
		);
	});

	/*
	counter-activation
*/

	if ($(".counter").length) {
		$(".counter").counterUp({
			delay: 10,
			time: 5000,
		});

		let elements = document.querySelectorAll(".wa-counter");

		elements.forEach((element) => {
			let innerWidth = element.clientWidth;
			element.style.width = innerWidth + "px";
		});
	}

	/*
    odomater-activation
*/

	$(".odometer").appear(function () {
		var $this = $(this);
		var countNumber = $this.attr("data-count");
		$this.html(countNumber);
	});

	/*
	current-year-function
*/
	if ($(".copyright-year").length) {
		const currentYear = new Date().getFullYear();
		$(".copyright-year").text(currentYear);
	}

})(jQuery);
