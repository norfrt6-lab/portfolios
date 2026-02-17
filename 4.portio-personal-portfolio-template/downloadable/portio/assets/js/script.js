(function ($) {

    "use strict";

    $(document).ready(function () {
        // Select elements using jQuery
        var button = $(".menu-open");
        var menu_wrap = $("#menu_wrap,.menu-wrap");
        var bar_close = $("#bar_close");

        // Add click event using jQuery
        button.click(function () {
            if (menu_wrap.hasClass("open-mobilemenu")) {
                bar_close.removeClass("ti-close").addClass("ti-align-justify");
                menu_wrap.removeClass("open-mobilemenu");
            } else {
                menu_wrap.addClass("open-mobilemenu");
                bar_close.removeClass("ti-align-justify").addClass("ti-close");
            }
        });
    });


    /*------------------------------------------
    = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

    /* hero-text-slider */

    $('.hero-text-slider').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1,
        speed: 8000,
        dots: false,
        cssEase: 'linear',
        waitForAnimate: false,
        pauseOnFocus: false,
        pauseOnHover: false
    });
    /* hero-text-slider-s2 */
    $('.hero-text-slider-s2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1,
        speed: 8000,
        dots: false,
        cssEase: 'linear',
        waitForAnimate: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });



    /* hero-image-slider */
    $('.hero-image-slider').slick({
        dots: false,
        arrows: false,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    });


    /* hero-slider */
    $('.hero-slider').slick({
        autoplay: true,
        speed: 1000,
        lazyLoad: 'progressive',
        arrows: false,
        dots: true,
    }).slickAnimation();



    /* testimonial-slider */
    $('.testimonial-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    /* testimonial-slider-s2 */
    $('.testimonial-slider-s2').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    /*------------------------------------------
    = FUNFACT
    -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }


    $(window).scroll(function () {
        var navbar = $("#navbar");
        if (navbar.length === 0) {
            return;
        }

        var sticky = navbar.offset().top;

        if ($(window).scrollTop() >= sticky) {
            navbar.addClass("sticky");
        } else {
            navbar.removeClass("sticky");
        }

        if ($(window).scrollTop() === 0) {
            navbar.removeClass("sticky");
        }
    });


    /* submenu-open js */
    document.addEventListener('DOMContentLoaded', function () {
        var submenuOpenItems = document.querySelectorAll('.submenu-open');

        submenuOpenItems.forEach(function (item) {
            item.addEventListener('click', function () {
                this.classList.toggle('active');

                submenuOpenItems.forEach(function (otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    });




    /*------------------------------------------
    = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters ul li button").on("click", function () {
                $('.gallery-filters ul li .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();

 
    /*------------------------------------------
    = MASONRY GALLERY SETTING
-------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();



    /* WATCH VIDEO */

    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    /* project js */
    function initializeSwipers() {
        var swiper = new Swiper(".mySwiper", {
            freeMode: true,
            watchSlidesProgress: true,
            loop: true,
            breakpoints: {
                320: {
                    spaceBetween: 0,
                    slidesPerView: 1
                },
                400: {
                    spaceBetween: 15,
                    slidesPerView: 2
                },
                640: {
                    spaceBetween: 20,
                    slidesPerView: 3
                }
            }

        });
        var swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
            loop: true,
            effect: "fade",
        });
    }

    initializeSwipers();






    /* blog slider js */
    var swiper = new Swiper(".blog-slide", {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Preloader
    $(window).on('load', function () {
        $('.loader').fadeOut();
        $('.loader-mask').delay(450).fadeOut('fast');
        sortingGallery();

    });






    /* image top-buttom scroll js */
    var image = document.getElementsByClassName('thumbnail');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });

    var image = document.getElementsByClassName('thumbnail2');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)',
        orientation: 'down'
    });




    /*  gsap  js start*/
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    // gsap.config({ nullTargetWarn: false });
    // let smoother = ScrollSmoother.create({ smooth: 1.35, effects: true, smoothTouch: false, normalizeScroll: false, ignoreMobileResize: true });
    $(document).ready(function () {
        var st = $(".poort-text");
        if (st.length == 0) return;
        gsap.registerPlugin(SplitText);
        st.each(function (index, el) {
            el.split = new SplitText(el, { type: "lines,words,chars", linesClass: "poort-line" });
            gsap.set(el, { perspective: 600 });
            if ($(el).hasClass("poort-in-right")) {
                gsap.set(el.split.chars, { opacity: 0, x: "100", ease: "Back.easeOut" });
            }
            if ($(el).hasClass("poort-in-left")) {
                gsap.set(el.split.chars, { opacity: 0, x: "-100", ease: "circ.out" });
            }
            if ($(el).hasClass("poort-in-up")) {
                gsap.set(el.split.chars, { opacity: 0, y: "80", ease: "circ.out" });
            }
            if ($(el).hasClass("poort-in-down")) {
                gsap.set(el.split.chars, { opacity: 0, y: "-80", ease: "circ.out" });
            }
            el.anim = gsap.to(el.split.chars, { scrollTrigger: { trigger: el, start: "top 90%" }, x: "0", y: "0", rotateX: "0", scale: 1, opacity: 1, duration: 0.6, stagger: 0.02 });
        });
    });



    /* scroll-text-animation */
    function scroll_animations() {
        // var allow_on_mobile = !0;
        // if (typeof config_scroll_animation_on_mobile !== "undefined") allow_on_mobile = config_scroll_animation_on_mobile;
        // if (allow_on_mobile == !1 && is_mobile_device) return;
        var defaults = {
            duration: 1.2,
            ease: "power4.out",
            animation: "fade_from_bottom",
            once: !1,
        };
        gsap.utils.toArray(".scroll-text-animation").forEach(function (box) {
            var gsap_obj = {};
            var settings = {
                // ease: box.dataset.animationEase || defaults.ease,
                duration: box.dataset.animationDuration || defaults.duration,
            };
            var animations = {
                fade_from_bottom: {
                    y: 180,
                    opacity: 0,
                },
                fade_from_top: {
                    y: -180,
                    opacity: 0,
                },
                fade_from_left: {
                    x: -180,
                    opacity: 0,
                },
                fade_from_right: {
                    x: 180,
                    opacity: 0,
                },
                fade_in: {
                    opacity: 0,
                },
                rotate_up: {
                    y: 180,
                    rotation: 10,
                    opacity: 0,
                },
            };
            var scroll_trigger = {
                scrollTrigger: {
                    trigger: box,
                    once: defaults.once,
                    start: "top bottom+=20%",
                    // start: "top bottom+=5%",
                    toggleActions: "play none none reverse",
                    markers: !1,
                },
            };
            jQuery.extend(gsap_obj, settings);
            jQuery.extend(gsap_obj, animations[box.dataset.animation || defaults.animation]);
            jQuery.extend(gsap_obj, scroll_trigger);
            gsap.from(box, gsap_obj);
        });
    }
    scroll_animations();



    /* scroll-text-center animation*/
    const scrolltextcenter = ".scroll-text-center";

    const elementsToAnimate = document.querySelectorAll(scrolltextcenter);

    elementsToAnimate.forEach(element => {

        var durationValue = 1.4;
        var onScrollValue = 1;
        var staggerValue = 0.03;
        var dataDelay = 0.04;

        if (element.getAttribute("data-duration")) {
            durationValue = element.getAttribute("data-duration");
        }
        if (element.getAttribute("data-on-scroll")) {
            onScrollValue = element.getAttribute("data-on-scroll");
        }
        if (element.getAttribute("data-stagger")) {
            staggerValue = element.getAttribute("data-stagger");
        }
        if (element.getAttribute("data-delay")) {
            dataDelay = element.getAttribute("data-delay");
        }

        element.split = new SplitText(element, {
            type: "lines,words,chars",
            linesClass: "gspa-text-center"
        });

        if (onScrollValue == 1) {
            element.anim = gsap.from(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                },
                duration: durationValue,
                delay: dataDelay,
                ease: "circ.out",
                y: 75,
                stagger: staggerValue,
                opacity: 0,
            });
        } else {
            element.anim = gsap.from(element.split.chars, {
                duration: durationValue,
                delay: dataDelay,
                ease: "circ.out",
                y: 75,
                stagger: staggerValue,
                opacity: 0,
            });
        }

    });






})(window.jQuery);



/* imager scroll animation */
let new_class_name_elements = document.querySelectorAll(".new_img-animet");
new_class_name_elements.forEach((new_class_name_element) => {
    let image = new_class_name_element.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: new_class_name_element,
            start: "top 50%",
        }
    });

    tl.set(new_class_name_element, { autoAlpha: 1 });
    tl.from(new_class_name_element, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
});









/* volunteer-slider js */
const swiper = new Swiper('.swiper-container', {
    centeredSlides: true,
    longSwipesMs: 0,
    loopPreventsSlide: false,
    longSwipes: true,
    longSwipesRatio: 0,
    threshold: 0,
    slideToClickedSlide: true,
    slidesPerView: 5,
    speed: 900,
    loop: true,
    loopedSlides: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.swiper-pagination',
    },
});



/* contactForm js */
function validateAndSubmit() {
    clearErrors();

    var isValid = true;

    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();



    if (name === '') {
        showError('nameError');
        isValid = false;
    }
    if (phone === '') {
        showError('phoneError');
        isValid = false;
    }

    if (email === '') {
        showError('emailError');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError');
        isValid = false;
    }

    if (subject === '') {
        showError('subjectError');
        isValid = false;
    }

    if (message === '') {
        showError('messageError');
        isValid = false;
    }

    if (isValid) {
        document.getElementById('contactForm').submit();
    }

}

function showError(elementId) {
    var errorElement = document.getElementById(elementId);
    errorElement.style.display = 'block';
}

function clearErrors() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (element) {
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}




/* contactForm two js */
// function validateAndSubmit2() {
//     var name = document.getElementById('name').value;
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phone').value;
//     var message = document.getElementById('message').value;

//     if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || message.trim() === '') {
//         alert('Please fill in all fields');
//         return;
//     }

//     var formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('message', message);

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'submit-form.php', true);
//     xhr.onload = function () {
//         if (xhr.status == 200) {

//             alert('Form submitted successfully');
//         } else {
//             alert('Error submitting form');
//         }
//     };
//     xhr.send(formData);
// }




/* progresbar js */
const block = document.querySelectorAll('.block');
window.addEventListener('load', function () {
    block.forEach(item => {
        let numElement = item.querySelector('.num');
        let num = parseInt(numElement.innerText);
        let count = 0;
        let time = 2000 / num;
        let circle = item.querySelector('.circle');
        setInterval(() => {
            if (count == num) {
                clearInterval();
            } else {
                count += 1;
                numElement.innerText = count;
            }
        }, time)
        circle.style.strokeDashoffset
            = 503 - (503 * (num / 100));

    })
});


// Screen Width
// var screen_width = window.screen.width;


// // Active GSAP
// if (document.querySelector("#has_smooth").classList.contains("smooth-scrool-animate")) {
//     const smoother = ScrollSmoother.create({
//         smooth: 1.35,
//         effects: screen_width < 1025 ? false : true,
//         smoothTouch: 0.1,
//         normalizeScroll: false,
//         ignoreMobileResize: true,
//     });
// }





/** Smooth Scrolling Functionality **/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollTrigger.normalizeScroll(true);

function shouldUseScrollBehavior() {
    return true; 
}

if (shouldUseScrollBehavior()) {
    let contentElement = document.getElementById("smooth-wrapper");
    if (contentElement) {
        let smoother = ScrollSmoother.create({
            smooth: 3,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true
        });

        
    } else {
        
    }
}



gsap.utils.toArray("ul li a").forEach(function (a) {
    a.addEventListener("click", function (e) {
        e.preventDefault();
        var href = e.target.getAttribute("href");
        if (href.charAt(0) === '#') {
            var targetElement = document.querySelector(href);
            if (targetElement) {
                var targetOffset = targetElement.offsetTop - 100;
                gsap.to(window, { duration: 1, scrollTo: { y: targetOffset } });
            }
        } else {
            window.location.href = href;
        }
    });
});