"use strict";
// addEventListener(document, "touchstart", function(e) {
//     console.log(e.defaultPrevented);  // will be false
//     e.preventDefault();   // does nothing since the listener is passive
//     console.log(e.defaultPrevented);  // still false
//   }, Modernizr.passiveeventlisteners ? {passive: true} : false);
jQuery(document).ready(function ($) {
    $(this).scrollTop(0);
    
    // $('[data-toggle="tooltip"]').tooltip();
    //------------- wow js ---------------//
    // $('#bootstrap-touch-slider').bsTouchSlider();
    // $('.category-slide').owlCarousel( {
    //     autoplay: false, autoplaySpeed: 600, 
    //     nav: true, 
    //     dots: false, 
    //     loop: true, 
    //     margin:30, 
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"], 
    //     autoplayHoverPause: false,
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 1
    //         }
    //         , 568: {
    //             items: 2
    //         }
    //         , 768: {
    //             items: 2
    //         }
    //         , 992: {
    //             items: 3
    //         }
    //         , 1200: {
    //             items: 3
    //         }
    //     } //padding: 10 
    // }
    // );
    // $('.category-slide2').owlCarousel( {
    //     autoplay: false, 
    //     autoplaySpeed: 600, 
    //     nav: true, 
    //     dots: false, 
    //     loop: true, 
    //     margin:30, 
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"], 
    //     autoplayHoverPause: false, 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 2
    //         }
    //         , 568: {
    //             items: 2
    //         }
    //         , 768: {
    //             items: 2
    //         }
    //         , 
    //         992: {
    //             items: 3
    //         }
    //         , 
    //         1024: {
    //             items: 3
    //         }
    //         , 1200: {
    //             items: 4
    //         }
    //     }
    // }
    // );
    // $('#toprating').owlCarousel( {
    //     autoplay: false, 
    //     center: true, 
    //     loop: true, 
    //     nav: true, 
    //     smartSpeed: 1800, 
    //     navText: ["<span class='flaticon-send'></span>", "<span class='flaticon-send'></span>"], 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 1
    //         }
    //         , 568: {
    //             items: 1
    //         }
    //         , 736: {
    //             items: 3
    //         }
    //         , 768: {
    //             items: 1
    //         }
    //         , 992: {
    //             items: 3
    //         }
    //         , 1200: {
    //             items: 3
    //         }
    //     }
    // }
    // );
    /*** home 3 **/
    //-------- Top Rating Slide ----//
    // $('#catslide').owlCarousel( {
    //     autoplay: true, 
    //     autoplaySpeed: 600, 
    //     nav: false, 
    //     dots: false, 
    //     loop: true, 
    //     smartSpeed: 1200, 
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"], 
    //     autoplayHoverPause: true, 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 2
    //         }
    //         , 568: {
    //             items: 2
    //         }
    //         , 768: {
    //             items: 2
    //         }
    //         , 992: {
    //             items: 3
    //         }
    //         , 1200: {
    //             items: 4
    //         }
    //          , 1300: {
    //             items: 5
    //         }
    //     }
    // }
    // );
    /*** home 3 **/
    //-------- Top Rating Slide ----//
    // $('#catslide1').owlCarousel( {
    //     autoplay: true, 
    //     autoplaySpeed: 600, 
    //     nav: false, 
    //     dots: false, 
    //     loop: true, 
    //     smartSpeed: 1200, 
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"], 
    //     autoplayHoverPause: true, 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 2
    //         }
    //         , 568: {
    //             items: 2
    //         }
    //         , 768: {
    //             items: 2
    //         }
    //         , 992: {
    //             items: 3
    //         }
    //         , 1200: {
    //             items: 4
    //         }
    //          , 1300: {
    //             items: 5
    //         }
    //     }
    // }
    // );
    /** end home 3 **/
    // $('#movie-slide').owlCarousel( {
    //     autoplay: false, 
    //     autoplaySpeed: 600, 
    //     nav: true, 
    //     dots: false, 
    //     smartSpeed: 1200, 
    //     loop: false, 
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"], 
    //     autoplayHoverPause: false, 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 1, margin: 15
    //         }
    //         , 768: {
    //             items: 1, margin: 15
    //         }
    //         , 992: {
    //             items: 1
    //         }
    //         , 1200: {
    //             items: 1
    //         }
    //     }
    //     , margin: 29, //padding: 10 
    // }
    // );
    /** end home 3 **/
    // $('.widget-slide').owlCarousel( {
    //     navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"],
    //     autoplay: true,
    //     autoplaySpeed: 600,
    //     nav: true, 
    //     dots: false, 
    //     smartSpeed: 1200, 
    //     loop: false,
    //     autoplayHoverPause: false, 
    //     responsive: {
    //         0: {
    //             items: 1
    //         }
    //         , 480: {
    //             items: 1
    //         }
    //         , 768: {
    //             items: 1
    //         }
    //         , 992: {
    //             items: 1
    //         }
    //         , 1200: {
    //             items: 1
    //         }
    //     }
    //     , margin: 29, //padding: 10 
    // }
    // );
    /*** timer ***/
    // $('#simple-timer').syotimer( {
    //     year: 2019, 
    //     month: 4, 
    //     day: 9, 
    //     hour: 20, 
    //     minute: 30
    // }
    // );
    // $('.event-timers').syotimer( {
    //     year: 2019, 
    //     month: 4, 
    //     day: 9, 
    //     hour: 20, 
    //     minute: 30
    // }
    // );
    // $('.comingsoon-time').syotimer( {
    //     year: 2019, month: 4, day: 9, hour: 20, minute: 30
    // }
    // );
    // $('.panel-collapse').on('show.bs.collapse', function () {
    //     $(this).siblings('.panel-heading').addClass('active');
    // }
    // );
    // $('.panel-collapse').on('hide.bs.collapse', function () {
    //     $(this).siblings('.panel-heading').removeClass('active');
    // }
    // );
    // $('.alert').alert()
    /*** slider range section ***/
    // $(function() {
    //     $( "#slider-range").slider( {
    //         range: true, min: 0, max: 500, values: [ 75, 300], slide: function( event, ui) {
    //             $( "#amount").val( "$" + ui.values[ 0]);
    //             $( "#amount2").val( "$" + ui.values[ 1]);
    //         }
    //     }
    //     );
    //     $( "#amount").val( "$" + $( "#slider-range").slider( "values", 0));
    //     $( "#amount2").val( "$" +$( "#slider-range").slider( "values", 1));
    // }
    // );
    /*** Top To ****/
    // $(window).on('scroll', function () {

    //     if ($(this).scrollTop() > 300) {
    //         $('#back-top').fadeIn();
    //     }
    //     else {
    //         $('#back-top').fadeOut();
    //     }
    // });
    $('body').on('click', '#back-top', function () {
        $("html, body").animate({
            scrollTop: 0
        }
            , 1000);
        return false;
    });
    /** POPUp video Function **/
    // $(function() {
    //     $(".flat-icons").videoPopup( {
    //         autoplay: 1, controlsColor: 'white', 
    //         showVideoInformations: 0, 
    //         width: 1000, 
    //         customOptions: {
    //             rel: 0, 
    //             end: 60
    //         }
    //     }
    //     );
    //     $(".flat-icons1").videoPopup();
    // }
    // );
    // //portfolio section  
    // $('.gallery-list').mixItUp();
    // preloader 
    // var winObj = $(window), bodyObj = $('body'), headerObj = $('header');
    // winObj.on('load', function () {
    //     var $preloader = $('.preloader');
    //     $preloader.find('.preloader-lod').fadeOut();
    //     $preloader.delay(350).fadeOut('slow');
    // }
    // );
});


function fadeOutEffect(el) {
    // var fadeTarget = document.getElementById("target");
    var fadeEffect = setInterval(function () {
        if (!el.style.opacity) {
            el.style.opacity = 1;
        }
        if (el.style.opacity > 0) {
            el.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            el.style.display = 'none';
        }
    }, 50);
}