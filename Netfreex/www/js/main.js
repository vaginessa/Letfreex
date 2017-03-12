function main() {
(function () {
    'use strict';

    $(".dropdown-menu").on('click', 'li a', function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });
    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    });
}());
}

//Scraping e print delle locandine in homepage =================================================
var arrayFilm = [];
var arrayCarousel = [];
var mySwiper;

function openPage(url, isSerieTv, section, mostPopular, nextPage, callback) {
    /*if (localStorage.getItem(url) != undefined &&
        localStorage.getItem(url).split('|')[0] > new Date().getTime()) {
        
        arrayFilm = openFromCache(url);
        printPage(isSerieTv, section);
    }
    else {*/

    if (!mostPopular)
        scrapePage(url, isSerieTv, section, nextPage, callback);
    else
        scrapeMostPopular(url, isSerieTv, section, callback);
    //}

}

//Apre una pagina del canale
function scrapePage(url, isSerieTv, section, nextPage, callback) {
    get(url, function (response) {
        parsePage(response, url, isSerieTv, section, nextPage, callback);
    }, function (er) {
        console.error(er);
    });
}

function scrapeMostPopular(url, isSerieTv, section, callback) {
    get(url, function (response) {
        parseMostPopular(response, url, isSerieTv, section, callback);
    }, function (er) {
        console.error(er);
    });
}

function printPage(isSerieTv, section, nextPage, callback) {
    $('#loadingSearch').addClass('hidden');

    var htmlFilm;

    //Rimuovo il pulsante pagina successiva
    $('.nextPage' + section).remove();

    for (var i = 0; i < arrayFilm.length; i++) {
        if (arrayFilm[i].url != undefined)
            htmlFilm = "<div class=\"swiper-slide\"><a  tabindex=\"0\" onclick=\"openMovie('" + arrayFilm[i].url + "','" + arrayFilm[i].title + "','" + arrayFilm[i].img + "'," + isSerieTv + ")\" ><img class='posterImg' src='" + arrayFilm[i].img + "'></a></div>";
        else
            htmlFilm = "";
        if ( i == arrayFilm.length - 1 && typeof arrayFilm[i] == "string")
            htmlFilm = "<div class=\"swiper-slide text-center nextPage" + section + "\" tabindex=\"0\" onclick=\"nextPage('" + arrayFilm[i] + "'," + isSerieTv + ",'" + section + "')\"><img class='posterImg arrow' src='img/arrow-right.png'></div>";
        $("#" + section).html($("#" + section).html() + htmlFilm)
    }

    //Pusho nel carousel un oggetto random tra quelli nell'array
    pushRandomItemInCarousel(isSerieTv);

    if (nextPage) {
        initializeSliderPoster(section);
    }

    if (callback) {
        callback();
    }
        
}

function pushRandomItemInCarousel(isSerie) {
    var obj = arrayFilm[Math.floor(Math.random() * arrayFilm.length-1) + 0];
    searchMovieInfo(obj, isSerie, true);  
}

function fillCarousel() {
    for (var i = 0; i < arrayCarousel.length; i++) {
        var isSerie = arrayCarousel[i].results[0].name != undefined;
        var title = isSerie ? arrayCarousel[i].results[0].name : arrayCarousel[i].results[0].title;
        var item = "<div data-p=\"225.00\"  style=\"display: none;\">" +
            '<img data-u="image" src="' + selectBackgroundSize() + arrayCarousel[i].results[0].backdrop_path + '"/>' +
             "<img onclick=\"openMovie('" + arrayCarousel[i].info.url + "','" + arrayCarousel[i].info.title + "','" + arrayCarousel[i].info.img + "', " + isSerie + ")\" style=\"position: absolute;top: 26%;left: 55%;\" src=\"img/play_button.png\" />" +
            '<div id="carouselPoster" class="sfumato" style="height: 100%; padding-top: 6% ; padding: 55px;">' +
                 //'<h2 style="color:white">' + title + '</h2>' +
                  '<img class="carouselImg" src="https://image.tmdb.org/t/p/w500' + arrayCarousel[i].results[0].poster_path + '">' +
                  //'<div class="carouselPlot" class="scroll">' + truncate(arrayCarousel[i].results[0].overview) + '</div>' +
             '</div>'+
        '</div>';

        $('#carouselItems').append(item);
    } 

    

    initializeSlider();
   
    if ($(window).width() > 768) {
        var options = { $AutoPlay: true, $ArrowKeyNavigation: 0, $Idle: 3000 };
        var jssor_slider1 = new $JssorSlider$('jssor_1', options);
    }

    $('#tf-home').removeClass('hidden');    
}

function initializeSliderPoster(section) {
    if ($('.' + section)[0].swiper)
        $('.' + section)[0].swiper.destroy();

    mySwiper = new Swiper('.' + section, {
        slidesPerView: Math.floor(slidePerView),
        spaceBetween: 30,
        freeMode: true
    });
}

//Apre la pagina principale di un film o serie
function getVideoLink(url, isSerieTv) {
    get(url, function (response) {
        parseMoviePage(response, url, isSerieTv);
    }, function (er) {
        console.error(er);
    });
}




main();


//INIZIALIZZAZIONE DELLA VIEW
$(window).on("load", function () {

        initView();
});



function initView() {
    FastClick.attach(document.body);
    $('img').imageReloader();

    //Eventi per navigazione tramite tastiera/telecomando
    $(document).keydown(
        function (e) {
            if (e.keyCode == 13) {
                $(":focus").click();
            }
            if (e.keyCode == 37) {
                $.emulateTab(-1);
            }
            if (e.keyCode == 39) {
                $.emulateTab();
            }
        }
    );
    
    $('#loading').addClass('hidden');
    $('.tf-menu').removeClass('hidden');
    $('#tf-menu').removeClass('hidden');

    //NASCONDO GLI SLIDER VUOTI
    if (isEmpty($('#movieSliderContainer'))) {
        $('.movieLastTitle').addClass('hidden');
        $('#homeFilm').addClass('hidden');
    }
    if (isEmpty($('#serieTvSliderContainer'))) {
        $('.serieLastTitle').addClass('hidden');
        $('#homeSerieTv').addClass('hidden');
    }
    if (isEmpty($('#serieTvMostPopularSliderContainer'))) {
        $('.serieMostPopularTitle').addClass('hidden');
        $('#homeSerieTvMostPopular').addClass('hidden');
    }
    if (isEmpty($('#movieMostPopularSliderContainer'))) {
        $('.movieMostPopularTitle').addClass('hidden');
        $('#homeFilmMostPopular').addClass('hidden');
    }

    //SE SONO VUOTI TUTTI DO ERRORE DI RETE
    if (isEmpty($('#movieSliderContainer')) && isEmpty($('#serieTvSliderContainer')) && isEmpty($('#serieTvMostPopularSliderContainer')) && isEmpty($('#movieMostPopularSliderContainer'))) {
        $('#error').removeClass('hidden');
    }
    slidePerView = 4;
    //Inizializzo gli slider con le copertine
    var windowLength = $(window).width();
    if (windowLength >= 1024 && windowLength <= 1350)
        slidePerView = 5;
    if (windowLength >= 1350 && windowLength <= 1700)
        slidePerView = 6;
    if (windowLength >= 1800)
        slidePerView = 8;
    if (windowLength < 1024 && windowLength >= 768)
        slidePerView = 4;
    if (windowLength < 768)
        slidePerView = 4;

    for (var i = 0; i < sections.length; i++) {
        initializeSliderPoster(sections[i]);
    }

    //Carousel
    fillCarousel();

}










