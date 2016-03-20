function scrapePage(url, isSerieTv, section) {

    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          arrayFilm = [];
          if (data.results[0]) {
              var html = data.results[0];

              var articoli = html.split('featuredItem');
              for (var i = 1; i < articoli.length; i = i + 2) {
                  try {
                      var movie = {
                          title: articoli[i].split('html">')[1].split('</a')[0],
                          img: articoli[i].split("src=\"")[1].split('"')[0],
                          url: articoli[i].split('href="')[1].split('"')[0]
                      };
                      arrayFilm.push(movie);
                  } catch (e) {
                      console.log(e);
                  }
                  
              }

              //Prossima pagina
              var n = parseInt(url.split('=')[1]) + 1;
              arrayFilm.push(url.substr(0, url.length - 1) + n );

              console.log(arrayFilm)
              printPage(isSerieTv, section);
          }
      }
    );
}

function scrapeMostPopular(url, isSerieTv, section) {

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
                  var pattern = new RegExp("nowvideo....?/video/([0-9a-zA-Z]*)", 'gi');
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
                  var regex = '([0-9]{1,3}x[0-9]{1,3}[0-9A-Za-z –אשלעטי]*).*http:\/\/www.rapidvideo.org/([a-z0-9A-Z\/._-]+)/.*?Rapidvideo';
                  var patt = new RegExp(regex, 'gi');

                  //Levo la roba che non serve
                  html = html.split('Guarda L')[0];

                  var link = "";
                  var stagione = "0";
                  var episodio = "0";
                  while (res = patt.exec(html)) {
                      console.log('trovato ' + res[1] + " - " + res[2]);
                      var seasonEpisodeRegex = "([0-9]{1,3})(?:[^0-9A-Za-z]+|&#[0-9]{4};|x|X)([0-9]{1,3}).*";
                      var seasonEpisodePattern = new RegExp(seasonEpisodeRegex, 'gi');

                      while (response = seasonEpisodePattern.exec(res[1])) {
                          console.log('stagione ' + response[1] + " episodio " + response[2]);
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

    var url = "http://www.piratestreaming.news/cerca.php?all=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false);
}


//ITALIAFILM
//Most popular
//openPage("http://www.italia-film.co/category/film-streaming-2016/", false, 'movieMostPopularSliderContainer', true);
//openPage("http://www.italia-film.co/category/film-streaming-2016/", true, 'serieTvMostPopularSliderContainer', true);
$('.movieMostPopularTitle').addClass('hidden');
$('.serieMostPopularTitle').addClass('hidden');
$('#homeFilmMostPopular').addClass('hidden');
$('#homeSerieTvMostPopular').addClass('hidden');

//Ultime uscite
openPage("http://www.piratestreaming.news/film-aggiornamenti.php?pageNum_lista_film=1", false, 'movieSliderContainer', false);
openPage("http://www.piratestreaming.news/film-aggiornamenti.php?pageNum_lista_film=2", false, 'movieSliderContainer', false);
openPage("http://www.piratestreaming.news/serietv-aggiornamentii.php?pageNum_lista_film=1", true, 'serieTvSliderContainer', false);
openPage("http://www.piratestreaming.news/serietv-aggiornamentii.php?pageNum_lista_film=2", true, 'serieTvSliderContainer', false);
