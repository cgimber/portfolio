//$(window).load(function () {
//    $('#preloader').fadeOut('slow', function () {
//        $(this).remove();
//    });
//});

//$('body').hide();

$(window).load(function () {
    $('body').fadeIn('slow');
});

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