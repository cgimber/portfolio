$(window).load(function() {
    $('#preloader').fadeOut('slow', function() {
        $(this).remove();
    });
});

$(document).ready(function() {
    var section;
    var gallery;
    var slideLinks = $('a.gallery-link');

    $('#fullpage').fullpage({
        // navigation
        menu: false,
        anchors: ['about', 'bruinbash', 'juggle', 'ageago', 'localsonly', 'sozo'],
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
        loopBottom: true,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
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
        sectionsColor: ['#1a1a1a', '#3F3F3F', '#14A697', '#f2bb13', '#F29D35', '#f25151', '#F25252'],
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
            if (section == "about")
                $('#about-link').addClass('active');
            else
                $('#work-link').addClass('active');

            if (index != 1)
                updateSlideLinks();
        },
        afterRender: function() {

            // use fallbacks for cases where section is undefined
            if (!section) { // 1) afterLoad hasn't fired yet
                section = document.URL.split('#')[1];
                if (!section) // 2) the page was loaded without a page anchor 
                    section = "about";
            }

            gallery = $('.gallery').flickity({
                // options
                cellAlign: 'center',
                percentPosition: true,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true
            });

            if (section == "about")
                $('#about-link').addClass('active');

        },
        afterResize: function() {},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {}
    });

    $('[data-typer-targets]').OrderlyTyper();

    /* navigate slides with arrow keys
    --------------------------------------------------------------*/
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
    --------------------------------------------------------------*/
    function updateSlideLinks() {
        slideLinks.each(function() {
            var slide = this.offsetParent;
            if ($(slide).hasClass('is-selected'))
                $(this).prop('href', '/' + section + '.html');
            else
                $(this).prop('href', 'javascript:;');
        });
    }

    $(gallery).on('cellSelect', function() {
        window.setTimeout(updateSlideLinks, 1);
    });

    /* slide specific click behaviour
    --------------------------------------------------------------*/
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
        }
    });

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
