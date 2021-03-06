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

/* window load
-------------------------------------------------------------------------------------*/
var loadedCount = 0; // current number of images loaded
var imagesToLoad = $('img').length; // number of images
var loadingProgress = 0; // timeline progress
var doneLoading = false;
$('.progress-bar').height($('nav').height()); // set progress bar height

$('img').imagesLoaded()
    .progress(function(instance, image) {
        if (!doneLoading)
            loadProgress();
    })
    .always(function(instance) {
        clearTimeout(safetyNet);
        // remove preloader
        setTimeout(function() {
            $('#preloader').fadeOut(250, 'easeInCirc', function() {
                $('body').removeClass('isLoading');
            });
        }, 250);
    });

function loadProgress(imgLoad, image) {
    loadedCount++;
    loadingProgress = (loadedCount / imagesToLoad);
    var currWidth = loadingProgress * ($(window).width());

    // update our progress bar timeline
    $('.progress-bar').width(currWidth);
}

// if load lasts longer than 2 secs, remove preloader ahead of time
var safetyNet = setTimeout(function() {
    doneLoading = true;
    // jump to 100%
    $('.progress-bar').width($(window).width());
    // remove preloader
    setTimeout(function() {
        $('#preloader').fadeOut(250, 'easeInCirc', function() {
            $('body').removeClass('isLoading');
        });
    }, 250);
}, 2000);

/* document ready
-------------------------------------------------------------------------------------*/
$(document).ready(function() {
    if (isMobile)
        $('html, body').addClass('isMobile');
    if (touchSupport)
        $('html').addClass('touchSupport');

    if ($('.project-carousel').length >= 1) { // if there are carousel elements,
        $('.project-carousel').slick({ // init slick
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
    }

    $('iframe.yt-autoplay')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

    $('ul#section-links a').removeClass('active');
    $('#work-link').addClass('active');

    /* navigate slides with arrow keys
    ---------------------------------------------------------------------------------*/
    $("body").keydown(function(e) {
        switch (e.keyCode) {
            case 39: // right
                $link = $('.next');
                launchProject($link);
                break;

            case 37: // left
                $link = $('.previous');
                launchProject($link);
                break;
        }

        function launchProject($link) {
            var path = $link.attr('href');
            var currPath = window.location.pathname.split('/');
            var newPath = window.location.protocol + "//" + window.location.host;
            for (i = 0; i < currPath.length - 1; i++) {
                newPath += currPath[i];
                newPath += "/";
            }
            newPath += path;
            window.location.href = newPath;
        }
    });
});
