$(window).load(function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

$(document).ready(function () {
    
    $('#fullpage').fullpage({
        //Navigation
        menu: false,
        anchors: ['about', 'bb14', 'juggle', 'ageago', 'foodtrucksofla', 'hg'],
        //        navigation: false,
        //        navigationPosition: 'right',
        //        navigationTooltips: ['firstSlide', 'secondSlide'],
        //        slidesNavigation: true,
        //        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInQuart',
        easingcss3: 'ease',
        loopBottom: true,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize: true,
        sectionsColor: ['#f4f4f4', '#3F3F3F', '#14A697', '#f2bb13', '#F29D35', '#F27649', '#F25252'],
        paddingTop: '80px',
        //        paddingBottom: '0px',
        //        fixedElements: '#header, .footer',
        responsive: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function (index, nextIndex, direction) {},
        afterLoad: function (anchorLink, index) {},
        afterRender: function () {

            $('.variable-width').slick({
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                swipeToSlide: true,
                responsive: [
                    {
                        breakpoint: 722,
                        settings: {
                            dots: true
                        }
                    }
                  ]

            });

        },
        afterResize: function () {},
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function (anchorLink, index, slideIndex, direction) {}
    });

    $('[data-typer-targets]').typer();

    //var pathArray = window.location.pathname.split( '/' );
    //var secondLevelLocation = pathArray[0];
    //console.log(pathArray);
    //var url=document.URL.split('#');    
    //console.log(url);


    //$('body').toggleClass('.active', ($('body').hasClass('.fp-viewing-about')));

    //    $('.active').removeClass('active');   
    //    $('nav a[href^="#' + document.URL.split("#")[1] + '"]').addClass('active');


    //    function footerReveal() {
    //        if ($(.last-section).offset().top = 0) {
    //            $("#footer").animate({
    //                scrollTop: fst + "px"
    //            })
    //        }
    //    };

    $("body").keydown(function (e) {
        switch (e.keyCode) {
        case 39: // right
            $('.variable-width').slickNext();
            break;

        case 37: // left
            $('.variable-width').slickPrev();
            break;

        case 38: // up
            prevSection();
            break;

        case 40: // down
            footerReveal();
            break;
        }
    });
    // mobile displays all three slides in stack    
    //    if ($(window).width() < 600) {
    //        $('.variable-width').unslick();
    //    }
});

// mobile displays all three slides in stack 
//$(window).resize(function () {
//        if ($(window).width() < 600) {
//            $('.variable-width').unslick();
//        }
//});

//    function nextSection() {
//        var st = $('body').scrollTop();
//        var fst = $('#footer').offset().top;
//        var found = false;
//        for (var i=0; i<sections.length; i++) {
//            var t = $(sections[i]).offset().top;                    
//            if(t-st > 0) {
//                found = true;
//                $("html, body").animate({
//                    scrollTop: t + "px"
//                })
//                break;
//            }
//        }        
////        if (!found && fst - st > 10) {
////            $("html, body").animate({
////                scrollTop: fst + "px"
////            })
////        }
//        
////        if ($(.last-section).offset().top = 0) {
////            $("html, body").animate({
////                scrollTop: fst + "px"
////            })
////        }
//    }

//    function prevSection() {
//        var st = $('body').scrollTop();
//        var found = -999999;
//        var foundIndex = 0;
//        for (var i=0; i<sections.length; i++) {
//            var t = $(sections[i]).offset().top;                    
//            var diff = t - st;
//            if(diff > found && diff < 0) {
//                found = diff;
//                foundIndex = i;
//            }
//        }
//
//        $("html, body").animate({
//            scrollTop: $(sections[foundIndex]).offset().top + "px"
//        }); 
//    }
//    
//});


//$(function(){
//       $("a").each(function(){
//               if ($(this).attr("href") == window.location.pathname){
//                       $(this).addClass("active");
//               }
//       });
//});


//$('#work').waypoint(function () {
//        $('.active').removeClass('active');
//        $('#work-link').addClass('active');
//        console.log("class added");
//    });

/*---Make an enter function from these scraps?---*/

//var pathArray = window.location.pathname.split('/');
//var secondLevelLocation = pathArray[0];
//console.log(pathArray);
//var url = document.URL.split('#');
//console.log(url);
//    
//$(document).ready(function(){
//	$("#demosMenu").change(function(){
//	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
//	});
//});