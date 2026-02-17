/*
1. timing Function
2. carousels
  2-1. home page subtitle carousel
  2-2. testimonials carousel
  2-3. news carousel
  2-4. home carousel slider
  2-5. about section images carousel
3. scrollTo
4. scrollToTop
5. preloader
6. parallax
7. facts counter
8. onScroll animations
  8-1. home fadeOut animation
  8-2. to top arrow animation
9. forms
  9-1. contact form
  9-2. newsletter form
10. YTPlayer
11. skills bar
12. menu active state
13. navigation - style #3
  13-1. height.Adjustment
  13-2. search form
  13-3. search form additional CLOSER
14. Vimeo player
15. swiper thumbnail slider
16. slick slider
  16-1. slick fullscreen
  16-2. slick fullscreen SPLIT
17. google maps POSITION
18. the Wall
*/


$(function() {
    "use strict";
	
	
    // 1. timing Function
    var timingFunction = "easeInOutQuart";
	
    // 2. carousels
    // 2-1. home page subtitle carousel
    $(".home-page-subtitle-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: false,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
        responsiveRefreshRate: 50
    });
    // 2-2. testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: false,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        responsiveRefreshRate: 50
    });
    // 2-3. news carousel
    $("#news-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
    // 2-4. home carousel slider
    $("#home-page-img-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
    // 2-5. about section images carousel
    $(window).on("resize", function() {
        if ($(window).width() < 1024) {
            $(".about-section-images-carousel").owlCarousel({
                loop: true,
                autoplay: true,
                autoplaySpeed: 1000,
                autoplayTimeout: 5000,
                items: 1,
                margin: 0,
                center: true,
                dots: false,
                nav: true,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: true,
                responsiveRefreshRate: 50,
                navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"]
            });
        } else {
            $(".about-section-images-carousel").trigger("destroy.owl.carousel");
        }
    }).trigger("resize");
	
    // 3. scrollTo
    $("[data-scroll-to]").on("click", function(e) {
        e.preventDefault();
        var scroll_element = "#" + $(this).data("scroll-to");
        var scrollOffset = $(scroll_element).offset().top;
        $("html, body").animate({
            scrollTop: scrollOffset
        }, 1400, timingFunction);
    });
	
    // 4. scrollToTop
    $(".scrollToTop").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1400, timingFunction);
    });
	
    $(window).on("load", function() {
        // 5. preloader
        $("#preloader").delay(400).fadeOut(400, timingFunction);
    });
	
    // 6. parallax
    $(".parallax-window").parallax(10);
	
    // 7. facts counter
    $(".facts-counter-number").appear(function() {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });
	
    // 8. onScroll animations
    $(window).on("scroll", function() {
        // 8-1. home fadeOut animation
        $("h1.home-page-title, h2.home-page-title, .play-video-btn, .slick-fullscreen-info").css("opacity", 1 - $(window).scrollTop() / $(".hero-fullscreen, #viewport").height());
        // 8-2. to top arrow animation
        if ($(this).scrollTop() > 400) {
            $(".to-top-arrow").addClass("show");
        } else {
            $(".to-top-arrow").removeClass("show");
        }
    });
	
    // 9. forms
    // 9-1. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
    // 9-2. newsletter form
    $("form#subscribe").on("submit", function() {
        $("form#subscribe .subscribe-error").remove();
        var s = !1;
        if ($(".subscribe-requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter your Email</span>'),
                    $(this).addClass("inputError"), s = !0;
                else if ($(this).hasClass("subscribe-email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter a valid Email</span>'),
                        $(this).addClass("inputError"), s = !0);
                }
            }), !s) {
            $("form#subscribe input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#subscribe").slideUp("fast", function() {
                    $(this).before('<div class="subscribe-success">Thank you for subscribing.</div>');
                });
            });
        }
        return !1;
    });
	
    // 10. YTPlayer
    $("#background-video").YTPlayer({
        videoId: "r8j-MWq4HZc", // DEMO URL is: https://www.youtube.com/watch?v=r8j-MWq4HZc
        mute: true,             // options: true, false
        pauseOnScroll: false,
        repeat: true,
        fitToBackground: true,
        playerVars: {
            modestbranding: 0,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            wmode: "transparent",
            branding: 0,
            rel: 0,
            autohide: 0
        }
    });
	
    // 11. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
    // 12. menu active state
    $(".menu-state, .link-underline").on("click", function() {
        $(".menu-state, .link-underline").removeClass("active");
        $(this).addClass("active");
    });
	
    // 13. navigation - style #3
    if ($(".main-navigation").hasClass("transparent")) {
        $(".main-navigation").addClass("js-transparent");
    }
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 10) {
            $(".js-transparent").removeClass("transparent");
            $(".main-navigation, .main-navigation-logo .main-navigation-logo-img").addClass("reduce-height");
        } else {
            $(".js-transparent").addClass("transparent");
            $(".main-navigation, .main-navigation-logo .main-navigation-logo-img").removeClass("reduce-height");
        }
    });
    // 13-1. height.Adjustment
    function heightAdjustment(heightSecondary, heightPrimary) {
        heightSecondary.height(heightPrimary.height());
        heightSecondary.css({
            "line-height": heightPrimary.height() + "px"
        });
    }
    heightAdjustment($(".main-inner-navigation > ul > li > a"), $(".main-navigation"));
    // 13-2. search form
    $(".search-modal-launcher").on("click", function() {
        if ($(".search-modal").hasClass("open")) {
            $(".search-modal").removeClass("open");
            $(".search-modal").addClass("close");
        } else {
            $(".search-modal").removeClass("close");
            $(".search-modal").addClass("open");
        }
    });
    // 13-3. search form additional CLOSER
    $(".main-navigation-logo, .link-underline").on("click", function() {
        $(".search-modal").removeClass("open");
        $(".search-modal").addClass("close");
    });
	
    // 14. Vimeo player
    $("#vimeo-video").vimeofy({
        "url": "https://vimeo.com/105001064", // Vimeo VIDEO URL
        "color": "#fff",
        "autoplay": true,
        "loop": true,
        "delay": 1200
    });
	
    // 15. swiper thumbnail slider
    var swipersliderTop = new Swiper(".swiper-slider-top", {
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        autoplay: 4000,
        loop: false,
        mousewheelControl: false,
        keyboardControl: true
    });
    var swipersliderBottom = new Swiper(".swiper-slider-bottom", {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 1,
        slideToClickedSlide: true
    });
    swipersliderTop.params.control = swipersliderBottom;
    swipersliderBottom.params.control = swipersliderTop;
	
    // 16. slick slider
    // 16-1. slick fullscreen
    $(".slick-fullscreen").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 800,
        draggable: true,
        dots: true,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });
    // 16-2. slick fullscreen SPLIT
    $(".slick-fullscreen-split").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 800,
        draggable: true,
        dots: true,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	
    // 17. google maps POSITION
    function initialize() {
        // EDIT: map latitude and longitude
        var myLatlng = new google.maps.LatLng(34.052235, -118.243683);
        // EDIT: map marker
        var imagePath = "img/location-icon.png";
        var mapOptions = {
                scrollwheel: false,
                zoom: 12,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    featureType: "administrative",
                    elementType: "all",
                    stylers: [{
                        saturation: "-100"
                    }]
                }, {
                    featureType: "administrative.province",
                    elementType: "all",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 65
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: "50"
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{
                        saturation: "-100"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "all",
                    stylers: [{
                        lightness: "30"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "all",
                    stylers: [{
                        lightness: "40"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        hue: "#ffff00"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -97
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [{
                        lightness: -25
                    }, {
                        saturation: -100
                    }]
                }]
            }
        // EDIT: map address
        var contentString = "<strong>Rebel!</strong><br>ex Inc. Touchdown Dr<br>1176 Los Angeles, CA";
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
        });
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: imagePath,
            // EDIT: map title
            title: "Rebel!"
        });
        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }
    google.maps.event.addDomListener(window, "load", initialize);


});


// 18. the Wall
window.addEvent("domready", function() {
    var imagewall = [
        ["the-wall/1.jpg", [
            ["the-wall/1-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/2.jpg", [
            ["the-wall/2-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/3.jpg", [
            ["the-wall/3-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/4.jpg", [
            ["the-wall/4-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/5.jpg", [
            ["the-wall/5-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/6.jpg", [
            ["the-wall/6-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/7.jpg", [
            ["the-wall/7-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/8.jpg", [
            ["the-wall/8-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/9.jpg", [
            ["the-wall/9-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/10.jpg", [
            ["the-wall/10-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/11.jpg", [
            ["the-wall/11-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/12.jpg", [
            ["the-wall/12-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/13.jpg", [
            ["the-wall/13-2.jpg", "Item Name<br \/>\r\nLife / Stories"],
            ["the-wall/13-3.jpg", "Item Name 2<br \/>\r\nLife / Stories"],
            ["the-wall/13-4.jpg", "Item Name 3<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/14.jpg", [
            ["the-wall/14-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/15.jpg", [
            ["the-wall/15-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/16.jpg", [
            ["the-wall/16-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/17.jpg", [
            ["the-wall/17-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/18.jpg", [
            ["the-wall/18-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/19.jpg", [
            ["the-wall/19-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/20.jpg", [
            ["the-wall/20-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/21.jpg", [
            ["the-wall/21-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/22.jpg", [
            ["the-wall/22-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/23.jpg", [
            ["the-wall/23-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/24.jpg", [
            ["the-wall/24-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/25.jpg", [
            ["the-wall/25-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/26.jpg", [
            ["the-wall/26-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/27.jpg", [
            ["the-wall/27-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/28.jpg", [
            ["the-wall/28-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/29.jpg", [
            ["the-wall/29-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/30.jpg", [
            ["the-wall/30-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/31.jpg", [
            ["the-wall/31-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/32.jpg", [
            ["the-wall/32-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"]
        ]],
        ["the-wall/33.jpg", [
            ["the-wall/33-2.jpg", "Item Name<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/34.jpg", [
            ["the-wall/34-2.jpg", "Item Name<br \/>\r\nPeople / Portraits"]
        ]],
        ["the-wall/35.jpg", [
            ["the-wall/35-2.jpg", "Item Name<br \/>\r\nEditorials / Magazines"]
        ]],
        ["the-wall/36.jpg", [
            ["the-wall/36-2.jpg", "Item Name<br \/>\r\nCommercial / Stock"]
        ]],
        ["the-wall/plus-1.jpg", [
            ["the-wall/plus-1-2.jpg", "Item Name<br \/>\r\nBeauty / Fashion"] // an extra image to compensate for the gap
        ]]
    ];
    var maxLength = 36;
    var wallFluid = new Wall("wall", {
        "draggable": true,
        "slideshow": true, // options: true, false
        "speed": 1000,
        "showDuration": 4000,
        "transition": Fx.Transitions.Quad.easeOut,
        "inertia": true,
        "autoposition": true,
        "width": 301,
        "height": 320,
        "rangex": [-100, 100],
        "rangey": [-100, 100],
        callOnUpdate: function(items) {
            var root = Math.ceil(Math.sqrt(maxLength));
            document.id("wall").setStyle("margin-left", 0);
            var i = 0;
            (function() {
                try {
                    var position = ((Math.abs(items[i].y) % root) * root) + (Math.abs(items[i].x) % root);
                    if (position > maxLength) {
                        position = Math.floor(Math.random() * maxLength);
                    }
                    var file = imagewall[position][0];
                    var img = new Element("img[src=" + file + "]");
                    img.inject(items[i].node).fade("hide").fade("in");
                    var list = new Element("ul");
                    list.setProperty("class", "slideshow")
                    for (var j = 0; j < imagewall[position][1].length; j++) {
                        var slide = new Element("li");
                        new Element("img", {
                            src: imagewall[position][1][j][0]
                        }).inject(slide);
                        var desc = new Element("span", {
                            html: imagewall[position][1][j][1]
                        });
                        var div = new Element("div");
                        div.setProperty("class", "wall-item-description");
                        desc.inject(div);
                        div.inject(slide);
                        slide.inject(list);
                    }
                    list.inject(items[i].node);
                    var stop = false;
                    var firstSlide = true;
                    items[i].node.addEvents({
                        mouseenter: function(event) {
                            list.getChildren("li").setStyles({
                                "visibility": "hidden",
                                "opacity": 0
                            });
                            stop = false;
                            if (imagewall[position][1].length) {
                                (function(item) {
                                    item.fade("in");
                                    if (firstSlide) {
                                        delay = 1000;
                                        firstSlide = false;
                                    } else {
                                        delay = 2000;
                                    }
                                    if (item.getNext("li") != null) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getNext("li"));
                                        }).delay(delay);
                                    } else if (item.getSiblings("li").length > 0) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getSiblings("li").pop());
                                        }).delay(delay);
                                    }
                                })(new Element(list.getFirst("li")));
                                img.fade("out");
                            }
                            return false;
                        },
                        mouseleave: function() {
                            stop = true;
                            firstSlide = true;
                            if (imagewall[position][1].length) {
                                list.getChildren("li").fade("out");
                                img.fade("in");
                            }
                        }
                    });
                    i++;
                    if (i < items.length) {
                        var tmp = arguments.callee;
                        (function() {
                            tmp();
                        }).delay(10);
                    } else {}
                } catch (e) {}
            })();
        }
    });
    window.setTimeout(function() {
        wallFluid.initWall();
    }, 500);
});