$(window).load(function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

$(document).ready(function () {

    $('#fullpage').fullpage({
        //Navigation
        menu: false,
        anchors: ['about', 'bb14', 'juggle', 'ageago', 'localsonly', 'sozo'],
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
        sectionsColor: ['#1a1a1a', '#3F3F3F', '#14A697', '#f2bb13', '#F29D35', '#f25151', '#F25252'], 
        paddingTop: '80px',
        //        paddingBottom: '0px',
        //        fixedElements: '#header, .footer',
        responsive: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function (index, nextIndex, direction) {},
        afterLoad: function (anchorLink, index) {
            var section = document.URL.split('#')[1];
            // console.log("section = " + section);

            if (section == "about") {
                $('ul#section-links a').removeClass('active');
                $('#about-link').addClass('active');
            } else if ((section == "bb14") || (section == "juggle") || (section == "ageago") || (section == "localsonly") || (section == "sozo")) {
                $('ul#section-links a').removeClass('active');
                $('#work-link').addClass('active');
            }
        },
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

            var section = document.URL.split('#')[1];

            if (section == "about") {
                $('#about-link').addClass('active');
            } else if ($('ul#section-links a').hasClass('active')) {
                console.log("hey");
            } else {
                $('#about-link').addClass('active');
            }

        },
        afterResize: function () {},
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function (anchorLink, index, slideIndex, direction) {}
    });

    // $('[data-typer-targets]').typer();
    $('[data-typer-targets]').OrderlyTyper();

    // hide modal after keypress event    
    $('body').keydown(function (e) {
        $('.modal').fadeOut();
    });

    $("body").keydown(function (e) {
        switch (e.keyCode) {
        case 39: // right
            $('.variable-width').slickNext();
            break;

        case 37: // left
            $('.variable-width').slickPrev();
            break;
        }
    });

});

// mobile displays all three slides in stack 
//$(window).resize(function () {
//        if ($(window).width() < 600) {
//            $('.variable-width').unslick();
//        }
//});