//TheMovieDB API
var apiKey = "f7f51775877e0bb6703520952b3c7840";
var id;
function searchMovieInfo(obj, isSerie, isCarousel) {
    id = "";
    var input = obj.title;

    var aux = input.replace(new RegExp('\\[.*\\]', 'g'), ' ').split('(');
    input = encodeURI(aux[0].split('\'')[0].split('-')[0]);
    console.log(input);
    var anno = aux[1] == undefined ? '' : aux[1].split(')')[0];

    var url = 'http://api.themoviedb.org/3/',
        mode = isSerie ? 'search/tv?query=' : 'search/movie?query=',
        key = '&api_key=' + apiKey,
        language = '&language=it';
    var year = "";

    if(anno!="")
        year = isSerie ? '&first_air_date_year='+anno : '&year=' + anno;


    $.ajax({
        type: 'GET',
        url: url + mode + input + key + language + year,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (json) {
            if (isCarousel) {
                //Se le api non hanno trovato niente, cerco un altro elemento a caso finchè non ne trovo uno
                if (json.total_results == 0 || json.results[0].backdrop_path == null) {
                    obj = arrayFilm[Math.floor(Math.random() * arrayFilm.length-1) + 0];
                    searchMovieInfo(obj, isSerie, true);
                } else {
                    json.info = obj;
                    console.log(json);
                    arrayCarousel.push(json);
                }
                    
            } else {
                if (json.total_results == 0) {
                    fillPageWithMovieDetails(json, isSerie, obj, false);
                } else {
                    console.dir(json);
                    localStorage.setItem(input, JSON.stringify(json));
                    fillPageWithMovieDetails(json, isSerie, obj, true);
                }
            }
            
            
            
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function fillPageWithMovieDetails(json, isSerie, obj, foundByAPI) {

    if ($(window).width() > 700) {
        $('.rightBlockView').css('width', $(window).width() - ($('#boxInfoContainer').outerWidth(true) - $('#boxInfoContainer').outerWidth() + 340 + 30) + 'px')
        $('.rightBlockView').css('height', $(window).height() - 148 + 'px');
        $('#moviePlot').css('height', $(window).height() - 480 + 'px');
        $('#dettagli').css('height', $(window).height() - 480 + 'px');
        $('#boxInfoContainer').css('overflow-y', 'initial');
    }
    $('#loadingLink').css('height', '200px');

    if (foundByAPI) {
        id = json.results[0].id;

        //Base info
        $('#moviePlot').html(json.results[0].overview);
        $("#locandina").attr("src", "https://image.tmdb.org/t/p/w500" + json.results[0].poster_path);
        $("#movieTitle").html(isSerie ? json.results[0].name : json.results[0].title);

        $("#movieDetails").css("background-image", "url('" + selectBackgroundSize() + json.results[0].backdrop_path + "')");

        localStorage.currentMovieId = id;

        //General info
        getGeneralInfo(id, isSerie);
    } else {
        //$('#moviePlot').html(obj.plot);
        $("#locandina").attr("src", obj.img);
        $("#movieTitle").html(obj.title);
    }

    
}

function getCast(id, isSerie) {
    if (localStorage.getItem(id + "cast") != undefined) {
        var jsonCast = JSON.parse(localStorage.getItem(id + "cast"));
        fillCast(jsonCast);
        return;
    }


    var urlCast = "";
    if (isSerie)
        urlCast = 'http://api.themoviedb.org/3/tv/' + id + '/credits';
    else
        urlCast = 'http://api.themoviedb.org/3/movie/' + id + '/credits';

    $.ajax({
        type: 'GET',
        url: urlCast + '?api_key=' + apiKey,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (jsonCast) {
            localStorage.setItem(id + "cast", JSON.stringify(jsonCast));
            fillCast(jsonCast);
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function fillCast(json) {
    $('#cast').html("");
    for (var i = 0; i < json.cast.length; i++) {
        console.log(json.cast[i].name)
        if (json.cast[i].profile_path == null)
            continue;
        var html = "<div class='actor col-md-3 col-xs-12'>";
        html += " <a href='https://it.wikipedia.org/w/index.php?search=" + json.cast[i].name + "&title=Speciale%3ARicerca&go=Vai'>";
        html += "<img style='width:135px; height:200px;' src='https://image.tmdb.org/t/p/original" + json.cast[i].profile_path + "'>";
        html += "<div class='actorName'><span class='colorOrange'>" + json.cast[i].name + "</span><br>as<br><span class='colorWhite'>" + json.cast[i].character + "</span></div>";
        html += "</a></div>";
        $('#cast').html($('#cast').html() + html);
    }
}

function getGeneralInfo(id, isSerie) {
    if (localStorage.getItem(id + "info") != undefined) {
        var jsonInfo = JSON.parse(localStorage.getItem(id + "info"));
        fillGeneralInfo(jsonInfo, isSerie);
        //Cast
        getCast(id, isSerie);
        return;
    }

    var urlInfo = "";
    if (isSerie)
        urlInfo = 'http://api.themoviedb.org/3/tv/' + id;
    else
        urlInfo = 'http://api.themoviedb.org/3/movie/' + id;

    $.ajax({
        type: 'GET',
        url: urlInfo + '?api_key=' + apiKey,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (jsonInfo) {
            localStorage.setItem(id + "info", JSON.stringify(jsonInfo))
            fillGeneralInfo(jsonInfo, isSerie)
            //Cast
            getCast(id, isSerie);

        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function fillGeneralInfo(json, isSerie) {
    if (json.runtime == null)
        json.runtime = 'N.D.'
    else
        json.runtime = json.runtime + " Min";

    if (isSerie) {
        var html = "<span class='colorOrange'>Stagioni &nbsp;</span>" + json.number_of_seasons + "<span class='colorOrange'>&nbsp;&nbsp;Episodi &nbsp;</span>" + json.number_of_episodes;
        $('#durataValue').html(html);
    }
    else
     $('#durataValue').html(json.runtime);

    if(isSerie)
        $('#dataValue').html(json.first_air_date);
    else
        $('#dataValue').html(json.release_date);
    $('#votoValue').html(json.vote_average);

    var generi = json.genres;
    $('#generi').html("");
    for (var i = 0; i < generi.length; i++) {
        console.log(generi[i].name)
        if (i != generi.length - 1)
            $('#generi').html($('#generi').html() + generi[i].name + "<span class='colorOrange'>,&nbsp;</span>");
        else
            $('#generi').html($('#generi').html() + generi[i].name);

    }

    var produzioni = json.production_companies;
    $('#produzione').html("");
    for (var i = 0; i < produzioni.length; i++) {
        console.log(produzioni[i].name)
        if (i != produzioni.length - 1)
            $('#produzione').html($('#produzione').html() + produzioni[i].name + "<span class='colorOrange'>,&nbsp;<span>");
        else
            $('#produzione').html($('#produzione').html() + produzioni[i].name);

    }
}

function getEpisodesInfo() {

    //Aggiorna immagine e titolo degli episodi con quelli scaricati dalle API
    function updateEpisodeInfo(arrayEpisodi, json, index) {
        var image = $("div[info='" + arrayEpisodi[index] + "']").find('.playContainer');

        image.css('background-image', 'url(\'https://image.tmdb.org/t/p/w300' + json.still_path + '\')');

        $("div[info='" + arrayEpisodi[index] + "']").find('h4').text(arrayEpisodi[index] + ' - ' + json.name);

        $("div[info='" + arrayEpisodi[index] + "']").append("<div class=\"episodePlot hidden\">" + json.overview + "</div>"); 
    }

    //Fa la chiamata alle API
    function downloadEpisodeInfo(arrayEpisodi, index) {

        //Se le info sull'episodio sono già presenti in cache, uso quelle, altrimenti faccio la chiamata ajax
        if (localStorage.getItem(id + "|" + arrayEpisodi[index]) != undefined) {
            var jsonStorage = JSON.parse(localStorage.getItem(id + "|" + arrayEpisodi[index]));
            updateEpisodeInfo(arrayEpisodi, jsonStorage, index);
            downloadEpisodeInfo(arrayEpisodi, index + 1);
            return;
        }

        if (index == arrayEpisodi.length || localStorage.downloadEpisodeInfo == "false")
            return;

        var info = arrayEpisodi[index].split('x');
        var url = 'http://api.themoviedb.org/3/tv/' + id + '/season/' + info[0] + '/episode/' + info[1] + '?api_key=';

        var inglese = false;

            $.ajax({
                type: 'GET',
                url: url + apiKey, //+ '&language=it',
                contentType: 'application/json',
                dataType: 'jsonp',
                
                success: function(json) {
                    console.dir(json);

                    //Cacho il json
                    localStorage.setItem(id +"|"+ arrayEpisodi[index], JSON.stringify(json));

                    //Se il titolo italiano è vuoto faccio la richiesta in inglese
                    /*
                    if (json.name == "") {
                        $.ajax({
                            type: 'GET',
                            url: url + apiKey,
                            contentType: 'application/json',
                            dataType: 'jsonp',

                            success: function (json) {
                                console.dir(json);
                                updateEpisodeInfo(arrayEpisodi, json, index);
                            },
                            error: function (e) {
                                console.log(e.message);

                            },
                            timeout: 3000
                        }).always(function () {
                            //Chiamata ricorsiva
                            downloadEpisodeInfo(arrayEpisodi, index + 1);
                        });
                        inglese = true;
                    }
                    else
                    */
                        updateEpisodeInfo(arrayEpisodi, json, index);

                },
                error: function(e) {
                    console.log(e.message);
                    
                },
                timeout: 2000
            }).always(function () {
                if(!inglese)
                    //Chiamata ricorsiva
                    downloadEpisodeInfo(arrayEpisodi, index + 1);
            });
        
        
    }

    //Mi recupero gli episodi che avevo inserito nell'html e mi preparo a chiamare le API
    var arrayEpisodi = [];
    var listaStagioni = "";
    var first = true;

    $("#playButton").children().each(function () {
        //Stagione
        console.log($(this).attr('id'));

        var seasonNumber = $(this).attr('id').replace("stagione", "");

        if (!new RegExp('ITA').test(seasonNumber)) {
            seasonNumber = seasonNumber + " ITA";
        }
        if (seasonNumber[0] == '0')
            seasonNumber = seasonNumber.substr(1, seasonNumber.length);

        if (first) {
            $('#currentSeason').html('Stagione ' + seasonNumber.replaceAll('_', ' ') + ' <span class="caret"></span>');
            first = false;
        }

        listaStagioni += "<li><a onclick=\"showSeason('" + $(this).attr('id') + "')\">Stagione " + seasonNumber.replaceAll('_', ' ') + "</a></li>";

        $("#" + $(this).attr('id')).children().each(function () {
            //Episodio
            console.log($(this).attr('info'));
            arrayEpisodi.push($(this).attr('info'));
        });
    });

    $('.listaStagioni').html(listaStagioni);
    $('#dropDownStagioni').removeClass('hidden');

    localStorage.downloadEpisodeInfo = true;
    downloadEpisodeInfo(arrayEpisodi, 0);
    
}

function selectBackgroundSize() {
    if ($(window).width() < 780)
        return 'https://image.tmdb.org/t/p/w780';
    else if ($(window).width() > 780 && $(window).width() < 1280)
        return 'https://image.tmdb.org/t/p/w1280';
    else
        return 'https://image.tmdb.org/t/p/original';
}

/*
IMAGES SIZE TMDB

"backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],
"still_sizes": [
  "w92",
  "w185",
  "w300",
  "original"
]*/