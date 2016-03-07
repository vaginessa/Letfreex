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

function getMovieInfo(url) {
    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
              "q=select%20*%20from%20html%20where%20url%3D%22" +
              encodeURIComponent(url) +
              "%22&format=xml'&callback=?",
      function (data) {
          if (data.results[0]) {
              var html = data.results[0];

              var patt = new RegExp("nowvideo.../video/([0-9a-zA-Z]*)", 'gi');
              var res = html.match(patt);

              var urls = []
              for (var i = 0; i < res.length; i++) {
                  movie.urls.push(res[i].split("/video/")[1]);
              }

              console.log(movie)
          }
      }
    );
}