function extractVcrypt(url, host, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.get(localStorage.cinemaLiberoUrl + "/goto/" + url, {}, {}, function (response) {
        if (response.data.indexOf("nowvideo") > -1) {
            var idVideo = response.data.match("/video/([a-zA-Z0-9]+)")[1];
            openVideo("nowvideo", idVideo, download);
            return;
        }
        if (response.data.indexOf("openload") > -1) {
            var idVideo = response.data.match("openload.[a-z]{2,5}/f/([^\"]+)/?")[1];
            openVideo("openload", idVideo, download);
            return;
        }
        error("not found");
    }, function (response) {
        try{
            var redUrl = response.error.split('url=')[1].split('"')[0].replace(" ", "");

            if (redUrl.indexOf("raptu") > -1) {
                var idVideo = redUrl.split('v=')[1];
                openVideo("rapidvideocom", idVideo, download);
                return;
            }

            cordovaHTTP.get(redUrl, {}, {}, function (response) {
                if (response.data.indexOf("flashx") > -1) {
                    var idVideo = response.data.split('name="id" value="')[1].split("\"")[0];
                    openVideo("flashx", idVideo, download);
                } else
                    error("not found");
            }, function (response) {
                console.log(response.headers.Location);
                doPostVcrypt(response.headers.Location.replace("http", "https"), host, url, download);
            });
        } catch (e) {
            error(e);
        }
    });
}

function doPostVcrypt(idVcrypt, host, url, download) {
    cordovaHTTP.setHeader("Content-Type", "application/x-www-form-urlencoded");
    cordovaHTTP.post( idVcrypt, {
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
    var htmlLocandine = html.split('<div class="locandine">')[1].split('<div style="clear: both"></div>')[0];

    var articoli = htmlLocandine.split('<a href="');
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            var movie = {
                title: articoli[i].split('class="titolo">')[1].split('</div>')[0],
                img: articoli[i].split("url(")[1].split(')')[0],
                url: articoli[i].split('"')[0],
                isSerieTv: isSerieTv
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e);
        }

    }

    //Prossima pagina
    try {
        var urlNextPage = html.split('next page-numbers" href="')[1].split('"')[0];
        console.log("NEXT PAGE");
        console.log(urlNextPage);
        arrayFilm.push(urlNextPage); 
    } catch (e) {
        console.error("ERRORE NEXT PAGE");
        console.error(e);
    }
    

    console.log(arrayFilm)
    printPage(isSerieTv, section, nextPage, callback);
}



function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
        html = html.split("STREAMING:")[1];

        var quality = html.split("STREAMING HD:");

        manageMovieLinks(quality[0], quality[1].split("<u>DOWNLOAD")[0]);


        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');
        

    } else {
        //Levo la roba che non serve
        html = html.split('<section id="content">')[1].split('<div class="wprc-container red-colorscheme">')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
    $('#loading').addClass('hidden');
}

function search() {
    var input = encodeURI($('#search').val());

    var url = localStorage.cinemaLiberoUrl + "/?s=" + input;

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
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/", false, 'movie', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/serie-tv/", true, 'serieTv', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/azione/", false, 'movieAzione', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/commedia/", false, 'movieCommedia', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/drammatico/", false, 'movieDrammatico', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/horror/", false, 'movieHorror', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/sentimentale/", false, 'movieRomantico', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/fantascienza/", false, 'movieFantascienza', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/thriller/", false, 'movieThriller', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/animazione/", false, 'movieAnimazione', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/fantasyfantastico/", false, 'movieFantasy', false, null),
    ])
    .then(function () {
        initViewChannelMode(sections);
    })
    .catch(function (e) {
        console.error(e);
    });

});