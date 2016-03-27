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

function openPage(url, isSerieTv, section, mostPopular) {
    /*if (localStorage.getItem(url) != undefined &&
        localStorage.getItem(url).split('|')[0] > new Date().getTime()) {
        
        arrayFilm = openFromCache(url);
        printPage(isSerieTv, section);
    }
    else {*/
    if (!mostPopular)
        scrapePage(url, isSerieTv, section)
    else
        scrapeMostPopular(url, isSerieTv, section)
    //}

}

function printPage(isSerieTv, section) {
    $('#loadingSearch').addClass('hidden');

    var htmlFilm;
    var firstTime;

    if (isEmpty($("#" + section)))
        firstTime = true;
    else
        firstTime = false;

    //Rimuovo il pulsante pagina successiva
    $('.nextPage' + section).remove();

    for (var i = 0; i < arrayFilm.length; i++) {
        if (arrayFilm[i].url != undefined)
            htmlFilm = "<div class=\"swiper-slide\"><a  tabindex=\"0\" onclick=\"openMovie('" + arrayFilm[i].url + "','" + arrayFilm[i].title + "','" + arrayFilm[i].img + "'," + isSerieTv + ")\" ><img class='posterImg' src='" + arrayFilm[i].img + "'></a></div>";
        else
            htmlFilm = "";
        if ((!firstTime || section == "searchResultContainer") && i == arrayFilm.length - 1 && typeof arrayFilm[i] == "string")
            htmlFilm = "<div class=\"swiper-slide text-center nextPage" + section + "\" tabindex=\"0\" onclick=\"nextPage('" + arrayFilm[i] + "'," + isSerieTv + ",'" + section + "')\"><img class='posterImg arrow' src='img/arrow-right.png'></div>";
        $("#" + section).html($("#" + section).html() + htmlFilm)
    }

    //Pusho nel carousel un oggetto random tra quelli nell'array
    pushRandomItemInCarousel(isSerieTv);
          
    var slidePerView = 0;
    var windowLength = $(window).width();
    if (windowLength>=1024 && windowLength <= 1350)
        slidePerView = 5;
    if (windowLength >= 1350 && windowLength <= 1700)
        slidePerView = 6;
    if (windowLength >= 1800)
        slidePerView = 8;
    if (windowLength < 1024 && windowLength >= 768)
        slidePerView = windowLength / 176;
    if (windowLength < 768)
        slidePerView = windowLength / 140 ;

    if ($('.' + section)[0].swiper)
        $('.' + section)[0].swiper.destroy();

    mySwiper = new Swiper('.' + section, {
        slidesPerView: Math.floor(slidePerView),
        spaceBetween: 30,
        freeMode: true
    });
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


main();










