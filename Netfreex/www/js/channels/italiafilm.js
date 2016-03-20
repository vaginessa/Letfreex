function scrapePage(url, isSerieTv, section) {

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
              printPage(isSerieTv, section)
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
                      img: "http:" + articoli[i].split("pagespeed_lazy_src=\"")[1].split('"')[0],
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
                  //Estrae link nowvideo normale
                  var pattern = new RegExp("nowvideo.../video/([0-9a-zA-Z]*)", 'gi');
                  while (res = pattern.exec(html)) {
                      console.log('trovato ' + res[1])
                      $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"> <img class=\"poster play\" src=\"img/play_button.png\" /></div>")
                      $('.guarda').removeClass('hidden');
                      $('#playButton').removeClass('hidden');
                      $('#loadingLink').addClass('hidden');

                  }
                  $('.guarda').removeClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');

              } else {
                  var html = data.results[0];
                  //Estrae link nowvideo con titolo
                  var regex = '([0-9]{1,3}(?:[^0-9A-Za-z]|&#[0-9]{3};)[0-9]{1,3}[0-9A-Za-z –אשלעטי]*).*http:\/\/.*\/([a-z0-9A-Z]+).*Nowv';
                  var patt = new RegExp(regex, 'gi');

                  //Levo la roba che non serve
                  html = html.split('entry-content')[1].split('disqus_thread')[0];

                  var link = "";
                  var stagione = "0";
                  var episodio = "0";
                  while (res = patt.exec(html)) {
                      console.log('trovato ' + res[1] + " - " + res[2]);

                      //Preparo la divisione in stagioni 
                      var seasonEpisodeRegex = "([0-9]{1,3})(?:[^0-9A-Za-z\.]+|&#[0-9]{4};)([0-9]{1,3}).*";
                      var seasonEpisodePattern = new RegExp(seasonEpisodeRegex, 'gi');

                      while (response = seasonEpisodePattern.exec(res[1])) {
                          console.log('stagione ' + response[1] + " episodio " + response[2]);

                          //Se la stagione inizia con 0, lo tolgo per non creare problemi
                          if (response[1][0] == "0")
                              response[1] = response[1].substr(1, response[1].length);

                          if (stagione != response[1]) {
                              if (stagione != "0")
                                  link += "</div><div id=\"stagione" + response[1] + "\" class=\"season hidden\">";
                              else
                                  link += "<div id=\"stagione" + response[1] + "\" class=\"season\">";
                              stagione = response[1];

                          }
                          episodio = response[2];
                      }
                      link += "<div info=\"" + stagione + "x" + episodio + "\"  class=\"guarda col-md-4 col-xs-12 hidden\"> <div tabindex=\"0\" onclick=\"openVideo('" + res[2] + "')\"> <div class=\"playContainer\" style=\"background-position: center;background-repeat: no-repeat;\"><img class=\"playSeries\" src=\"img/playSeries.png\" /></div><h4>" + res[1].replace('-', '') + "</h4></div></div>";
                  }
                  link += "</div>";
                  $('#playButton').html(link);
                  $('.guarda').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#playButton').addClass('backgroundBlack');

                  getEpisodesInfo();
              }

          }
      }
    );
}

function search() {
    var input = encodeURI($('#search').val());

    var url = "http://www.italia-film.co/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false);
}


//ITALIAFILM
//Most popular
openPage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieMostPopularSliderContainer', true);
openPage("http://www.italia-film.co/category/film-streaming-2016/", true, 'serieTvMostPopularSliderContainer', true);

//Ultime uscite
openPage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieSliderContainer', false);
openPage("http://www.italia-film.co/category/film-streaming-2016/page/2/", false, 'movieSliderContainer', false);
openPage("http://www.italia-film.co/category/telefilm/", true, 'serieTvSliderContainer', false);
openPage("http://www.italia-film.co/category/telefilm/page/2/", true, 'serieTvSliderContainer', false);

