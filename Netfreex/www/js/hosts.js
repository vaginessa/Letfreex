//Gestione host serie tv =======================================================================
var serieTvHosts = [
    'swzz|nowvideo',
    'vcrypt|nowvideo',
    'swzz|openload',
    'vcrypt|openload',
    'swzz|flashx',
    'vcrypt|flashx',
    'vcrypt|rapidvideocom',
    'nowvideo',
    'vidlox',
    'openload',
    'vidto',
    'speedvideo',
    'rapidvideo',
    'rapidvideocom',
    'rapidvideocom',
    'flashx',
    'swzz|streaminto'
];

var serieTvRegexHosts = [
    //Nowvideo redirect swzz (cineblog)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Nowvideo',

    //Nowvideo redirect vcrypt (cinemalibero)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Nowvideo',

    //Openload redirect swzz (cineblog)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Openload',

    //Openload redirect vcrypt (cinemalibero)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Openload',

    //FlashX redirect swzz (cineblog)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Flash',

    //FlashX redirect vcrypt (cinemalibero)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Flash',

    //Raptu(rapidvideocom) redirect vcrypt (cinemalibero)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*cinemalibero\.[a-z]+/goto/([a-z0-9A-Z=]*)/?"[^<]*>Raptu',

    //Nowvideo
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*www.nowvideo\.[a-z]+/video/([a-z0-9A-Z]+)[^<]*Nowvideo',

    //Vidlox
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*vidlox\.[a-z]+/([a-z0-9A-Z]+)[^<]*Vidlox',

    //Openload
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*openload\.[a-z]+/f/([0-9a-zA-Z\-_]*)[^<]*Openload',

    //VidTo
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*vidto\.[a-z]+/([a-z0-9A-Z]+).html[^<]*VidTO',

    //Speedvideo
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*speedvideo\.[a-z]+/([a-z0-9A-Z]+)[^<]*Speedvideo',

    //Rapidvideo
    '([0-9]{1,3}x[0-9]{1,3}).*http:\/\/www.rapidvideo.[a-z]*/([a-z0-9A-Z\/._-]+)/.*?Rapidvideo',

    //Rapidvideocom _raptu
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*raptu\.[a-z]*/\.v=([a-z0-9A-Z]+)[^<]*RapidVideo',

    //Rapidvideocom _raptu
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*rapidvideo\.[a-z]*/\.v=([a-z0-9A-Z]+)[^<]*RapidVideo',

    //FlashX
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*http:\/\/.*flashx\.[a-z]+\/([a-z0-9A-Z]+)[^<]*Flashx',

    //Streamin redirect swzz (cineblog)
    '([0-9]{1,3}(?:[^&0-9A-Za-z]|&#[0-9]{1,4};)[0-9]{1,3}).*(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Streamin',
];


//Gestione host film (LINK UNICO)===============================================================
var movieHostsOneLink = [
    'swzz|nowvideo',
    'vcrypt|nowvideo',
    'swzz|openload',
    'vcrypt|openload',
    'vcrypt|openload',
    'openload',
    'vidlox',
    'vidto',
    'nowvideo',
    'rapidvideo',
    'rapidvideocom',
    'rapidvideocom',
    'flashx',
    'streaminto',
    'speedvideo',
    'swzz|flashx',
    'vcrypt|flashx',
    'swzz|streaminto'
];

var movieRegexHostsOneLink = [

    //Nowvideo redirect swzz (cineblog)
    '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Nowvideo',

    //Nowvideo redirect vcrypt (cinemalibero)
    'goto/([a-z0-9A-Z=]*)/?"[^<]*>Nowvideo',

    //Openload redirect swzz (cineblog)
    '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Openload',

    //Openload redirect vcrypt(cinemalibero)
    'goto/([a-z0-9A-Z=]*)/?"[^<]*>Openload',

    //Openload redirect vcrypt(filmpertutti)
    'vcrypt.pw/open/([a-z0-9A-Z=]*)[^<]*>Openload',

    //Openload
    'openload\.[a-z]+/f/([0-9a-zA-Z\-_]*)/?',

    //Vidlox
    'vidlox\.[a-z]+/([a-z0-9A-Z]+)',

    //VidTo
    'vidto\.[a-z]+/([0-9a-zA-Z\-_]*).html',

    //Nowvideo
    'nowvideo\.[a-z]+/video/([0-9a-zA-Z]*)',

    //Rapidvideo
    'rapidvideo\.[a-z]+/([0-9a-zA-Z]*)',

    //Rapidvideocom - raptu
    'raptu\.[a-z]+/.v=([0-9a-zA-Z]*)',

    //Rapidvideocom
    'rapidvideo\.[a-z]+/.v=([0-9a-zA-Z]*)',

    //Flashx
    'flashx\.[a-z]+/([0-9a-zA-Z]*)',

    //Streamin
    'streamin\.[a-z]+/([0-9a-zA-Z]*)',

    //Speedvideo
    'speedvideo\.[a-z]+/([0-9a-zA-Z-]*(\.html)?)',

    //Flashx redirect swzz (cineblog)
    '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Flash',

    //Flashx redirect vcrypt(cinemalibero)
    'goto/([a-z0-9A-Z=]*)/?"[^<]*>Flash',

    //Streamin redirect swzz (cineblog)
    '(?:goto/|link/)([a-z0-9A-Z=]*)/?" target="_blank">Streamin',

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

            link += "<div class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[1] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[2] + "</p></div>";
            link += "<div class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[3] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[4] + "</p></div>";

            if (res[5])
                link += "<div class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsManyLink[i] + "','" + res[5] + "', false)\"><img class=\"poster play\" src=\"img/host/" + host + ".png\" /><p>" + res[6] + "</p></div>";

        }

        if (count > 0) {
            var head = "<div class=\"guarda hidden\"  >" +
                            "<img class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />";
            $('#playButton').html($('#playButton').html() + head + link + "</div>");
        }
    }


    //Link singolo

    count = 0;
    link = "";
    for (var i = 0; i < movieHostsOneLink.length; i++) {
        var patt = new RegExp(movieRegexHostsOneLink[i], 'gi');

        var host = movieHostsOneLink[i].split('|')[1];
        if (!host)
            host = movieHostsOneLink[i];

        while (res = patt.exec(html)) {
            console.log('trovato ' + res[1]);

            //Se il link non l'ho già inserito prima, nei link multipli

            if ($('#playButton').html().indexOf(res[1]) == -1) {
                count++;
                link += "<div  class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsOneLink[i] + "','" + res[1] + "', false)\"><img width=\"200\" src=\"img/host/" + host + ".png\"></div>";
            }
        }
    }

    if (count > 0) {
        var head = "<div class=\"guarda hidden\"  >" +
                        "<img class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />";
        $('#playButton').html($('#playButton').html() + head + link + "</div>");
    }




}

function manageSerieTvLinks(html, regexStagione) {
    var link = "";
    var listaLink = {};
    var currentStagioneLingua = "";

    for (var i = 0; i < serieTvHosts.length; i++) {
        var patt = new RegExp('(?:' + serieTvRegexHosts[i] + '|' + regexStagione + ')', 'gi');

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
                host: serieTvHosts[i]
            }
            var seasonNum = res[1].split(/(?:[^&0-9A-Za-z\.]+|&#[0-9]{3,4};)|x/)[0];

            //Se la stagione inizia con 0, lo tolgo per non creare problemi
            if (seasonNum[0] == "0")
                seasonNum = seasonNum.substr(1, seasonNum.length);

            var label = "STAGIONE " + seasonNum + " - " + currentStagioneLingua;

            if (!listaLink[label])
                listaLink[label] = [];

            listaLink[label].push(singleEpisode);
        }
    }

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

                link += "<div info=\"" + stagioneNumero + "x" + episodioNumero + "\" class=\"guarda col-md-4 col-xs-12 hidden\" >" +
                            "<div tabindex=\"0\" onclick=\"chooseHost($(this).parent())\">" +
                                "<div class=\"playContainer\" style=\"background-position: center;background-repeat: no-repeat;\">" +
                                      "<img class=\"playSeries\" src=\"img/playSeries.png\" />" +
                                "</div><h4>" + stagioneNumero + "x" + episodioNumero + "</h4>" +
                            "</div>";
            }

            var hostImg = listaLink[stagione].value[j].host.split("|")[1] ? listaLink[stagione].value[j].host.split("|")[1] : listaLink[stagione].value[j].host;
            link += "<div class=\"hidden marginBottom10\" host onclick=\"openVideo('" + listaLink[stagione].value[j].host + "','" + listaLink[stagione].value[j].id + "', true)\"><img width=\"200\" src=\"img/host/" + hostImg + ".png\"></div>";
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

    $('.guarda').removeClass('hidden');
    $('#loadingLink').addClass('hidden');
    $('#playButton').removeClass('hidden');
    $('#playButton').addClass('backgroundBlack');

}


