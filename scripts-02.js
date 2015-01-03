window.addEventListener("load", function() {
        var load_screen = document.getElementById("load_screen");
        document.body.removeChild(load_screen);
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

var pathArray = window.location.pathname.split('/');
var secondLevelLocation = pathArray[0];
console.log(pathArray);
var url = document.URL.split('#');
console.log(url);