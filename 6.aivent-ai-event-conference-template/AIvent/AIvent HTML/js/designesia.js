 /* --------------------------------------------------
  * © Copyright 2025 - AIvent by Designesia
  * --------------------------------------------------*/
(function($) {
	'use strict';

     var rtl_mode = 'off'; // on - for enable RTL, off - for deactive RTL
     var preloader = 'on'; // on - for enable preloader, off - for disable preloader
     var header_autoshow = "off"; // on - for enable fixed header, off - for disable fixed header
     var topbar = "on"; // on - for enable fixed header, off - for disable fixed header

     /* predefined vars begin */
     var mobile_menu_show = 0;
     var v_count = '0';
     var mb;
     var instances = [];
     var $window = $(window);
	 var $op_header_autoshow = 0;
	 var grid_size = 10;

     // scroll magic begin
    var new_scroll_position = 0;
    var last_scroll_position;
    var header = $("header");

     /* predefined vars end */
	 
     /* --------------------------------------------------
      * header | sticky
      * --------------------------------------------------*/
     function header_sticky() {
         jQuery("header").addClass("clone", 1000, "easeOutBounce");
         var $document = $(document);
         var vscroll = 0;
		 var header = jQuery("header.autoshow");
         if ($document.scrollTop() >= 50 && vscroll === 0) {
             header.removeClass("scrollOff");
             header.addClass("scrollOn");
             header.css("height", "auto");
             vscroll = 1;
         } else {
             header.removeClass("scrollOn");
             header.addClass("scrollOff");
             vscroll = 0;
         }
     }
     /* --------------------------------------------------
      * plugin | magnificPopup
      * --------------------------------------------------*/
     function load_magnificPopup() {
         jQuery('.simple-ajax-popup-align-top').magnificPopup({
             type: 'ajax',
             alignTop: true,
             overflowY: 'scroll'
         });
         jQuery('.simple-ajax-popup').magnificPopup({
             type: 'ajax'
         });
         // zoom gallery
         jQuery('.zoom-gallery').magnificPopup({
             delegate: 'a',
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             },
             zoom: {
                 enabled: true,
                 duration: 300, // don't foget to change the duration also in CSS
                 opener: function(element) {
                     return element.find('img');
                 }
             }
         });
         // popup youtube, video, gmaps
         jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
             disableOn: 700,
             type: 'iframe',
             mainClass: 'mfp-fade',
             removalDelay: 160,
             preloader: false,
             fixedContentPos: false
         });
         // Initialize popup as usual
         $('.image-popup').magnificPopup({
             type: 'image',
             mainClass: 'mfp-with-zoom', // this class is for CSS animation below

             zoom: {
                 enabled: true, // By default it's false, so don't forget to enable it

                 duration: 300, // duration of the effect, in milliseconds
                 easing: 'ease-in-out', // CSS transition easing function

                 // The "opener" function should return the element from which popup will be zoomed in
                 // and to which popup will be scaled down
                 // By defailt it looks for an image tag:
                 opener: function(openerElement) {
                     // openerElement is the element on which popup was initialized, in this case its <a> tag
                     // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                     return openerElement.is('img') ? openerElement : openerElement.find('img');
                 }
             }

         });
         $('.image-popup-vertical-fit').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             mainClass: 'mfp-img-mobile',
             image: {
                 verticalFit: true
             }
         });
         $('.image-popup-fit-width').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             image: {
                 verticalFit: false
             }
         });
         $('.image-popup-no-margins').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             closeBtnInside: false,
             fixedContentPos: true,
             mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
             image: {
                 verticalFit: true
             },
             zoom: {
                 enabled: true,
                 duration: 300 // don't foget to change the duration also in CSS
             }
         });
         $('.image-popup-gallery').magnificPopup({
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             }
         });
         $('.images-group').each(function() { // the containers for all your galleries
             $(this).magnificPopup({
                 delegate: 'a', // the selector for gallery item
                 type: 'image',
                 gallery: {
                     enabled: true
                 }
             });
         });

         $('.images-popup').magnificPopup({
             delegate: 'a', // child items selector, by clicking on it popup will open
             type: 'image'
             // other options
         });
     }
     /* --------------------------------------------------
      * plugin | enquire.js
      * --------------------------------------------------*/
     function init_resize() {
         enquire.register("screen and (min-width: 993px)", {
             match: function() {
                 mobile_menu_show = 1;
             },
             unmatch: function() {
                 mobile_menu_show = 0;
                 jQuery("#menu-btn").show();
             }
         });
         enquire.register("screen and (max-width: 993px)", {
             match: function() {
                 $('header').addClass("header-mobile");
				 var body = jQuery('body');
                 if (body.hasClass('side-content')) {
                     body.removeClass('side-layout');
                 }
             },
             unmatch: function() {
                 $('header').removeClass("header-mobile");
				 var body = jQuery('body');
                 if (body.hasClass('side-content')) {
                     body.addClass('side-layout');
                 }
             }
         });
         init();
		 
		 var header = $('header');
         header.removeClass('smaller');
         header.removeClass('logo-smaller');
         header.removeClass('clone');

         var mx = window.matchMedia("(max-width: 992px)");
		 var osw = jQuery('.owl-slide-wrapper');
         if (mx.matches) {			 
             osw.find("img").css("height", $(window).innerHeight());
             osw.find("img").css("width", "auto");
			 if($op_header_autoshow===1){
				 header.removeClass('autoshow');
			 }
			 
         } else {
             osw.find("img").css("width", "100%");
             osw.find("img").css("height", "auto");
			 if($op_header_autoshow===1){
				 header.addClass('autoshow');
			 }
         }


     };
     /* --------------------------------------------------
      * plugin | owl carousel
      * --------------------------------------------------*/
     function load_owl() {
        jQuery("#items-carousel").owlCarousel({
            center: false,
            items:4,
            rewind:true,
            margin:25,
            nav:true,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            dots:false,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

        jQuery(".owl-2-cols-center").owlCarousel({
           center:true,
           loop:true,
           margin:30,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:2
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-single-dots").owlCarousel({
            loop:true,
            items: 1,
            nav:false,
            dots:true,
         });

        jQuery("#item-carousel-big").owlCarousel({
           center:true,
           loop:true,
           margin:0,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:4
               },
               600:{
                   items:2
               },
               0:{
                   items:2
               }
           }
        });

        jQuery("#slider-carousel").owlCarousel({
                loop: true,
                items: 1,
                dots: false,
                thumbs: true,
                thumbImage: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });

         jQuery("#item-carousel-big").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:false,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-2-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:2
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-3-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-4-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-4-nomargin").owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            dots:false,
            autoplay:true,
            autoplayTimeout:2000,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });


         jQuery(".owl-single-dots").owlCarousel({
            loop:true,
            items: 1,
            nav:false,
            dots:true,
         });

         var owl = $('#item-carousel-big');
         owl.owlCarousel();
         $('.d-carousel .d-arrow-right').on("click", function() {
             owl.trigger('next.owl.carousel');
         })
         $('.d-carousel .d-arrow-left').on("click", function() {
             owl.trigger('prev.owl.carousel');
         });

         var owl_2 = $('#item-carousel-big-type-2');
         owl_2.owlCarousel();
         $('.d-carousel .d-arrow-right').on("click", function() {
             owl_2.trigger('next.owl.carousel');
         })
         $('.d-carousel .d-arrow-left').on("click", function() {
             owl_2.trigger('prev.owl.carousel');
         });

        jQuery(".rtl #testimonial-carousel").owlCarousel({
            center: false,
            loop:true,
            margin:30,
            rtl: true,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });
		 
         jQuery(".four-cols-center-dots").owlCarousel({
            center: true,
			loop:true,
			margin:25,
			responsive:{
				1200:{
					items:4
				},
                1000:{
                    items:3
                },
				600:{
					items:2
				},
                0:{
                    items:1
                }
			}
         });

         jQuery(".cols-3-dots").owlCarousel({
            center: false,
            loop:true,
            margin:25,
            responsive:{
                1200:{
                    items:3
                },
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".cols-4-dots-center").owlCarousel({
            center: true,
            loop:true,
            margin:25,
            responsive:{
                1200:{
                    items:4
                },
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery("#testimonial-carousel-1-col").owlCarousel({
            center: false,
            loop:true,
            margin:30,
            responsive:{
                1000:{
                    items:1
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });
		 
		 jQuery("#blog-carousel").owlCarousel({
            center: false,
			items:3,
			loop:true,
			margin:25,
			responsive:{
				1000:{
					items:3
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
         });
		 
		 jQuery(".owl-6").owlCarousel({
            center: false,
			items:6,
			loop:true,
			dots: false,
			margin:40,
			autoplay:true,
			autoplayTimeout:2000,
			responsive:{
				1000:{
					items:6
				},
				600:{
					items:4
				},
				0:{
					items:3
				}
			}
         });

		 jQuery("#owl-features").owlCarousel({
            center: true,
			items:4,
			loop:true,
			dots: true,
			margin:25,
			autoplay:false,
			autoplayTimeout:0,
			responsive:{
				1000:{
					items:4
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
         });
		 
         // Custom Navigation owlCarousel
         $(".next").on("click", function() {
             $(this).parent().parent().find('.blog-slide').trigger('owl.next');
         });
         $(".prev").on("click", function() {
             $(this).parent().parent().find('.blog-slide').trigger('owl.prev');
         });

         jQuery('.owl-custom-nav').each(function() {
             var owl = $('.owl-custom-nav').next();
             var ow = parseInt(owl.css("height"), 10);
             $(this).css("margin-top", (ow / 2) - 25);
             owl.owlCarousel();
             // Custom Navigation Events
             $(".btn-next").on("click", function() {
                 owl.trigger('owl.next');
             });
             $(".btn-prev").on("click", function() {
                 owl.trigger('owl.prev');
             });
         });


         // custom navigation for slider
         var ows = $('#custom-owl-slider');
         var arr = $('.owl-slider-nav');
         var doc_height = $(window).innerHeight();
         arr.css("top", (doc_height / 2) - 25);
         ows.owlCarousel();
         // Custom Navigation Events
         arr.find(".next").on("click", function() {
             ows.trigger('owl.next');
         });
         arr.find(".prev").on("click", function() {
             ows.trigger('owl.prev');
         });

         jQuery(".owl-slide-wrapper").on("mouseenter", function() {
             arr.find(".next").css("right", "40px");
             arr.find(".prev").css("left", "40px");
         }).on("mouseleave", function() {
             arr.find(".next").css("right", "-50px");
             arr.find(".prev").css("left", "-50px");
         })
     }

     /* Lenis begin */
     const lenis = new Lenis()

     lenis.on('scroll', (e) => {
       console.log(e)
     })

     function raf(time) {
       lenis.raf(time)
       requestAnimationFrame(raf)
     }

     requestAnimationFrame(raf)
     /* Lenis end */
     
     /* --------------------------------------------------
      * plugin | isotope
      * --------------------------------------------------*/
     function filter_gallery() {
         var $container = jQuery('#gallery');
         $container.isotope({
             itemSelector: '.item',
             filter: '*'
         });
         jQuery('#filters a').on("click", function() {
             var $this = jQuery(this);
             if ($this.hasClass('selected')) {
                 return false;
             }
             var $optionSet = $this.parents();
             $optionSet.find('.selected').removeClass('selected');
             $this.addClass('selected');
             var selector = jQuery(this).attr('data-filter');
             $container.isotope({
                 filter: selector
             });
             return false;
         });
     }

     function masonry() {
         var $container = jQuery('.masonry');
         $container.isotope({
             itemSelector: '.item',
         });
         jQuery('#filters a').on("click", function() {
             var $this = jQuery(this);
             if ($this.hasClass('selected')) {
                 return false;
             }
             var $optionSet = $this.parents();
             $optionSet.find('.selected').removeClass('selected');
             $this.addClass('selected');
             var selector = jQuery(this).attr('data-filter');
             $container.isotope({
                 filter: selector
             });
             return false;
         });
     }
    
     /* --------------------------------------------------
      * back to top
      * --------------------------------------------------*/
     var scrollTrigger = 100; // px
     var t = 0;

     function backToTop() {
         var scrollTop = $(window).scrollTop();
         if (scrollTop > scrollTrigger) {
             $('#back-to-top').addClass('show');
             $('#back-to-top').removeClass('hide');
             $('.show-on-scroll').addClass('show');
             $('.show-on-scroll').removeClass('hide');
             t = 1;
         }

         if (scrollTop < scrollTrigger && t === 1) {
             $('#back-to-top').addClass('hide');
             $('.show-on-scroll').addClass('hide');
         }

         $('#back-to-top').on('click', function(e) {
             e.preventDefault();
             $('html,body').stop(true).animate({
                 scrollTop: 0
             }, 700);
         });
     };
     /* --------------------------------------------------
      * plugin | scroll to
      * --------------------------------------------------*/
     /*!
      * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
      * Scroll smooth to any element in your DOM.
      *
      * Copyright (c) 2012 Yannick Albert (http://yckart.com)
      * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
      * 2013/02/17
      **/
     $.scrollTo = $.fn.scrollTo = function(x, y, options) {
         if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

         options = $.extend({}, {
             gap: {
                 x: 0,
                 y: 0
             },
             animation: {
                 easing: 'easeInOutExpo',
                 duration: 600,
                 complete: $.noop,
                 step: $.noop
             }
         }, options);

         return this.each(function() {

             if (!jQuery('body').hasClass('side-layout')) {
                 var h = 69;
             } else {
                 var h = 0;
             }

             var elem = $(this);
             elem.stop().animate({
                 scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                 scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - h // *edited
             }, options.animation);
         });
     };
     /* --------------------------------------------------
      * counting number
      * --------------------------------------------------*/
     function de_counter() {
         jQuery('.timer').each(function() {
             var imagePos = jQuery(this).offset().top;
             var topOfWindow = jQuery(window).scrollTop();
             if (imagePos < topOfWindow + jQuery(window).height() && v_count === '0') {
                 jQuery(function($) {
                     // start all the timers
                     jQuery('.timer').each(count);

                     function count(options) {
                         v_count = '1';
                         var $this = jQuery(this);
                         options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                         $this.countTo(options);
                     }
                 });
             }
         });
     }
     /* --------------------------------------------------
      * progress bar
      * --------------------------------------------------*/

     function text_rotate() {
         var quotes = $(".text-rotate-wrap .text-item");
         var quoteIndex = -1;

         function showNextQuote() {
             ++quoteIndex;
             quotes.eq(quoteIndex % quotes.length)
                 .fadeIn(1)
                 .delay(1500)
                 .fadeOut(1, showNextQuote);
         }

         showNextQuote();

     };
     /* --------------------------------------------------
      * custom background
      * --------------------------------------------------*/
     function custom_bg() {
         $("body,div,section,span,form,img").css('background-color', function() {
            if ($(this).is('[data-bgcolor]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgcolor');
         });
         $("body,div,section").css('background', function() {
            if ($(this).is('[data-bgimage]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgimage');
         });
         $("body,div,section").css('background-size', function() {
             return 'cover';
         });

         $("body,div,section").css('background-repeat', function() {
             return 'no-repeat';
         });
     }
     /* --------------------------------------------------
      * custom elements
      * --------------------------------------------------*/
     function custom_elements() {
         // --------------------------------------------------
         // tabs
         // --------------------------------------------------
         jQuery('.de_tab').find('.de_tab_content > div').hide();
         jQuery('.de_tab').find('.de_tab_content > div:first').show();
         jQuery('li').find('.v-border').fadeTo(150, 0);
         jQuery('li.active').find('.v-border').fadeTo(150, 1);
         jQuery('.de_nav li').on("click", function() {
             jQuery(this).parent().find('li').removeClass("active");
             jQuery(this).addClass("active");
             jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
             jQuery(this).parent().parent().find('.de_tab_content > div').hide();
             var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
             jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
             jQuery(this).find('.v-border').fadeTo(150, 1);
         });
     }
     /* --------------------------------------------------
      * add arrow for mobile menu
      * --------------------------------------------------*/
     function menu_arrow() {
         // mainmenu create span
         jQuery('#mainmenu li a').each(function() {
             if ($(this).next("ul").length > 0) {
                 $("<span></span>").insertAfter($(this));
             }
         });
         // mainmenu arrow click
         jQuery("#mainmenu > li > span").on("click", function() {
             
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     $(this).addClass("active");
                     $(this).parent().find("ul:first").css("height", "auto");
                     var curHeight = $(this).parent().find("ul:first").height();
                     $(this).parent().find("ul:first").css("height", "0");
                     $(this).parent().find("ul:first").animate({
                         'height': curHeight
                     }, 300, 'easeOutQuint');
                     break;
                 case 2:
					var curHeight = $(this).parent().find("ul:first").height();
                     $(this).removeClass("active");
                     $(this).parent().find("ul:first").animate({
                         'height': "0"
                     }, 300, 'easeOutQuint');
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
         jQuery("#mainmenu > li > ul > li > span").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     $(this).addClass("active");
                     $(this).parent().find("ul:first").css("height", "auto");
                     $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                     var curHeight = $(this).parent().find("ul:first").height();
                     $(this).parent().find("ul:first").css("height", "0");
                     $(this).parent().find("ul:first").animate({
                         'height': curHeight
                     }, 400, 'easeInOutQuint');
                     break;
                 case 2:
                     $(this).removeClass("active");
                     $(this).parent().find("ul:first").animate({
                         'height': "0"
                     }, 400, 'easeInOutQuint');
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });

         
     }
     /* --------------------------------------------------
      * show gallery item sequence
      * --------------------------------------------------*/
     function sequence() {
         var sq = jQuery(".sequence > .gallery-item .de-item,.sequence > .gallery-item .d_demo_img");
         var count = sq.length;
		 sq.addClass("fadeIn");
         sq.find("img").addClass("scaleIn");
         for (var i = 0; i <= count; i++) {
             var sqx = jQuery(".sequence > .gallery-item:eq(" + i + ") .de-item");
			 sqx.attr('data-wow-delay', (i / 8) + 's');
             sqx.find("img").attr('data-wow-delay', (i / 16) + 's');
         }
     }
     /* --------------------------------------------------
      * show gallery item sequence
      * --------------------------------------------------*/
     function sequence_a() {
         var sq = jQuery(".sequence").find(".sq-item");
         var count = sq.length;
         sq.addClass("fadeInUp");
         for (var i = 0; i <= count; i++) {
             var sqx = jQuery(".sequence").find(".sq-item:eq(" + i + ")");
             sqx.attr('data-wow-delay', (i / 8) + 's');
			 sqx.attr('data-wow-speed', '1s');
         }
     }
     /* --------------------------------------------------
      * custom scroll
      * --------------------------------------------------*/
     $.fn.moveIt = function() {
         $(this).each(function() {
             instances.push(new moveItItem($(this)));
         });
     }

     function moveItItemNow() {
         var scrollTop = $window.scrollTop();
         instances.forEach(function(inst) {
             inst.update(scrollTop);
         });
     }

     function moveItItem(el) {
         this.el = $(el);
         this.speed = parseInt(this.el.attr('data-scroll-speed'));
     };
     moveItItem.prototype.update = function(scrollTop) {
         var pos = scrollTop / this.speed;
         this.el.css('transform', 'translateY(' + pos + 'px)');
     };
     $(function() {
         $('[data-scroll-speed]').moveIt();
     });
     /* --------------------------------------------------
      * multiple function
      * --------------------------------------------------*/
     function init() {
         var sh = jQuery('#de-sidebar').css("height");
         var dh = jQuery(window).innerHeight();
         var h = parseInt(sh) - parseInt(dh);

         function scrolling() {
             var mq = window.matchMedia("(min-width: 993px)");
             var ms = window.matchMedia("(min-width: 768px)");
             if (mq.matches) {
                 var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                     shrinkOn = 0,
                     header = jQuery("header");
                 if (distanceY > shrinkOn) {
                     header.addClass("smaller");
                 } else {
                     if (header.hasClass('smaller')) {
                         header.removeClass('smaller');
                     }
                 }
             }
             if (mq.matches) {
                 if (jQuery("header").hasClass("side-header")) {
                     if (jQuery(document).scrollTop() >= h) {
                         jQuery('#de-sidebar').css("position", "fixed");
                         if (parseInt(sh) > parseInt(dh)) {
                             jQuery('#de-sidebar').css("top", -h);
                         }
                         jQuery('#main').addClass("col-md-offset-3");
                         jQuery('h1#logo img').css("padding-left", "7px");
                         jQuery('header .h-content').css("padding-left", "7px");
                         jQuery('#mainmenu li').css("width", "103%");
                     } else {
                         jQuery('#de-sidebar').css("position", "relative");
                         if (parseInt(sh) > parseInt(dh)) {
                             jQuery('#de-sidebar').css("top", 0);
                         }
                         jQuery('#main').removeClass("col-md-offset-3");
                         jQuery('h1#logo img').css("padding-left", "0px");
                         jQuery('header .h-content').css("padding-left", "0px");
                         jQuery('#mainmenu li').css("width", "100%");
                     }
                 }

             }
         }

         // --------------------------------------------------
         // looping background
         // --------------------------------------------------

         scrolling();
         
         jQuery(".filter__r").on("click", function() {
            jQuery('.activity-filter > li').removeClass('active');
            jQuery('.activity-list > li').show();   
         });

         jQuery(".btn-close").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     jQuery('#popup-box').addClass('popup-hide');
                     jQuery('#popup-box').removeClass('popup-show');
                     break;
                 case 2:

                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });

         jQuery('#extra-content').addClass('wow');

         jQuery("#btn-extra").on("click", function() {
            jQuery('#extra-wrap').addClass('open');
         });

         jQuery("#btn-close").on("click", function() {
            jQuery('#extra-wrap').removeClass('open');
         });
         
     }
	 
     // rtl begin //
      if (rtl_mode==="on") {
            jQuery("body").addClass('rtl');
            jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
            jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.css');
            jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.css');
            jQuery("#mdb").attr("href", 'css/mdb.rtl.min.css');
            jQuery('html').attr("dir","rtl")
        };
     // rtl end // 

     if(preloader==="off"){
            jQuery("#de-loader").hide();
     }

     if(topbar==="off"){
            jQuery("#topbar").hide();
            jQuery('header').removeClass('has-topbar')
     }

     function f_rtl(){
         jQuery("#selector #demo-rtl").on("click", function() {
            var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     jQuery("body").addClass('rtl');
                     jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
                     jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.css');
                     jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.css');
                     jQuery('html').attr("dir","rtl");
                     jQuery(this).find(".sc-val").text('Click to Disable');
                     break;
                 case 2:
                    jQuery("body").removeClass('rtl');
                    jQuery("#bootstrap").attr("href", 'css/bootstrap.min.css');
                    jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.min.css');
                    jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.min.css');
                    jQuery('html').attr("dir","ltr");
                    jQuery(this).find(".sc-val").text('Click to Enable');
                    break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
     }

     jQuery("#dark-mode").on("click", function() {
        if(jQuery('body').hasClass('dark-scheme')){
            window.location.href = 'https://www.designesia.com/themes/gospace/index.html';
        }else{
            window.location.href = 'https://www.designesia.com/themes/gospace/02_dark-index.html';
        }
     });

	 function grid_gallery() {
            jQuery('.grid-item').each(function () {
                var this_col = Number(jQuery(this).parent().attr('data-col'));
                var this_gridspace = Number(jQuery(this).parent().attr('data-gridspace'));
                var this_ratio = eval($(this).parent().attr('data-ratio'));
                jQuery(this).parent().css('padding-left', this_gridspace);
                var w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
                var gi = $(this);
                var h = w * this_ratio;
                gi.css('width', w)
                gi.css('height', h);
                gi.find(".pf_title").css('margin-top', (h / 2) - 10);
                gi.css('margin-right', this_gridspace);
                gi.css('margin-bottom', this_gridspace);
				$(this).parent().css('padding-top',this_gridspace);
                if (gi.hasClass('large')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', (h * 2) + this_gridspace);
                }
                if (gi.hasClass('large-width')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', h);
                }
                if (gi.hasClass('large-height')) {
                    $(this).css('height', (h * 2) + this_gridspace);
                    gi.find(".pf_title").css('margin-top', (h) - 20);
                }
            })
        }

     /* --------------------------------------------------
      * progress bar
      * --------------------------------------------------*/
     function de_progress() {
         jQuery('.de-progress').each(function() {
             var pos_y = jQuery(this).offset().top;
             var value = jQuery(this).find(".progress-bar").attr('data-value');
             var topOfWindow = jQuery(window).scrollTop();
             if (pos_y < topOfWindow + 550) {
                 jQuery(this).find(".progress-bar").css({
                     'width': value
                 }, "slow");
             }

             jQuery(this).find('.value').text(jQuery(this).find('.progress-bar').attr('data-value'));
         });
     }

     function de_countdown() {
         $('.de_countdown').each(function() {
             var y = $(this).data('year');
             var m = $(this).data('month');
             var d = $(this).data('day');
             var h = $(this).data('hour');
             $(this).countdown({until: new Date(y, m-1, d, h)});
         });
    }

    // --------------------------------------------------
    // custom dropdown
    // --------------------------------------------------   
    function dropdown(e){
        var obj = $(e+'.dropdown');
        var btn = obj.find('.btn-selector');
        var dd = obj.find('ul');
        var opt = dd.find('li');
        
            obj.on("mouseenter", function() {
                dd.show();
            }).on("mouseleave", function() {
                dd.hide();
            })
            
            opt.on("click", function() {
                dd.hide();
                var txt = $(this).text();
                opt.removeClass("active");
                $(this).addClass("active");
                btn.text(txt);
            });
    }

    function de_share(){
        var url = window.location.href;
        $('.fa-twitter').on("click", function() { window.open('https://twitter.com/share?url='+url,'_blank'); });
        $('.fa-facebook').on("click", function() { window.open('https://www.facebook.com/sharer/sharer.php?u='+url,'_blank'); });
        $('.fa-reddit').on("click", function() { window.open('http://www.reddit.com/submit?url='+url,'_blank'); });
        $('.fa-linkedin').on("click", function() { window.open('https://www.linkedin.com/shareArticle?mini=true&url='+url,'_blank'); });
        $('.fa-pinterest').on("click", function() { window.open('https://www.pinterest.com/pin/create/button/?url='+url,'_blank'); });
        $('.fa-stumbleupon').on("click", function() { window.open('http://www.stumbleupon.com/submit?url='+url,'_blank'); });
        $('.fa-delicious').on("click", function() { window.open('https://delicious.com/save?v=5&noui&jump=close&url='+url,'_blank'); });
        $('.fa-envelope').on("click", function() { window.open('mailto:?subject=Share With Friends&body='+url,'_blank'); });

    }

    function owlnavcenter(){
     jQuery('.owl-custom-nav').each(function () {
         var owl = $($(this).data('target'));

         // Custom Navigation Events
         $(".btn-next").on("click", function () {
             owl.trigger('next.owl.carousel');
         });
         $(".btn-prev").on("click", function () {
             owl.trigger('prev.owl.carousel');
         });
     });
    }

    function de_tabs(){
        $('.de-tab').each(function() {
            var activeIndex = $(this).find('.active-tab').index(),
                 $contentlis = $(this).find('.d-tab-content > li'),
                 $tabslis = $(this).find('.d-tab-nav > li');
             
             // Show content of active tab on loads
             $contentlis.eq(activeIndex).show();

             $(this).find('.d-tab-nav').on('click', 'li', function (e) {
               var $current = $(e.currentTarget),
                   index = $current.index();
               
               $tabslis.removeClass('active-tab');
               $current.addClass('active-tab');
               $contentlis.hide().eq(index).fadeIn();
                });
        });
    }

    function menu_active(){
        const sections = document.querySelectorAll("section");
        const menuLinks = document.querySelectorAll("#mainmenu a");

        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach((section) => {
              const sectionTop = section.offsetTop;
              if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
              }
        });

        menuLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
                }
            });
        });
    }

    // goto specific anchor on page load begin
    var hash = window.location.hash;

        if (hash) {
            // Wait a moment in case elements are still rendering
            setTimeout(function () {
                var target = jQuery(hash);
                if (target.length) {
                    // Scroll to the anchor smoothly
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 600);

                    // Optional: highlight nav link
                    jQuery('#mainmenu li a').removeClass('active');
                    jQuery('#mainmenu li a[href="' + hash + '"]').addClass('active');
                }
            }, 300); // Delay for rendering
        }
        // goto specific anchor on page load end

     /* --------------------------------------------------
      * document ready
      * --------------------------------------------------*/
     $(function(){
        $('#de-loader').prepend($('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'));
         'use strict';
         f_rtl();         
         $(".jarallax").jarallax();
         load_magnificPopup();
		 grid_gallery();
         init_resize();
         de_progress();
         de_countdown();
         de_share();
         de_tabs();
         owlnavcenter();
         menu_active();
        $(function() {
            $('.lazy').lazy();
        });

        // button effect //

        $('.fx-slide').each(function() {
            var text = jQuery(this).text();
            jQuery(this).attr('data-hover',text);
        });

        // switch

        $('.opt-2').css('display','none');

         $("#sw-1").on("click", function() {
            if($(this).is(":checked")){
                $('.opt-1').css('display','none');
                $('.opt-2').css('display','inline-block');
            }else{
                $('.opt-2').css('display','none');
                $('.opt-1').css('display','inline-block');
            }
        });

         /* de-number begin */

         $('.d-minus').on("click", function() {
             var $input = $(this).parent().find('input');
             var count = parseInt($input.val()) - 1;
             count = count < 0 ? 0 : count;
             $input.val(count);
             $input.change();
             return false;
         });
         $('.d-plus').on("click", function() {
             var $input = $(this).parent().find('input');
             var count = parseInt($input.val()) + 1;
             count = count > 10 ? 10 : count;
              $input.val(count);
             $input.change();
             return false;
         });
         /* de-number close */

         // --------------------------------------------------
         // custom positiion
         // --------------------------------------------------
         var $doc_height = jQuery(window).innerHeight();
         jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
         jQuery('.full-height .de-video-container').css("min-height", $doc_height);

		 
		if(jQuery('header').hasClass("autoshow")){
			$op_header_autoshow = 1;
		}

        $('#mainmenu > li:has(ul)').addClass('menu-item-has-children');

        $(".d-item").slice(0, 8).show();
          $("#loadmore").on("click", function(e){
            e.preventDefault();
            $(".d-item:hidden").slice(0, 4).slideDown();
            if($(".d-item:hidden").length === 0) {
              //$("#loadmore").text("No Content").addClass("noContent");
              $("#loadmore").hide();
            }
        });

         $('#mainmenu li:has(ul)').addClass('has-child');

         // carousel hover
         jQuery(".d-carousel").on("mouseenter", function() {
             jQuery('.d-arrow-left').fadeTo(50, 1);
             jQuery('.d-arrow-right').fadeTo(50, 1);
         }).on("mouseleave", function() {
             jQuery('.d-arrow-left').fadeTo(50, 0);
             jQuery('.d-arrow-right').fadeTo(50, 0);
         })

         function formatState (state) {
           if (!state.id) { return state.text; }
           var $state = $(
             '<span><img src="' + $(state.element).attr('data-src') + '" class="img-flag" /> ' + state.text + '</span>'
           );
           return $state;
         };

        skrollr.init();
        var s = skrollr.init();
        if (s.isMobile()) {
            s.destroy();
        }        
         
         // --------------------------------------------------
         // navigation for mobile
         // --------------------------------------------------
         jQuery('#menu-btn').on("click", function() {

            var h = jQuery('header')[0].scrollHeight;
			
             if (mobile_menu_show === 0) {
                 jQuery('header').addClass('menu-open');
                 jQuery('header').css('height',$(window).innerHeight());
                 mobile_menu_show = 1;
                 jQuery(this).addClass("menu-open");
             } else {
                jQuery('header').removeClass('menu-open');
                jQuery('header').css('height','auto');
                 mobile_menu_show = 0;
                 jQuery(this).removeClass("menu-open");
             }
         })
         
         jQuery('#mainmenu > li > a').on("click", function() {
             jQuery('header').removeClass('menu-open');
             jQuery('header').css('height', 'auto');
             mobile_menu_show = 0;
             jQuery('#menu-btn').removeClass("menu-open");
         });


         jQuery("a.btn").on("click", function(evn) {
             if (this.href.indexOf('#') === -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         // btn arrow up
         jQuery(".arrow-up").on("click", function() {
             jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
                 jQuery("#hide-content").fadeIn(600, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '-40px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '0'
                     }, "slow");
                 });
             });
         });
         // btn arrow down
         jQuery(".arrow-down").on("click", function() {
             jQuery("#hide-content").fadeOut("slow", function() {
                 jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '0px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '-40'
                     }, "slow");
                 });
             });
         });
         /* --------------------------------------------------
          after window load
          * --------------------------------------------------*/
		 
        setTimeout(function () {
        $("#cookieConsent").fadeIn(400);
         }, 2000);
        $("#closeCookieConsent, .cookieConsentOK").on("click", function() {
            $("#cookieConsent").fadeOut(400);
        });

        $(".switch-with-title .checkbox").change(function() {
            if(this.checked) {
                jQuery(this).parent().parent().find('.hide-content').show();
            }else{
                jQuery(this).parent().parent().find('.hide-content').hide();
            }
        });
         custom_bg();
         menu_arrow();
         load_owl();
         custom_elements();
         init(); 
         
         new WOW().init();

         
         // one page navigation
         /**
          * This part causes smooth scrolling using scrollto.js
          * We target all a tags inside the nav, and apply the scrollto.js to it.
          */
         $("#homepage nav a, .scroll-to").on("click", function(evn) {
             if (this.href.indexOf('#') === -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         sequence();
         sequence_a();
	
		$('.accordion-section-title').on("click", function(e) {
         var currentAttrvalue = $(this).data('tab');
         if($(e.target).is('.active')){
             $(this).removeClass('active');
             $('.accordion-section-content:visible').slideUp(300);
         } else {
             $('.accordion-section-title').removeClass('active').filter(this).addClass('active');
             $('.accordion-section-content').slideUp(300).filter(currentAttrvalue).slideDown(300);
         }
        });

        jQuery.each(jQuery('textarea[data-autoresize]'), function() {
            var offset = this.offsetHeight - this.clientHeight;
         
            var resizeTextarea = function(el) {
                jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
            };
            jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
        });
		

         /* --------------------------------------------------
          * window | on resize
          * --------------------------------------------------*/
         $(window).resize(function() {
             init_resize();
			 grid_gallery();
         });

         /* --------------------------------------------------
          * window | on scroll
          * --------------------------------------------------*/
         jQuery(window).on("scroll", function() {
             /* functions */
             header_sticky();
             de_counter();
             de_progress();
             init();
             backToTop();
             moveItItemNow();
			 
             /* fade base scroll position */
             var target = $('.fadeScroll');
             var targetHeight = target.outerHeight();
             var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
             if (scrollPercent >= 0) {
                 target.css('opacity', scrollPercent);
             } else {
                 target.css('opacity', 0);
             }
             /* go to anchor */
             jQuery('#mainmenu li a').each(function() {
                 var cur = jQuery(this);
                 if (this.href.indexOf('#') === -1) {
                     var href = jQuery(this).attr('href');
					
                 }
             });

             // scroll magic begin
               if (Array.prototype.some.call($('.section-dark'), function(element) {
                var h = $(window).innerHeight();
                var scrollPosition = $(window).scrollTop()+h/2;
                var elementTop = $(element).offset().top;
                var elementBottom = $(element).outerHeight() + elementTop;
                if (scrollPosition > elementTop && scrollPosition < elementBottom) {
                  return true;
                }
                else {
                  return false;
                }
               })) {
                $('.float-text').addClass('dark');
                $('.scrollbar-v').addClass('dark');
               } else {
                $('.float-text').removeClass('dark');
                $('.scrollbar-v').removeClass('dark');
               }
             // scroll magic close

             if(header_autoshow==="on"){
                 last_scroll_position = window.scrollY;

                 // Scrolling down
                 if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
                   // header.removeClass('slideDown').addClass('nav-up');
                   header.addClass("scroll-down");
                   header.removeClass("nav-up");

                 // Scrolling up
                 } else if (new_scroll_position > last_scroll_position) {
                   // header.removeClass('nav-up').addClass('slideDown');
                   header.removeClass("scroll-down");
                   header.addClass("nav-up");
                 }

                 new_scroll_position = last_scroll_position;
            }

            // scroll indicator
            var pixels = $(document).scrollTop();
            var pageHeight = $(document).height() - $(window).height();
            var progress = (100 * pixels) / pageHeight;
            $("div.scrollbar").css("width", progress + "%");
            $("div.scrollbar-v").css("height", progress + "px");


         });
         $(function() {
             "use strict";
             var x = 0;
             setInterval(function() {
                 x -= 1;
                 $('.bg-loop').css('background-position', x + 'px 0');
             }, 50);
         })
		 
		
     });

    $(window).on('load', function() {
        jQuery('#de-loader').fadeOut(500);
        filter_gallery();
        load_owl();  
        window.dispatchEvent(new Event('resize'));        
         filter_gallery();
         masonry();

        $('.grid').isotope({
            itemSelector: '.grid-item'
        });
        grid_gallery();
    });
    
 })(jQuery);