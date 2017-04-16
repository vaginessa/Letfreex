function extractLinkSwzz(url, host, download) {
    console.log(url)

    

    function parseUrl(html) {
        try {
            var url;
            switch (host) {
                case 'nowvideo':
                    //url = html.split("/video/")[1].split('"')[0];
                    url = html.match("/video/([a-zA-Z0-9]+)")[1];
                    break;
                case 'openload':
                    //url = html.split("openload.co/f/")[1].split('/')[0];
                    url = html.match("openload.[a-z]{2,5}/f/([^']+)/")[1];
                    break;
                case 'streaminto':
                    //url = html.split("streamin.to/")[1].split('"')[0];
                    url = html.match("streamin.[a-z]{2,5}/([a-zA-Z0-9]+)")[1];
                    break;
                case 'flashx':
                    //url = html.split('www.flashx.to/')[1].split('"')[0];
                    url = html.match("flashx.[a-z]{2,5}/([a-zA-Z0-9]+).html")[1];
                    break;
            }

            console.log(url)
            openVideo(host, url, download);
        } catch (e) {
            error(e);
        }
    }


    if (url.length < 7) {
        url = "http://swzz.xyz/link/" + url + "/";
        $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
            "q=select%20*%20from%20html%20where%20url%3D%22" +
            encodeURIComponent(url) +
            "%22&format=xml'&callback=?",
            function (data) {
                parseUrl(data.results[0]);
            }
        );
    } else {
        //Decodifico l'url cineblog
        url = atob(url);
        parseUrl(url);
    }
}

function parsePage(data, url, isSerieTv, section, nextPage, callback) {
    var html = data;
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
            url: articoli[i].split('href="')[1].split('"')[0],
            isSerieTv: isSerieTv
        };
        arrayFilm.push(movie);
    }


    //Prossima pagina
    try {
        var urlNextPage = html.split("rel='next' href='")[1].split("'")[0];
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

function search() {
    var input = encodeURI($('#search').val());

    var url;
    if ($('#serieTv').prop('checked'))
        url = "https://www.cb01.uno/serietv/search/" + input;
    else
        url = "https://www.cb01.uno/search/" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}


function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
        if (html.indexOf('Download:<') > -1)
            html = html.split('Download:<')[0];

        manageMovieLinks(html);

        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');

    } else {

        html = html.split('post_content')[1].split('disqus_thread')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
}


function parseMostPopular(html, url, isSerieTv, section, callback) {
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
    console.log(arrayFilm);

    printPage(isSerieTv, section, null, callback);
}

function getCookieCF(callback) {
    $("#loading").removeClass("hidden");
    var win = window.open('https://www.cb01.uno', "_blank", "EnableViewPortScale=yes,clearcache=no,clearsessioncache=no,hidden=yes");
    win.addEventListener("loadstop", function () {
        setTimeout(function () {
            //win.executeScript(
            //        { code: "navigator.userAgent" },
            //        function (values) {
            //            console.log("USER AGENT " + values[0]);
            //            localStorage.userAgentCF = values[0];
            //        }
            //    );
            win.getCookies(
                    { url: '.cb01.uno' },
                    function (values) {
                        console.log(values);
                        localStorage.cookieCFCB = values;

                        var exp = new Date();
                        exp.setHours(exp.getHours() + 2);
                        localStorage.expirationCF = exp;
                        $("#welcome").addClass("hidden");
                        callback();
                        win.close();
                    }
                );

        }, 6000);
    });
}

$("#welcome").addClass("hidden");
var sections = [
    //"movieMostPopularSliderContainer",
    //"serieTvMostPopularSliderContainer",
    "movieSliderContainer",
    //"serieTvSliderContainer"
];

var cineblog = true;

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
    openPage("https://www.cb01.uno/", false, 'movieSliderContainer', false, null, initViewChannelMode);
}

//CINEBLOG
//Most popular
//openPage("https://www.cb01.uno/", false, 'movieMostPopularSliderContainer', true, null, initViewChannelMode);
//openPage("https://www.cb01.uno/serietv/", true, 'serieTvMostPopularSliderContainer', true, null, initViewChannelMode);

//Ultime uscite


//openPage("https://www.cb01.uno/serietv/", true, 'serieTvSliderContainer', false, null, initViewChannelMode);

//$(window).on("load", function () {
//    initViewChannelMode();
//});


