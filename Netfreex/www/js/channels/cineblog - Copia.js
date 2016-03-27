function scrapePage(url, isSerieTv, section) {
    console.log(url)
    
    url = "http://query.yahooapis.com/v1/public/yql?" +"q=select%20*%20from%20html%20where%20url%3D%22" +
                encodeURIComponent(url) + "%22&format=xml'&callback=?"

    $.getJSON(url,
        function (data) {
            console.log(data)
            if (data.results[0] ) {
                var html;
                html = data.results[0];
                arrayFilm = [];

                var articoli = html.split("filmbox");               

                var start = 1;

                for (var i = start; i < articoli.length; i++) {
                    var anno = "";
                    if (isSerieTv) {
                        try {
                            var plot = articoli[i].split('span8')[1].split('<div class="rating">')[0];
                            anno = "(" + plot.split('(')[1].substr(0, 4) + ")";
                        } catch (e) {
                            anno = "";
                        }
                        
                    }
                    var movie = {
                        title: articoli[i].split('"title": "')[1].split('"')[0] + anno,
                        img: articoli[i].split("src=\"")[1].split('"')[0],
                        url: articoli[i].split('href="')[1].split('"')[0]
                    };
                    arrayFilm.push(movie);
                }

                //Prossima pagina
                var patt = new RegExp('<li><a href="([a-z0-9A-Z' + escapeRegExp(':/.') + ']*)">&gt;</a>', 'gi');
                while (res = patt.exec(html)) {
                    console.log(res[1])
                    arrayFilm.push(res[1]);
                }

                console.log(arrayFilm)
                printPage(isSerieTv, section);
            }
        }
      );
}

function search() {
    var input = encodeURI($('#search').val());

    var url;
    if ($('#serieTv').prop('checked'))
        url = "http://www.cb01.co/serietv/search/" + input
    else
        url = "http://www.cb01.co/search/" + input

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false);
}

function extractLinkCineblog(url) {
    console.log(url)
    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          if (data.results[0]) {
              var html = data.results[0];
              console.log('ok')
              var url = html.split("/video/")[1].split('"')[0];
              console.log(url)
              nowvideo.extract(url, success, error);
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
                  //Estrae link nowvideo (link unico)
                  var patt = new RegExp('xyz/link/([a-z0-9A-Z]*)/" target="_blank">Nowvideo', 'gi');
                  while (res = patt.exec(html)) {
                      console.log('trovato ' + res[1])
                      $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"> <img class=\"poster play\" src=\"img/play_button.png\" /></div>");
                  }

                  //Estrae link nowvideo (link multipli)
                  try {
                      var linkCode = html.split('<td>Nowvideo:')[1].split('<tr>')[0];
                      var patt = new RegExp('xyz/link/([a-z0-9A-Z]*)/"', 'gi');

                      while (res = patt.exec(linkCode)) {
                          $('#playButton').html($('#playButton').html() + "<div class=\"guarda hidden\"  onclick=\"openVideo('" + res[1] + "')\"><img class=\"poster play\" src=\"img/play_button.png\" /></div>");
                      }
                  } catch (e) {
                      console.error(e);
                  }

                  //Estrae link nowvideo normale
                  var pattern = new RegExp("nowvideo.../video/([0-9a-zA-Z]*)", 'gi');
                  while (res = pattern.exec(html)) {
                      console.log('trovato ' + res[1]);

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
                  var regex = '(?:([0-9]{1,3}(?:[^0-9A-Za-z]|&#[0-9]{4};)[0-9]{1,3}[0-9A-Za-z –אשלעטי]*).*http:\/\/.*\/([a-z0-9A-Z]+).*Nowv|(STAGIONE.*ITA\W*\n))';
                  var patt = new RegExp(regex, 'gi');
                  html = html.split('post_content')[1].split('disqus_thread')[0];

                  var link = "";
                  var stagione = "0";
                  var episodio = "0";
                  var previousLingua = "";
                  var currentLingua = "";

                  while (res = patt.exec(html)) {

                      if (res[0].toUpperCase().indexOf('STAGIONE') != -1) {
                          if (res[0].toUpperCase().indexOf('SUB') != -1)
                              currentLingua = "SUB-ITA";
                          else
                              currentLingua = "ITA";
                          continue;
                      }
                      
                      console.log('trovato ' + res[1] + " - " + res[2]);

                      //Preparo la divisione in stagioni 
                      var seasonEpisodeRegex = "([0-9]{1,3})(?:[^0-9A-Za-z\.]+|&#[0-9]{4};)([0-9]{1,3}).*";
                      var seasonEpisodePattern = new RegExp(seasonEpisodeRegex, 'gi');

                      while (response = seasonEpisodePattern.exec(res[1])) {
                          console.log('stagione ' + response[1] + " episodio " + response[2]);

                          //Se la stagione inizia con 0, lo tolgo per non creare problemi
                          if (response[1][0] == "0")
                              response[1] = response[1].substr(1, response[1].length);

                          if (stagione != response[1] || currentLingua != previousLingua) {
                              previousLingua = currentLingua;
                              if(stagione != "0")
                                  link += "</div><div id=\"stagione" + response[1] + "_" + currentLingua + "\" lingua=\"" + currentLingua + "\" class=\"season hidden\">";
                              else
                                  link += "<div id=\"stagione" + response[1] + "_" + currentLingua + "\" lingua=\"" + currentLingua + "\" class=\"season\">";
                              stagione = response[1];
                              
                          }
                          episodio = response[2];
                      }
                      link += "<div info=\"" + stagione + "x" + episodio + "\"  class=\"guarda col-md-4 col-xs-12 hidden\"> <div tabindex=\"0\" onclick=\"openVideo('" + res[2] + "')\"> <div class=\"playContainer\" style=\"background-position: center;background-repeat: no-repeat;\"><img class=\"playSeries\" src=\"img/playSeries.png\" /></div><h4>" + res[1].replace('-', '') + "</h4></div></div>";
                  }

                  if (link != "") {
                      link += "</div>";

                      //Mostro i link
                      $('#playButton').html(link);
                      getEpisodesInfo();
                  } else {
                      link = "<i class='fa fa-warning fa-2x'></i><br>Nessun link disponibile su questo canale. Prova su un altro.";
                      $('#playButton').html(link);
                  }

                  $('.guarda').removeClass('hidden');
                  $('#loadingLink').addClass('hidden');
                  $('#playButton').removeClass('hidden');
                  $('#playButton').addClass('backgroundBlack');
                  
                  

                  

              }
              
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
              var articoli = html.split('blockvids')
              for (var i = 1; i < articoli.length; i++) {
                  var movie = {
                      title: articoli[i].split('/">')[1].split('<')[0],
                      img: articoli[i].split("src=\"")[1].split('"')[0],
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

//CINEBLOG
//Most popular
openPage("http://www.cb01.co/", false, 'movieMostPopularSliderContainer', true);
openPage("http://www.cb01.co/serietv/", true, 'serieTvMostPopularSliderContainer', true);

//Ultime uscite
openPage("http://www.cb01.co/", false, 'movieSliderContainer', false);
openPage("http://www.cb01.co/page/2/", false, 'movieSliderContainer', false);
openPage("http://www.cb01.co/serietv/", true, 'serieTvSliderContainer', false);
openPage("http://www.cb01.co/serietv/page/2/", true, 'serieTvSliderContainer', false);

