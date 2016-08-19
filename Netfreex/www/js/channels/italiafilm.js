function scrapePage(url, isSerieTv, section, nextPage) {

    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          arrayFilm = [];
          if (data.results[0]) {
              var html = data.results[0];

              var articoli = html.split('article')
              for (var i = 1; i < articoli.length; i = i + 2) {
                  var movie = {
                      title: articoli[i].split('title="')[1].split('"')[0],
                      img: articoli[i].split("echo=\"")[1].split('"')[0],
                      url: articoli[i].split('href="')[1].split('"')[0]
                  };
                  arrayFilm.push(movie);
              }

              //Prossima pagina
              var patt = new RegExp('<a class="next page-numbers" href="(.*)">', 'gi');
              while (res = patt.exec(html)) {
                  console.log(res[1])
                  arrayFilm.push(res[1])
              }

              console.log(arrayFilm)
              printPage(isSerieTv, section, nextPage)
          }
      }
    );
}

function scrapeMostPopular(url, isSerieTv, section) {

    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          if (data.results[0]) {
              var html = data.results[0];
              arrayFilm = [];
              var articoli = html.split('thumb_series')

              var start;
              if (isSerieTv)
                  start = 1;
              else
                  start = 10;
              for (var i = start; i < articoli.length; i++) {
                  var movie = {
                      title: articoli[i].split('title="')[1].split('"')[0],
                      img: "http:" + articoli[i].split("pagespeed_lazy_src=\"")[1].split('"')[0].replace('http:',''),
                      url: articoli[i].split('href="')[1].split('"')[0]
                  };
                  
                  arrayFilm.push(movie);

                  if (i == 9)
                      break;
              }
              console.log(arrayFilm)
              printPage(isSerieTv, section)
          }
      }
    );
}

function getVideoLink(url, isSerieTv) {
    console.log('chiamata get movie')
    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          if (data.results[0]) {
              var html = data.results[0];

              if (!isSerieTv) {
                  manageMovieLinks(html);

                  $('.guarda').removeClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');

              } else {
                  var html = data.results[0];

                  //Levo la roba che non serve
                  html = html.split('entry-content')[1].split('disqus_thread')[0];

                  var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

                  manageSerieTvLinks(html, regexStagione);
              }

          }
      }
    );
}

function search() {
    var input = encodeURI($('#search').val());

    var url = "http://www.italia-film.co/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "movieMostPopularSliderContainer",
    "serieTvMostPopularSliderContainer",
    "movieSliderContainer",
    "serieTvSliderContainer"
];

//ITALIAFILM
//Most popular
openPage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieMostPopularSliderContainer', true);
openPage("http://www.italia-film.co/category/film-streaming-2016/", true, 'serieTvMostPopularSliderContainer', true);

//Ultime uscite
openPage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieSliderContainer', false);
openPage("http://www.italia-film.co/category/serie-tv/", true, 'serieTvSliderContainer', false);
    //openPage("http://www.italia-film.co/category/film-streaming-2016/page/2/", false, 'movieSliderContainer', false);
    //openPage("http://www.italia-film.co/category/serie-tv/page/2/", true, 'serieTvSliderContainer', false);



