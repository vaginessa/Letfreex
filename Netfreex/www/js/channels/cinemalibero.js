function extractVcrypt(url, host, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.get(localStorage.cinemaLiberoUrl + "/goto/" + url, {}, {}, function (response) {
        if (response.data.indexOf("nowvideo") > -1) {
            var idVideo = response.data.match("/video/([a-zA-Z0-9]+)")[1];
            openVideo("nowvideo", idVideo, download);
        }
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
        html = html.split("<u>DOWNLOAD")[0];
        manageMovieLinks(html);

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
    "movieSliderContainer",
    "serieTvSliderContainer"
];
$("#welcome").addClass("hidden");

//Most popular
    //$('.movieMostPopularTitle').addClass('hidden');
    //$('.serieMostPopularTitle').addClass('hidden');
    //$('#homeFilmMostPopular').addClass('hidden');
    //$('#homeSerieTvMostPopular').addClass('hidden');

    //Ultime uscite
    //openPage("http://www.cinemalibero.tv/category/film/", false, 'movieSliderContainer', false);

    //openPage("http://www.cinemalibero.tv/category/serie-tv/", true, 'serieTvSliderContainer', false);

    //openPage("http://www.piratestreaming.news/serietv-aggiornamentii.php?pageNum_lista_film=2", true, 'serieTvSliderContainer', false);
    //openPage("http://www.piratestreaming.news/film-aggiornamenti.php?pageNum_lista_film=2", false, 'movieSliderContainer', false);

    
$(document).on("ready", function () {
    Promise.all([
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/film/", false, 'movieSliderContainer', false, null),
            asyncOpenPage(localStorage.cinemaLiberoUrl + "/category/serie-tv/", true, 'serieTvSliderContainer', false, null),
    ])
    .then(function () {
        initViewChannelMode();
    })
    .catch(function (e) {
        console.error(e);
    });

});