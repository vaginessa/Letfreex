function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    var articoli = html.split('imagen');
    console.log(html)
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            var movie = {
                title: articoli[i].split('<h2>')[1].split('<')[0],
                img: articoli[i].split("src=\"")[1].split('"')[0],
                url: articoli[i].split("HREF=\"")[1].split('"')[0],
                isSerieTv: isSerieTv
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e);
        }

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


function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
    } else {
        var urlSerie = "http://hdpass.net/serie.php?idSerie=" + html.split("idSerie=")[1].split("?")[0];

        get(urlSerie, function (response) {
            getSeasonNumbers(response);
        }, function (e) {
            error(e);
        });
    }
    $('#loading').addClass('hidden');
}

var idSerie = "";
var listaStagioni = "";
function getSeasonNumbers(html) {
    
    //Prendo Le stagioni
    idSerie = html.split("idSerie=")[1].split("&")[0];
    var seasonHtml = html.split("<section id=\"series\">")[1].split("</ul>")[0];
    var stagionHtmlArray = seasonHtml.split("idStagioni=");
    for (var i = 1; i < stagionHtmlArray.length; i++) {
        var idStagione = stagionHtmlArray[i].split('">')[0];
        var numeroStagione = stagionHtmlArray[i].split('">')[1].split("</a>")[0];

        if (i == 1) {
            $('#currentSeason').html('Stagione ' + numeroStagione + ' <span class="caret"></span>');
            scrapeSerieTvSerieHDMe(idStagione, numeroStagione);
        }

        //Riempo menù tendina
        listaStagioni += "<li><a tabindex=\"1\" onclick=\"scrapeSerieTvSerieHDMe('" + idStagione + "', '"+ numeroStagione+"')\">Stagione " + numeroStagione+ "</a></li>";
    }
    $('.listaStagioni').html(listaStagioni);
    $('#dropDownStagioni').removeClass('hidden');
}


var listaLink = {};
function scrapeSerieTvSerieHDMe(idStagione, numeroStagione) {  
    listaLink = {}
    scrapeStagione("http://hdpass.net/serie.php?idSerie=" + idSerie + "&idStagioni=" + idStagione, numeroStagione, idStagione);
}

///CHIAMATE A CASCATA ////////////////////////////////////////////////////////

function scrapeStagione(url, stagioneNum, idStagione) {
    $('#currentSeason').html('Stagione ' + stagioneNum + ' <span class="caret"></span>');
    $('#loadingLink').removeClass("hidden");
    $('#playButton').addClass("hidden");
    $('#playButton').html("");

        get(url, function (response) {


            var seasonHtml = response.split("<section id=\"seasons\">")[1].split("</ul>")[0];
            var listaEpisodiGet = [];
            var episodiHtmlArray = seasonHtml.split("episode=");
            for (var i = 1; i < episodiHtmlArray.length; i++) {
                listaEpisodiGet.push(
                    asyncScrapeEpisodi("http://hdpass.net/serie.php?idSerie=" + idSerie + "&idStagioni=" + idStagione + "&episode=" + episodiHtmlArray[i].split('"')[0], stagioneNum, episodiHtmlArray[i].split('"')[0])
                );
            }


            Promise.all(listaEpisodiGet)
            .then(function () {
                prinSeasons(listaLink);
                $('.listaStagioni').html(listaStagioni);
                    //resolveStagioni();
                })
            .catch(function (e) {
                console.error(e);
                //resolveStagioni();
            });

        }, function(e) {
            console.error(e);
            //resolveStagioni();
        });

        
    //});
}

var fromOld = "";
function asyncScrapeEpisodi(url, stagioneNum, episodeNum) {
    return new Promise(function (resolveEpisodi, rejectEpisodi) {
        getYahooAPI(url, function (res1) {

            url = res1.split('id="iframeVid" src="')[1].split('"')[0];

            getYahooAPI(url, function (response) {
                    var risoluzioniHtml = response.split("labRes")[1].split("</div>")[0];

                    var listaRisoluzioniGet = [];

                    var risoluzioniHtmlArray = risoluzioniHtml.split("value=\"");

                    var from;

                    from = response.split("from=")[1].split("\"")[0];
                    if (from == "") {
                        from = fromOld;
                    }
                        

                    if (fromOld == "")
                        fromOld = from;

                    for (var i = 1; i < risoluzioniHtmlArray.length; i++){
                        var link = risoluzioniHtmlArray[i].split('from')[0] + "from=" + from;

                        listaRisoluzioniGet.push(
                            asyncScrapeRisoluzioni(link.replaceAll("&amp;", "&"), stagioneNum, episodeNum)
                        );
                }

                Promise.all(listaRisoluzioniGet)
                .then(function () {
                    resolveEpisodi();
                })
                .catch(function (e) {
                    console.error(e);
                    resolveEpisodi();
                });
            }, function (e) {
                console.error(e);
                resolveEpisodi();
            });
        }, function (e) {
            console.error(e);
            resolveEpisodi();
        });
        
    });
}

function asyncScrapeRisoluzioni(url, stagioneNum, episodeNum) {
    return new Promise(function (resolveRisoluzioni, rejectRisoluzioni) {
        getYahooAPI(url, function (response) {
            try {
                var risoluzioniHtml = response.split("labMirr")[1].split("</div>")[0];
                var mirrorGet = [];
                var mirrorHtmlArray = risoluzioniHtml.split("value=\"");
                for (var i = 1; i < mirrorHtmlArray.length; i++) {
                    if (mirrorHtmlArray[i].indexOf("openload") > -1 || mirrorHtmlArray[i].indexOf("rapidvideo") >-1) {
                        var res = mirrorHtmlArray[i].split("res=")[1].split("\"")[0];

                        if (res == "360")
                            continue;

                        if (res == "1080" || res == "720")
                            res = "HD";
                        else
                            res = "SD";

                        var link = "http://hdpass.net/" + mirrorHtmlArray[i].split('"')[0].replaceAll("&amp;", "&");
                        console.log(link)
                        mirrorGet.push(
                            asyncScrapeMirror(link, stagioneNum, episodeNum, res)
                        );
                    }
                }

                Promise.all(mirrorGet)
                    .then(function() {
                        resolveRisoluzioni();
                    })
                    .catch(function(e) {
                        console.error(e);
                        resolveRisoluzioni();
                    });
            } catch (e) {
                console.log(url);
                console.log(response);
                console.log(stagioneNum);
                console.log(episodeNum);
                resolveRisoluzioni();
            }
            
        }, function (e) {
            console.error(e);
            resolveRisoluzioni();
        });
    });
}

function asyncScrapeMirror(url, stagioneNum, episodeNum, res) {
    return new Promise(function (resolveMirror, rejectRisoluzioni) {
        getYahooAPI(url, function (response) {
            var host = response.split("data-mirror=\"")[1].split("\"")[0];

            if (host == "openload" || host == "rapidvideo") {
                host = host.replace("rapidvideo", "rapidvideocom");

                var encodedUrl = response.split("urlEmbed\" type=\"hidden\" value=\"")[1].split("\"")[0];

                var url = clearify(encodedUrl);

                if (host == "openload")
                    url = url.split("embed/")[1].split("/")[0];
                else
                    url = url.split("embed/")[1];

                if (episodeNum.length == 1)
                    episodeNum = "0" + episodeNum;

                var singleEpisode = {
                    stagioneEpisodio: stagioneNum + "x" + episodeNum,
                    id: url,
                    host: host,
                    res: res
                }

                var label = "STAGIONE " + stagioneNum + " - ITA";

                if (!listaLink[label])
                    listaLink[label] = [];


                listaLink[label].push(singleEpisode);
            }
            resolveMirror();
        }, function (e) {
            console.error(e);
            resolveMirror();
        });
    });
}

///////////////////////////////////////////////////////////////////////////////

function clearify(url) {
    var size = url.length;
    if (size % 2 == 0) {
        var halfIndex = size / 2;
        var firstHalf = url.substring(0, halfIndex);
        var secondHalf = url.substring(halfIndex, size);
        var url = secondHalf + firstHalf;
        var base = url.split("").reverse().join("");
        var clearText = $.base64('decode', base);
        return clearText
    } else {
        var lastChar = url[size - 1];
        url[size - 1] = ' ';
        url = $.trim(url);
        var newSize = url.length;
        var halfIndex = newSize / 2;
        var firstHalf = url.substring(0, halfIndex);
        var secondHalf = url.substring(halfIndex, newSize);
        url = secondHalf + firstHalf;
        var base = url.split("").reverse().join("");
        base = base + lastChar;
        var clearText = $.base64('decode', base);
        return clearText
    }

}

(function ($) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a256 = '', r64 = [256], r256 = [256], i = 0; var UTF8 = { encode: function (strUni) { var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) { var cc = c.charCodeAt(0); return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f); }).replace(/[\u0800-\uffff]/g, function (c) { var cc = c.charCodeAt(0); return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f); }); return strUtf; }, decode: function (strUtf) { var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) { var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f); return String.fromCharCode(cc); }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) { var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f; return String.fromCharCode(cc); }); return strUni; } }; while (i < 256) { var c = String.fromCharCode(i); a256 += c; r256[i] = i; r64[i] = b64.indexOf(c); ++i; }
    function code(s, discard, alpha, beta, w1, w2) {
        s = String(s); var buffer = 0, i = 0, length = s.length, result = '', bitsInBuffer = 0; while (i < length) {
            var c = s.charCodeAt(i); c = c < 256 ? alpha[c] : -1; buffer = (buffer << w1) + c; bitsInBuffer += w1; while (bitsInBuffer >= w2) { bitsInBuffer -= w2; var tmp = buffer >> bitsInBuffer; result += beta.charAt(tmp); buffer ^= tmp << bitsInBuffer; }
            ++i;
        }
        if (!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer)); return result;
    }
    var Plugin = $.base64 = function (dir, input, encode) { return input ? Plugin[dir](input, encode) : dir ? null : this; }; Plugin.btoa = Plugin.encode = function (plain, utf8encode) { plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain; plain = code(plain, false, r256, b64, 8, 6); return plain + '===='.slice((plain.length % 4) || 4); }; Plugin.atob = Plugin.decode = function (coded, utf8decode) { coded = String(coded).split('='); var i = coded.length; do { --i; coded[i] = code(coded[i], true, r64, a256, 6, 8); } while (i > 0); coded = coded.join(''); return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded; };
}(jQuery));

function search() {
    var input = encodeURI($('#search').val());

    var url = localStorage.seriehdmeUrl + "/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "serieTvSliderContainer"
];
$("#welcome").addClass("hidden");
    
$(document).on("ready", function () {
    Promise.all([
            asyncOpenPage(localStorage.seriehdmeUrl, true, 'serieTvSliderContainer', false, null),
    ])
    .then(function () {
        initViewChannelMode();
    })
    .catch(function (e) {
        console.error(e);
    });

});