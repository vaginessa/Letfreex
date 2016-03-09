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
              var counter = 0;

              if (!isSerieTv) {
                  //Estrae link nowvideo (link unico)
                  var patt = new RegExp('xyz/link/([a-z0-9A-Z]*)/" target="_blank">Nowvideo', 'gi');
                  while (res = patt.exec(html)) {
                      console.log('trovato ' + res[1])
                      $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"> <img class=\"poster\" src=\"img/play_button.png\" /></div>")

                  }


                  //Estrae link nowvideo (link multipli)
                  try {
                      var linkCode = html.split('<td>Nowvideo:')[1].split('<tr>')[0];
                      var patt = new RegExp('xyz/link/([a-z0-9A-Z]*)/"', 'gi');

                      while (res = patt.exec(linkCode)) {
                          $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"><img class=\"poster\" src=\"img/play_button.png\" /></div>")
                      }
                  } catch (e) {
                      console.error(e)
                  }

                  //Estrae link nowvideo normale
                  var pattern = new RegExp("nowvideo.../video/([0-9a-zA-Z]*)", 'gi');
                  while (res = pattern.exec(html)) {
                      console.log('trovato ' + res[1])
                      $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"> <img class=\"poster\" src=\"img/play_button.png\" /></div>")
                      $('.guarda').removeClass('hidden');
                      $('#playButton').removeClass('hidden');
                      $('#loadingLink').addClass('hidden');

                  }
                  $('.guarda').removeClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');

              } else {
                  var html = data.results[0];
                  console.log(html)
                  //Estrae link nowvideo con titolo (template nuovo)
                  //var patt = new RegExp('([0-9]+.{1,6}[0-9]+[^<]*).*<a href="http://swzz.xyz/link/([a-z0-9A-Z]*)/" target="_blank">Nowvideo', 'gi');
                  var regex = '([0-9]{1,3}(?:[^0-9A-Za-z]|&#[0-9]{3};)[0-9]{1,3}[0-9A-Za-z –אשלעטי]*).*http:\/\/.*\/([a-z0-9A-Z]+).*Nowv';
                  var patt = new RegExp(regex, 'gi');
                  html = html.split('entry-content')[1].split('disqus_thread')[0];

                  var link = ""
                  while (res = patt.exec(html)) {
                      console.log('trovato ' + res[1] + " - " + res[2])
                      link += "<div class=\"guarda col-md-4 col-xs-12 hidden\"  onclick=\"openVideo('" + res[2] + "')\"> <img class=\"poster play\" src=\"img/play_button.png\" /><h4>" + res[1].replace('-', '') + "</h4></div>"
                  }
                  $('#playButton').html(link)
                  $('.guarda').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#playButton').addClass('backgroundBlack');
              }

          }
      }
    );
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