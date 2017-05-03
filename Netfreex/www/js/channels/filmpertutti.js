function extractVcrypt(url, host, download) {
    debugger
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("https://vcrypt.pw/open/" + url, {}, {}, function (response) {

        try {
            var urlVideo = response.data;
            switch (host) {
                case 'nowvideo':
                    url = urlVideo.match("/video/([a-zA-Z0-9]+)")[1];
                    break;
                case 'openload':
                    url = urlVideo.match("openload.[a-z]{2,5}/f/([^\"]+)/?")[1];
                    break;
                case 'streaminto':
                    url = urlVideo.match("streamin.[a-z]{2,5}/([a-zA-Z0-9]+)")[1];
                    break;
                case 'flashx':
                    url = urlVideo.match("flashx.[a-z]{2,5}/([a-zA-Z0-9]+).html")[1];
                    break;
            }

            console.log(url);
            openVideo(host, url, download);
        } catch (e) {
            error(e);
        }
       
    }, function (response) {
        console.log(response.headers.Location);
        doPostVcrypt(response.headers.Location.replace("http", "https"), host, url, download);
    });
  


}

function doPostVcrypt(idVcrypt, host, url, download) {
    cordovaHTTP.setHeader("Content-Type", "application/x-www-form-urlencoded");
    cordovaHTTP.post(idVcrypt, {
        go: "go",
    }, {}, function (response) {
        try {
            var urlVideo = response.data.split('url=')[1].split("'")[0];
            switch (host) {
                case 'nowvideo':
                    url = urlVideo.match("/video/([a-zA-Z0-9]+)")[1];
                    break;
                case 'openload':
                    url = urlVideo.match("openload.[a-z]{2,5}/f/([^']+)/?")[1];
                    break;
                case 'streaminto':
                    url = urlVideo.match("streamin.[a-z]{2,5}/([a-zA-Z0-9]+)")[1];
                    break;
                case 'flashx':
                    url = urlVideo.match("flashx.[a-z]{2,5}/([a-zA-Z0-9]+).html")[1];
                    break;
            }

            console.log(url);
            openVideo(host, url, download);
        } catch (e) {
            error(e);
        }

    }, function (response) {
        error(response);
    });
}


function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    html = html.split('<ul class="posts">')[1].split('<footer>')[0];

    var articoli = html.split('<li>');
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            var movie = {
                title: articoli[i].split('class="title">')[1].split('</div')[0],
                img: articoli[i].split('data-thumbnail="')[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0],
                isSerieTv: isSerieTv
            };
            //Pulisco tag html da titolo
            var div = document.createElement("div");
            div.innerHTML = movie.title;
            movie.title = div.textContent || div.innerText || "";
            movie.title = movie.title.toLowerCase().replace("serie tv", "");
            arrayFilm.push(movie);
        } catch (e) {
           
            continue;
        }
    }

    //Prossima pagina
    var patt = new RegExp('<a href="([^<]*)"[ ]*>Pagina successiva', 'gi');
    while (res = patt.exec(html)) {
        console.log(res[1])
        arrayFilm.push(res[1])

    }

    console.log(arrayFilm)
    printPage(isSerieTv, section, nextPage, callback);
}

function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
        html = html.split("Streaming:")[1];
        try {
            var quality = html.split("Streaming HD:");
            manageMovieLinks(quality[0], quality[1].split("Download")[0]);
        } catch (e) {
            manageMovieLinks(html);
        }


        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');
        

    } else {
        //Levo la roba che non serve
        html = html.split('<section id="content">')[1].split('disqus_thread')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
    $('#loading').addClass('hidden');
}

function search() {
    var input = encodeURI($('#search').val());

    var url = localStorage.filmPerTuttiUrl + "/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    addSection("movie", "Film - Ultime uscite"),
    addSection("serieTv", "Serie TV - Ultime uscite"),
    addSection("movieAzione", "Film - Azione"),
    addSection("movieCommedia", "Film - Commedia"),
    addSection("movieDrammatico", "Film - Drammatico"),
    addSection("movieHorror", "Film - Horror"),
    addSection("movieRomantico", "Film - Romantico"),
    addSection("movieFantascienza", "Film - Fantascienza"),
    addSection("movieThriller", "Film - Thriller"),
    addSection("movieAnimazione", "Film - Animazione"),
    addSection("movieFantasy", "Film - Fantasy"),
];
$("#welcome").addClass("hidden");

$(document).on("ready", function () {
    Promise.all([
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/", false, 'movie', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/serie-tv/", true, 'serieTv', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/azione/", false, 'movieAzione', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/commedia/", false, 'movieCommedia', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/drammatico/", false, 'movieDrammatico', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/horror/", false, 'movieHorror', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/romantico/", false, 'movieRomantico', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/fantascienza/", false, 'movieFantascienza', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/thriller/", false, 'movieThriller', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/animazione/", false, 'movieAnimazione', false, null),
            asyncOpenPage(localStorage.filmPerTuttiUrl + "/category/film/fantasy/", false, 'movieFantasy', false, null),
    ])
    .then(function () {
        initViewChannelMode(sections);
    })
    .catch(function (e) {
        console.error(e);
    });

});