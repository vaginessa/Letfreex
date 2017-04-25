var serieTvHosts = [
    {
        //Cineblog
        host: 'swzz|nowvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Nowvideo'
    },
    {
        //Cinemalibero
        host: 'vcrypt|nowvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Nowvideo'
    },
    {
        //Cineblog
        host: 'swzz|openload',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Openload'
    },
    {
        //Cinemalibero
        host: 'vcrypt|openload',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Openload'
    },
    {
        //Cineblog
        host: 'swzz|flashx',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Flash'
    },
    {
        //Cinemalibero
        host: 'vcrypt|flashx',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Flash'
    },
    {
        //Cinemalibero
        host: 'vcrypt|rapidvideocom',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Raptu'
    },
    {
        host: 'nowvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*www.nowvideo\.[a-z]+/video/([a-z0-9A-Z]+)[^<]*Nowvideo'
    },
    {
        host: 'vidlox',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*vidlox\.[a-z]+/([a-z0-9A-Z]+)[^<]*Vidlox'
    },
    {
        host: 'openload',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*openload\.[a-z]+/f/([0-9a-zA-Z\-_]*)[^<]*Openload'
    },
    {
        host: 'vidto',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*vidto\.[a-z]+/([a-z0-9A-Z]+).html[^<]*VidTO'
    },
    {
        host: 'speedvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*speedvideo\.[a-z]+/([a-z0-9A-Z]+)[^<]*Speedvideo'
    },
    {
        host: 'rapidvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*http:\/\/www.rapidvideo.[a-z]*/([a-z0-9A-Z\/._-]+)/.*?Rapidvideo'
    },
    {
        host: 'rapidvideocom',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*raptu\.[a-z]*/\.v=([a-z0-9A-Z]+)[^<]*RapidVideo'
    },
    {
        host: 'rapidvideocom',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*rapidvideo\.[a-z]*/\.v=([a-z0-9A-Z]+)[^<]*RapidVideo'
    },
    {
        host: 'flashx',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*http:\/\/.*flashx\.[a-z]+\/([a-z0-9A-Z]+)[^<]*Flashx'
    },
    {
        //Cineblog
        host: 'swzz|streaminto',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Streamin'
    },
    {
        host: 'fastvideo',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x|x)[0-9]{1,3}).*http:\/\/www.fastvideo.[a-z]*/([a-z0-9A-Z\/._-]+)/'
    },
    {
        host: 'streaminto',
        regex: '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};|x)[0-9]{1,3}).*streamin.[a-z]*/([a-z0-9A-Z\/._-]+)'
    }
];


//Gestione host film (LINK UNICO)===============================================================
var movieOneLinkHosts = [
    {
        //Cineblog
        host: 'swzz|nowvideo',
        regex: '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Nowvideo'
    },
    {
        //Cinemalibero
        host: 'vcrypt|nowvideo',
        regex: 'goto/([a-z0-9A-Z=]*)/?"[^<]*>Nowvideo'
    },
    {
        //Cineblog
        host: 'swzz|openload',
        regex: '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Openload'
    },
    {
        //Cinemalibero
        host: 'vcrypt|openload',
        regex: 'goto/([a-z0-9A-Z=]*)/?"[^<]*>Openload'
    },
    {
        //Filmpertutti
        host: 'vcrypt|openload',
        regex: 'vcrypt.pw/open/([a-z0-9A-Z=]*)[^<]*>Openload'
    },
    {
        host: 'openload',
        regex: 'openload\.[a-z]+/f/([0-9a-zA-Z\-_]*)/?'
    },
    {
        host: 'vidlox',
        regex: 'vidlox\.[a-z]+/([a-z0-9A-Z]+)'
    },
    {
        host: 'vidto',
        regex: 'vidto\.[a-z]+/([0-9a-zA-Z\-_]*).html'
    },
    {
        host: 'nowvideo',
        regex: 'nowvideo\.[a-z]+/video/([0-9a-zA-Z]*)'
    },
    {
        host: 'rapidvideo',
        regex: 'rapidvideo\.[a-z]+/([0-9a-zA-Z]*)'
    },
    {
        host: 'rapidvideocom',
        regex: 'raptu\.[a-z]+/.v=([0-9a-zA-Z]*)'
    },
    {
        host: 'rapidvideocom',
        regex: 'rapidvideo\.[a-z]+/.v=([0-9a-zA-Z]*)'
    },
    {
        host: 'flashx',
        regex: 'flashx\.[a-z]+/([0-9a-zA-Z]*)'
    },
    {
        host: 'streaminto',
        regex: 'streamin\.[a-z]+/([0-9a-zA-Z]*)'
    },
    {
        host: 'speedvideo',
        regex: 'speedvideo\.[a-z]+/([0-9a-zA-Z-]*(\.html)?)'
    },
    {
        //Cineblog
        host: 'swzz|flashx',
        regex: '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Flash'
    },
    {
        //Cinemalibero
        host: 'vcrypt|flashx',
        regex: 'goto/([a-z0-9A-Z=]*)/?"[^<]*>Flash'
    },
    {
        //Cineblog
        host: 'swzz|streaminto',
        regex: '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Streamin'
    },
    {
        host: 'megahd',
        regex: 'megahd\.[a-z]+/([0-9a-zA-Z_=-]*)'
    },
    {
        host: 'fastvideo',
        regex: 'fastvideo\.[a-z]+/([0-9a-zA-Z]*)'
    },
    {
        host: 'popcorntvDirect',
        regex: 'embedUrl" href="([^"]*)"'
    }
];

//Gestione host film (LINK IN PIU' PARTI)========================================================
var movieHostsManyLink = [
    'swzz|nowvideo',
    //'swzz|openload',
    'flashx',
    'nowvideo'
];

var movieRegexHostsManyLink = [
    //Nowvideo redirect swzz (cineblog)
    'Nowvideo: .*xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>.*xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>(?:xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>)?',

    //Nowvideo redirect swzz (cineblog)
    //'Openload: .*xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>.*xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>(?:xyz/link/([a-z0-9A-Z]*)/" target="_blank">(.. Tempo)</a>)?',

    //Flashx
    'Flashx: .*flashx.[a-z]*/([a-z0-9A-Z]*).html" target="_blank">(.. Tempo)</a>.*flashx.tv/([a-z0-9A-Z]*).html" target="_blank">(.. Tempo)</a>(?:flashx.tv/([a-z0-9A-Z]*).html" target="_blank">(.. Tempo)</a>)?',

    //Nowvideo (italiafilm)
    'Nowvideo .*nowvideo.[a-z]*/video/([a-z0-9A-Z]*)" target="_blank">(Parte .).*nowvideo....?/video/([a-z0-9A-Z]*)" target="_blank">(Parte .)(?:.*nowvideo....?/video/([a-z0-9A-Z]*)" target="_blank">(Parte .)</a>)?'
];


//Paginazione link ===============================================================================

function manageMovieLinks(html) {
    var count;
    var link;

    //Link in più parti  
    for (var i = 0; i < movieHostsManyLink.length; i++) {
        count = 0;
        link = "";
        var patt = new RegExp(movieRegexHostsManyLink[i], 'gi');

        var host = movieHostsManyLink[i].split('|')[1];
        if (!host)
            host = movieHostsManyLink[i];



        while (res = patt.exec(html)) {
            count++;
            console.log('trovato ' + res[1]);
            console.log(res);

            link += "<div tabindex='0' class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[1] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[2] + "</p></div>";
            link += "<div tabindex='0' class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[3] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[4] + "</p></div>";

            if (res[5])
                link += "<div class=\"hidden marginBottom10\"tabindex='0' host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[5] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[6] + "</p></div>";

        }

        if (count > 0) {
            var head = "<div class=\"guarda hidden\"  >" +
                            "<img tabindex='0' class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />";
            $('#playButton').html($('#playButton').html() + head + link + "</div>");
        }
    }


    //Link singolo

    count = 0;
    link = "";
    
    for (var i = 0; i < movieOneLinkHosts.length; i++) {
        if (!isHostSupported(movieOneLinkHosts[i].host))
            continue;


        var patt = new RegExp(movieOneLinkHosts[i].regex, 'gi');

        var host = movieOneLinkHosts[i].host.split('|')[1];
        if (!host)
            host = movieOneLinkHosts[i].host;

        while (res = patt.exec(html)) {
            console.log('trovato ' + res[1]);

            //Se il link non l'ho già inserito prima, nei link multipli
            if ($('#playButton').html().indexOf(res[1]) == -1 && link.indexOf(res[1]) == -1 && res[1] != "embed") {
                count++;
                link += "<div  class=\"hidden marginBottom10\" host >" +
                    "<img tabindex='0' onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 0)\" width=\"200\" src=\"img/host/" + host + ".png\">" +
                    "<i tabindex='0' class=\"fa fa-download\" aria-hidden=\"true\" onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 1)\"></i>" +
                    "<img tabindex='0' onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 2)\" class=\"castIcon\" src=\"img/cast.png\">" +
                    "</div>";
            }
        }
    }

    if (count > 0) {
        var head = "<div class=\"guarda hidden\"  >" +
                        "<img tabindex='0' class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />";
        $('#playButton').html($('#playButton').html() + head + link + "</div>");
    }




}

function manageSerieTvLinks(html, regexStagione) {
    
    var listaLink = {};
    var currentStagioneLingua = "";

    for (var i = 0; i < serieTvHosts.length; i++) {
        if (!isHostSupported(serieTvHosts[i].host))
            continue;

        var patt = new RegExp('(?:' + serieTvHosts[i].regex + '|' + regexStagione + ')', 'gi');

        while (res = patt.exec(html)) {
            var resUpper = res[0].toUpperCase().trim().replace(/<(?:.|\n)*?>/gm, '').replaceAll("<", "");

            //Se resUpper è nel formato STAGIONE X ITA/SUB-ITA, vuol dire che sta iniziando una nuova stagione
            if (new RegExp('(STAGIONE.*ITA)').test(resUpper)) {

                currentStagioneLingua = resUpper.replace('STAGIONE ', '').replace(/[^A-Z]/g, '');
                continue;
            }

            //res[1] = Stagione episodio
            //res[2] = id link
            console.log('trovato ' + res[1] + " - " + res[2]);

            var singleEpisode = {
                stagioneEpisodio: res[1],
                id: res[2],
                host: serieTvHosts[i].host,
                res: "SD"
            }
            var seasonNum = res[1].split(/(?:[^&0-9A-Za-z\.]+|&#[0-9]{3,4};)|x/)[0];

            //Se la stagione inizia con 0, lo tolgo per non creare problemi
            if (seasonNum[0] == "0")
                seasonNum = seasonNum.substr(1, seasonNum.length);

            var label = "STAGIONE " + seasonNum + " - " + currentStagioneLingua.replace("NBSP", "");

            if (!listaLink[label])
                listaLink[label] = [];

            if (res[2] != "embed")
                listaLink[label].push(singleEpisode);
        }
    }
    prinSeasons(listaLink);
}




function prinSeasons(listaLink) {
    var link = "";
    try {
        listaLink = sortStagioni(listaLink);
    } catch (e) {
        console.log(listaLink);
    }


    var firstSeason = true;

    //Ordino gli episodi in ogni stagione
    for (var stagione in listaLink) {
        listaLink[stagione].value = listaLink[stagione].value.sort(sortBy('stagioneEpisodio'));

        var stagioneId = listaLink[stagione].key.replaceAll(" ", "_").replaceAll("STAGIONE", "");

        if (!firstSeason)
            link += "</div><div id=\"stagione" + stagioneId + "\" class=\"season hidden\">";
        else {
            link += "<div id=\"stagione" + stagioneId + "\"class=\"season\">";
            firstSeason = false;
        }

        var stagioneNumero;
        var episodioNumero;
        var previousEpisodio = "";
        for (var j = 0; j < listaLink[stagione].value.length; j++) {
            if (listaLink[stagione].value[j].stagioneEpisodio != previousEpisodio) {

                //Preparo la divisione in stagioni 
                var seasonEpisodeRegex = "([0-9]{1,3})(?:[^&0-9A-Za-z\.]+|&#[0-9]{3,4};|x)([0-9]{1,3}).*";
                var seasonEpisodePattern = new RegExp(seasonEpisodeRegex, 'gi');

                while (response = seasonEpisodePattern.exec(listaLink[stagione].value[j].stagioneEpisodio)) {
                    //Se la stagione inizia con 0, lo tolgo per non creare problemi
                    if (response[1][0] == "0")
                        response[1] = response[1].substr(1, response[1].length);

                    stagioneNumero = response[1];
                    episodioNumero = response[2];
                }

                if (previousEpisodio != "")
                    link += "</div>";

                previousEpisodio = listaLink[stagione].value[j].stagioneEpisodio;

                var alreadySeenClass = isAlreadySeen(stagioneNumero + "x" + episodioNumero) ? "" : "hidden";

                link += "<div info=\"" + stagioneNumero + "x" + episodioNumero + "\" class=\"guarda col-md-4 col-xs-12 " + alreadySeenClass + " hidden\" >" +
                            "<div tabindex=\"0\" onclick=\"chooseHost($(this).parent())\">" +
                                "<div class=\"playContainer\" style=\"background-position: center;background-repeat: no-repeat;\">" +
                                      "<img class=\"playSeries\" src=\"img/playSeries.png\" />" +
                                      "<i info=\"" + stagioneNumero + "x" + episodioNumero + "\" class=\"fa fa-bookmark seenIcon " + alreadySeenClass + "\" ></i>" +
                                "</div><h4>" + stagioneNumero + "x" + episodioNumero + "</h4>" +
                            "</div>";
            }

            var hostImg = listaLink[stagione].value[j].host.split("|")[1] ? listaLink[stagione].value[j].host.split("|")[1] : listaLink[stagione].value[j].host;
            link += "<div class=\"hidden marginBottom10\" host >" +
                "<img tabindex='0' res=\"" + listaLink[stagione].value[j].res + "\" onclick=\"openVideo('" + listaLink[stagione].value[j].host + "','" + listaLink[stagione].value[j].id + "', 0)\" width=\"200\" src=\"img/host/" + hostImg + ".png\">" +
                "<i tabindex='0'  class=\"fa fa-download\" aria-hidden=\"true\" onclick=\"openVideo('" + listaLink[stagione].value[j].host + "','" + listaLink[stagione].value[j].id + "', 1)\"></i>" +
                "<img tabindex='0'  onclick=\"openVideo('" + listaLink[stagione].value[j].host + "','" + listaLink[stagione].value[j].id + "', 2)\" class=\"castIcon\" src=\"img/cast.png\">" +
                "</div>";
        }
        link += "</div>";
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

    //Segno link hd
    $('img[res="HD"]').before("<img class='res' src='img/hd.png'>");
    $('img[res="SD"]').before("<img class='res' src='img/sd.png'>");

    $('.guarda').removeClass('hidden');
    $('#loadingLink').addClass('hidden');
    $('#playButton').removeClass('hidden');
    $('#playButton').addClass('backgroundBlack');
}