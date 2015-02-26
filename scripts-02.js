$(window).ready(function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

$(document).ready(function () {

    $('.project-carousel').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        fade: true,
        cssEase: 'linear'
    });

    $('ul#section-links a').removeClass('active');
    $('#work-link').addClass('active');

    $("body").keydown(function (e) {
        switch (e.keyCode) {
        case 39: // right
            $('.next').click();
            console.log("next");
            break;

        case 37: // left
            $('.previous').click();
            console.log("previous");
            break;
        }
    });
});



// similar behavior as clicking on a link
//window.location.href = "http://stackoverflow.com";


//$('body').hide();
//
//$(window).load(function () {
//    $('body').fadeIn('slow');
//});