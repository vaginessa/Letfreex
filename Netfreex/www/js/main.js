function main() {
(function () {
   'use strict';
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
    })
}());
}

function changeBG() {
    $('#bs-example-navbar-collapse-1').css("background-color", "rgba(0, 0, 0, 0.79)");
}

function isEmpty(el) {
    return !$.trim(el.html())
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

//Scraping e print delle locandine in homepage =================================================
var arrayFilm = [];
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
    var htmlFilm = "";
    var viewPage = "";

    if (isSerieTv)
        viewPage = "viewSerie.html";
    else
        viewPage = "viewMovie.html";

    var firstTime = true;

    if (isEmpty($("#" + section)))
        firstTime = true;
    else
        firstTime = false;

    //Rimuovo il pulsante pagina successiva
    $('.nextPage' + section).remove();

    for (var i = 0; i < arrayFilm.length; i++) {
        if (arrayFilm[i].url != undefined)
            htmlFilm = "<div class=\"swiper-slide\"><a  tabindex=\"0\" onclick=\"openMovie('" + arrayFilm[i].url + "','" + escape(arrayFilm[i].title) + "'," + isSerieTv + ")\" ><img class='posterImg' src='" + arrayFilm[i].img + "'></a></div>";
        else
            htmlFilm = "";
        if ((!firstTime || section == "searchResultContainer") && i == arrayFilm.length - 1 && typeof arrayFilm[i] == "string")
            htmlFilm = "<div class=\"swiper-slide text-center nextPage" + section + "\" tabindex=\"0\" onclick=\"nextPage('" + arrayFilm[i] + "'," + isSerieTv + ",'" + section + "')\"><img class='posterImg arrow' src='img/arrow-right.png'></div>";
        $("#" + section).html($("#" + section).html() + htmlFilm)
    }
    
        
    var slidePerView = 0;
    var windowLength = $(window).width();
    if (windowLength>=1024 && windowLength <= 1350)
        slidePerView = 5;
    if (windowLength>=1350 && windowLength <= 1700)
        slidePerView = 6
    if (windowLength >= 1800 )
        slidePerView = 8
    if (windowLength < 1024 && windowLength >= 768)
        slidePerView = windowLength / 176;
    if (windowLength < 768)
        slidePerView = windowLength / 133 ;

    if ($('.' + section)[0].swiper)
        $('.' + section)[0].swiper.destroy();

    mySwiper = new Swiper('.' + section, {
        slidesPerView: Math.floor(slidePerView),
        spaceBetween: 30,
        freeMode: true,
        //keyboardControl: true,
        
        
})

    $('#loadingSearch').addClass('hidden');

}

main();

//scrapeMostPopular("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieMostPopularSliderContainer');
//scrapeMostPopular("http://www.italia-film.co/category/film-streaming-2016/", true, 'serieTvMostPopularSliderContainer');
//scrapePage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieSliderContainer');
//scrapePage("http://www.italia-film.co/category/film-streaming-2016/page/2/", false, 'movieSliderContainer');
//scrapePage("http://www.italia-film.co/category/telefilm/", true, 'serieTvSliderContainer');
//scrapePage("http://www.italia-film.co/category/telefilm/page/2/", true, 'serieTvSliderContainer');

//Most popular
openPage("http://www.cb01.co/", false, 'movieMostPopularSliderContainer', true);
openPage("http://www.cb01.co/serietv/", true, 'serieTvMostPopularSliderContainer', true);

//Ultime uscite
openPage("http://www.cb01.co/", false, 'movieSliderContainer', false);
openPage("http://www.cb01.co/page/2/", false, 'movieSliderContainer', false);
openPage("http://www.cb01.co/serietv/", true, 'serieTvSliderContainer', false);
openPage("http://www.cb01.co/serietv/page/2/", true, 'serieTvSliderContainer', false);









