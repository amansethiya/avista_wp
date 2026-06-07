(function ($) {
	"use strict";

	function txAfterPreloader(callback) {
		let preloader = document.querySelector(".as-preloader");

		if (preloader) {
			// add fade class
			preloader.classList.add("preloaded");

			setTimeout(function () {
				preloader.remove();
				if (typeof callback === "function") {
					callback();
				}
			}, 1500); // match your preloader timeout
		} else {
			// no preloader found → run immediately
			if (typeof callback === "function") {
				callback();
			}
		}
	}

	// image background
	function bgImageActive($scope, $) {
		$("[data-background]").each(function () {
			$(this).css(
				"background-image",
				"url(" + $(this).attr("data-background") + ") "
			);
		});
	}

	// data-bg-color
	function bgColorActive($scope, $) {
		$("[data-bg-color]").each(function () {
			$(this).css("background-color", $(this).attr("data-bg-color"));
		});
	}

	// functtion tx_post_grid
	function tx_post_grid($scope, $) {
		if ($(".b2_slider_active").length) {
			var b2_slider_active = new Swiper(".b2_slider_active", {
				loop: true,
				speed: 600,
				spaceBetween: 32,
				slidesPerView: "auto",
			});
		}
	}

	// functtion tx_hero_slider
	function tx_hero_slider($scope, $) {
		if ($(".as_h2_slider_active").length) {
			var as_h2_slider_active = new Swiper(".as_h2_slider_active", {
				loop: false,
				speed: 1000,

				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},

				autoplay: {
					delay: 5000,
				},
			});

			as_h2_slider_active.on("reachEnd", function () {
				as_h2_slider_active.autoplay.stop();
			});
		}

		if (document.querySelector(".as_h2_slider_active")) {
			const heroElement = document.querySelector("[data-heroImgUrl]");
			let imgUrl = heroElement.dataset.heroimgurl;
			const WA_DISP_IMG = imgUrl;
			const waTextures = {
				waDisp: PIXI.Texture.from(WA_DISP_IMG),
			};

			initGlassyEffect();

			function waRunGlassyEffectOnSlide(swiper) {
				document
					.querySelectorAll(".wa-pixi-wrap")
					.forEach((el) => el.remove());
				document
					.querySelectorAll(".as-hero-2-slider-item-img img")
					.forEach((img) => {
						img.style.opacity = "1";
					});

				const activeSlide = swiper.slides[swiper.activeIndex];
				if (!activeSlide) return;

				const imgEl = activeSlide.querySelector(
					".as-hero-2-slider-item-img img"
				);
				const imgWrap = activeSlide.querySelector(
					".as-hero-2-slider-item-img"
				);
				if (!imgEl || !imgWrap) return;

				const computedPos = window.getComputedStyle(imgWrap).position;
				if (computedPos === "static")
					imgWrap.style.position = "relative";

				const oldWrap = imgWrap.querySelector(".wa-pixi-wrap");
				if (oldWrap) oldWrap.remove();

				const wrap = document.createElement("div");
				wrap.className = "wa-pixi-wrap";
				wrap.style.position = "absolute";
				wrap.style.inset = "0";
				wrap.style.zIndex = "1";
				wrap.style.pointerEvents = "none";

				const rect = imgWrap.getBoundingClientRect();
				const w = Math.max(1, Math.round(rect.width));
				const h = Math.max(1, Math.round(rect.height));

				imgEl.style.opacity = "0";
				imgWrap.appendChild(wrap);

				const app = new PIXI.Application({
					width: w,
					height: h,
					transparent: true,
					autoDensity: true,
					resolution: window.devicePixelRatio,
				});
				app.view.style.pointerEvents = "none";
				wrap.appendChild(app.view);

				const imgURL = imgEl.getAttribute("src");
				const heroTexture = PIXI.Texture.from(imgURL);

				if (heroTexture.baseTexture.valid) {
					renderSlide(
						app,
						heroTexture,
						waTextures.waDisp,
						w,
						h,
						wrap,
						imgEl
					);
				} else {
					heroTexture.baseTexture.once("loaded", () => {
						renderSlide(
							app,
							heroTexture,
							waTextures.waDisp,
							w,
							h,
							wrap,
							imgEl
						);
					});
				}
			}

			function renderSlide(
				app,
				heroTexture,
				dispTexture,
				w,
				h,
				wrap,
				imgEl
			) {
				const stageContainer = new PIXI.Container();
				app.stage.addChild(stageContainer);

				const hero = new PIXI.Sprite(heroTexture);
				stageContainer.addChild(hero);

				const texRatio = hero.texture.width / hero.texture.height;
				const contRatio = w / h;

				if (contRatio > texRatio) {
					hero.width = w;
					hero.height = w / texRatio;
				} else {
					hero.height = h;
					hero.width = h * texRatio;
				}

				hero.x = (w - hero.width) / 2;
				hero.y = (h - hero.height) / 2;

				const dispSprite = new PIXI.Sprite(dispTexture);
				dispSprite.texture.baseTexture.wrapMode =
					PIXI.WRAP_MODES.REPEAT;
				const dispFilter = new PIXI.filters.DisplacementFilter(
					dispSprite
				);
				dispSprite.scale.set(2);
				app.stage.addChild(dispSprite);
				stageContainer.filters = [dispFilter];

				gsap.fromTo(
					dispFilter.scale,
					{ x: -400, y: -400 },
					{ x: 0, y: 0, duration: 2, ease: "expo.out" }
				);

				app.ticker.add(() => {
					dispSprite.x += 1;
					dispSprite.y += 1;
				});

				wrap._waDestroy = () => {
					try {
						app.destroy(true, {
							children: true,
							texture: false,
							baseTexture: false,
						});
					} catch (e) {}
					if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
					imgEl.style.opacity = "1";
				};
			}

			function initGlassyEffect() {
				const swiperInstance =
					(typeof pg_h2_slider_active !== "undefined" &&
						pg_h2_slider_active) ||
					document.querySelector(".as_h2_slider_active").swiper;

				if (swiperInstance) {
					requestAnimationFrame(() =>
						waRunGlassyEffectOnSlide(swiperInstance)
					);

					swiperInstance.on("slideChangeTransitionStart", () => {
						waRunGlassyEffectOnSlide(swiperInstance);
					});

					window.addEventListener("resize", () => {
						waRunGlassyEffectOnSlide(swiperInstance);
					});

					swiperInstance.on("destroy", () => {
						document
							.querySelectorAll(".wa-pixi-wrap")
							.forEach((w) => {
								if (w._waDestroy) w._waDestroy();
								else w.remove();
							});
					});
				}
			}
		}
	}

	// tx_testimonial
	function tx_testimonial($scope, $) {
		if ($(".as_t3_main_slider").length) {
			const as_t3_main_slider = new Swiper(".as_t3_main_slider", {
				loop: true,
				speed: 700,
				slidesPerView: "auto",
				spaceBetween: 30,
				centeredSlides: true,
				navigation: {
					nextEl: ".as_t3_next",
					prevEl: ".as_t3_prev",
				},
				on: {
					init: function () {
						syncPreview(this);
					},
					slideChange: function () {
						syncPreview(this);
					},
				},
			});

			function syncPreview(swiper) {
				const slides = swiper.slides;
				const previewItems = document.querySelectorAll(
					".as-testimonial-3-slider-preview-item"
				);

				previewItems.forEach((preview, index) => {
					const img = preview.querySelector(".main-img");
					const circle = preview.querySelector(".circle-text");
					const realIndex =
						(swiper.realIndex + index) % slides.length;
					const targetSlide = slides[realIndex];
					const slideImg = targetSlide.querySelector(
						".item-author-img img"
					);
					if (slideImg) {
						img.src = slideImg.src;
					}
				});
			}

			function previewFadeEffect(swiperInstance) {
				const previewContainer = document.querySelector(
					".as-testimonial-3-slider-preview"
				);

				function triggerFade() {
					previewContainer.classList.remove("is_class_fade");
					void previewContainer.offsetWidth;
					previewContainer.classList.add("is_class_fade");
				}
				swiperInstance.on("slideChangeTransitionStart", triggerFade);
			}

			previewFadeEffect(as_t3_main_slider);
		}
	}

	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_hero_section.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_post_grid.default",
			function ($scope, $) {
				tx_post_grid($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_hero_slider.default",
			function ($scope, $) {
				txAfterPreloader(function () {
					tx_hero_slider($scope, $);
				});
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_contact_info.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_testimonial.default",
			function ($scope, $) {
				tx_testimonial($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_footers.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
	});
})(jQuery);
