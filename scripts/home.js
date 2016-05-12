/* mobile browser detection (via detectmobilebrowsers.com)
-------------------------------------------------------------------------------------*/
var isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
    isMobile = true;

/* touch screen detection
-------------------------------------------------------------------------------------*/
var touchSupport = false;
if ('ontouchstart' in window || navigator.maxTouchPoints)
    touchSupport = true;

/* document ready
-------------------------------------------------------------------------------------*/
$(document).ready(function() {
    var section;
    var gallery;
    var slideLinks = $('a.gallery-link');

    $('#preloader').fadeOut(500, 'easeInCirc', function() {
        $('body').removeClass('isLoading');
    });

    if (isMobile) {
        $('html').addClass('isMobile');
        // add page anchors for nav scrolling
        $('.section--about').attr('id', 'about');
        $('.section--lahacks').attr('id', 'lahacks');

        if (touchSupport)
            $('html').addClass('touchSupport');

        gallery = $('.gallery').flickity({
            // options
            cellAlign: 'center',
            imagesLoaded: true,
            percentPosition: true,
            prevNextButtons: false,
            pageDots: true,
            wrapAround: true
        });

        // update nav links onload
        $('ul#section-links a').removeClass('active');

        section = document.URL.split('#')[1];

        if (section) {
            if (section == 'about')
                $('#about-link').addClass('active');
            else
                $('#work-link').addClass('active');
        } else {
            section = 'about';
            $('#about-link').addClass('active');
        }

        // update nav links during page scroll
        $(window).scroll(debounce(function() {
            var scrollTop = $(window).scrollTop();
            var $workSection = $('.section--lahacks');
            var workPos = $workSection.offset();
            var currSection;

            if (scrollTop < (workPos.top)) {
                currSection = 'about';
            } else {
                currSection = 'work';
            }

            if (currSection == 'about') {
                // remove focus from gallery
                if ($('#work-link').hasClass('active')) {
                    setTimeout(function() { $('#work-link').blur(); }, 1);
                    $('#work-link').removeClass('active');
                }
                $('#about-link').addClass('active');
            } else {
                if ($('#about-link').hasClass('active')) {
                    setTimeout(function() { $('#about-link').blur(); }, 1);
                    $('#about-link').removeClass('active');
                }
                $('#work-link').addClass('active');
            }
        }, 100));

        // smooth scroll for anchors on the same page (#about and #lahacks)
        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        var isProject = $(target).is('#lahacks');
                        if (isProject) {
                            $('html, body').animate({
                                scrollTop: target.offset().top + 1
                            }, 750);
                        } else {
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, 750);
                        }
                        return false;
                    }
                }
            });
        });

    } else {

        $('#footer').hide();
        $('#fullpage').fullpage({
            // navigation
            menu: false,
            anchors: ['about', 'lahacks', 'juggle', 'bruinbash', 'ageago', 'localsonly', 'sozo'],
            //        navigation: false,
            //        navigationPosition: 'right',
            //        navigationTooltips: ['firstSlide', 'secondSlide'],
            //        slidesNavigation: true,
            //        slidesNavPosition: 'bottom',

            // scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            scrollBar: false,
            easing: 'easeInQuart',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: true,
            normalScrollElements: '#element1, .element2',
            scrollOverflow: false,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,

            // accessibility
            keyboardScrolling: true,
            animateAnchor: true,

            // design
            controlArrows: true,
            verticalCentered: true,
            resize: true,
            sectionsColor: ['#1a1a1a', '#3F3F3F', '#14A697', '#1584B7', '#f2bb13', '#F29D35', '#f25151'],
            paddingTop: '80px',
            //        paddingBottom: '0px',
            //        fixedElements: '#header, .footer',
            responsive: 0,

            // custom selectors
            sectionSelector: '.section',
            slideSelector: '.slide',

            // events
            onLeave: function(index, nextIndex, direction) {},
            afterLoad: function(anchorLink, index) {
                section = anchorLink;

                $('ul#section-links a').removeClass('active');
                if (section == 'about')
                    $('#about-link').addClass('active');
                else
                    $('#work-link').addClass('active');

                updateSlideLinks();
            },
            afterRender: function() {

                // use fallbacks for cases where section is undefined
                if (!section) { // 1) afterLoad hasn't fired yet
                    section = document.URL.split('#')[1];
                    if (!section) // 2) the page was loaded without a page anchor 
                        section = 'about';
                }

                gallery = $('.gallery').flickity({
                    // options
                    cellAlign: 'center',
                    imagesLoaded: true,
                    percentPosition: true,
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true
                });

                if (section == 'about')
                    $('#about-link').addClass('active');

                window.setTimeout(updateSlideLinks, 1);

            },
            afterResize: function() {},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
            onSlideLeave: function(anchorLink, index, slideIndex, direction) {}
        });

        /* navigate slides with arrow keys
        ----------------------------------------------------------*/
        var changeSlide = debounce(function(e) {
            switch (e.keyCode) {
                case 37: // LEFT
                    gallery.flickity('previous', true);
                    break;

                case 39: // RIGHT
                    gallery.flickity('next', true);
                    break;
            }
        }, 100);

        $('body').keydown(changeSlide);

        /* update hrefs for each slide
        ----------------------------------------------------------*/
        $(gallery).on('cellSelect', function() {
            window.setTimeout(updateSlideLinks, 1);
        });

        /* slide specific click behaviour
        ----------------------------------------------------------*/
        $('img.home').click(function() {
            var clickedSlide = this.offsetParent;

            if ($(clickedSlide).hasClass('is-selected')) {
                // follow link to project page
            } else if ($(clickedSlide).hasClass('is-next')) {
                // go to next slide
                gallery.flickity('next', true);
                // remove focus from gallery
                setTimeout(function() { $('.gallery').blur(); }, 1);
            } else if ($(clickedSlide).hasClass('is-previous')) {
                // go to previous slide
                gallery.flickity('previous', true);
                // remove focus from gallery
                setTimeout(function() { $('.gallery').blur(); }, 1);
            }
        });

        $('.gallery-link')
            .mouseenter(function(e) {
                // var $offset = $(this).offset();
                // var mouseX = e.pageX;
                // var mouseY = e.pageY;
                $('#tooltip')
                    .text($(this).attr('data-title'))
                    // .css('left', mouseX + 'px')
                    // .css('top', mouseY + 'px')
                    // .fadeIn('1250');
                    .show();
                // console.log('mouseenter');
            })
            // .mouseover(function(e) {
            //     // var $offset = $(this).offset();
            //     var mouseX = e.pageX;
            //     var mouseY = e.pageY;
            //     $('#tooltip')
            //         .css('left', mouseX + 'px')
            //         .css('top', mouseY + 'px');
            //     console.log('mouseover');
            // })
            .mouseleave(function() {
                // $('#tooltip').fadeOut('1250');
                $('#tooltip').hide();
                // console.log('mouseleave');
            });
    }
    $('[data-typer-targets]').OrderlyTyper();

    /* functions
    --------------------------------------------------------------*/
    function updateSlideLinks() {
        slideLinks.each(function() {
            var slide = this.offsetParent;
            if ($(slide).hasClass('is-selected')) {
                $(this).prop('href', section + '.html');
                $(this).attr('data-title', 'Go to project');
            } else if ($(slide).hasClass('is-next')) {
                $(this).prop('href', 'javascript:;');
                $(this).attr('data-title', 'Next slide');
            } else if ($(slide).hasClass('is-previous')) {
                $(this).prop('href', 'javascript:;');
                $(this).attr('data-title', 'Previous slide');
            }
        });
    }
});


/* add 'is-previous' and 'is-next' classes to Flickity cells
------------------------------------------------------------------*/
Flickity.createMethods.push('_createPrevNextCells');

Flickity.prototype._createPrevNextCells = function() {
    this.on('cellSelect', this.setPrevNextCells);
};

Flickity.prototype.setPrevNextCells = function() {
    // remove classes
    if (this.previousCell)
        classie.remove(this.previousCell.element, 'is-previous');
    if (this.nextCell)
        classie.remove(this.nextCell.element, 'is-next');

    // set cells
    if (this.selectedIndex === 0)
        this.previousCell = this.cells[this.cells.length - 1];
    else
        this.previousCell = this.cells[this.selectedIndex - 1];

    if (this.selectedIndex === this.cells.length - 1)
        this.nextCell = this.cells[0];
    else
        this.nextCell = this.cells[this.selectedIndex + 1];

    // add classes
    if (this.previousCell)
        classie.add(this.previousCell.element, 'is-previous');
    if (this.nextCell)
        classie.add(this.nextCell.element, 'is-next');
};
