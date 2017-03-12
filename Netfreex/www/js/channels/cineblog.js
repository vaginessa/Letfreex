function extractLinkSwzz(url, host) {
    console.log(url)

    //Decodifico l'url cineblog
    url = atob(url);

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
            openVideo(host, url);
        } catch (e) {
            error(e);
        }
    }


    if (url.indexOf("swzz") > -1) {
        $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
            "q=select%20*%20from%20html%20where%20url%3D%22" +
            encodeURIComponent(url) +
            "%22&format=xml'&callback=?",
            function(data) {
                parseUrl(data.results[0]);
            }
        );
    } else {
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
    printPage(isSerieTv, section, nextPage, callback);
}

function search() {
    var input = encodeURI($('#search').val());

    var url;
    if ($('#serieTv').prop('checked'))
        url = "http://www.cb01.co/serietv/search/" + input
    else
        url = "http://www.cb01.co/search/" + input

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

var sections = [
    "movieMostPopularSliderContainer",
    "serieTvMostPopularSliderContainer",
    "movieSliderContainer",
    "serieTvSliderContainer"
];




    //CINEBLOG
    //Most popular
    openPage("http://www.cb01.uno/", false, 'movieMostPopularSliderContainer', true);
    openPage("http://www.cb01.uno/serietv/", true, 'serieTvMostPopularSliderContainer', true);

    //Ultime uscite
    openPage("http://www.cb01.uno/", false, 'movieSliderContainer', false);
    openPage("http://www.cb01.uno/serietv/", true, 'serieTvSliderContainer', false);

    //openPage("http://www.cb01.co/serietv/page/2/", true, 'serieTvSliderContainer', false);
    //openPage("http://www.cb01.co/page/2/", false, 'movieSliderContainer', false);




