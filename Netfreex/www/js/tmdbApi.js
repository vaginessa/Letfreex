//TheMovieDB API
var apiKey = "f7f51775877e0bb6703520952b3c7840";

function searchMovieInfo(input, isSerie) {
    var aux = input.replace(new RegExp('\\[.*\\]', 'g'), ' ').split('(');
    input = aux[0];
    console.log(input);
    var anno = isSerie ? '' : aux[1].split(')')[0];

    var url = 'http://api.themoviedb.org/3/',
    mode = isSerie ? 'search/tv?query=' : 'search/movie?query=',
    key = '&api_key=' + apiKey,
    language = '&language=it',
    year = isSerie ? '' : '&year=' + anno;

    $.ajax({
        type: 'GET',
        url: url + mode + input + key + language + year,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (json) {
            console.dir(json);
            localStorage.setItem(input, JSON.stringify(json));
            fillPageWithMovieDetails(json, isSerie);
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function fillPageWithMovieDetails(json, isSerie) {
    var id = json.results[0].id;

    //Base info
    $('#moviePlot').html(json.results[0].overview);
    $("#locandina").attr("src", "https://image.tmdb.org/t/p/original/" + json.results[0].poster_path);
    $("#movieTitle").html(isSerie ? json.results[0].name : json.results[0].title);
    $("#movieDetails").css("background-image", "url('https://image.tmdb.org/t/p/original/" + json.results[0].backdrop_path + "')");

    if ($(window).width() > 700) {
        $('.rightBlockView').css('width', $(window).width() - ($('#boxInfoContainer').outerWidth(true) - $('#boxInfoContainer').outerWidth() + 340 + 30) + 'px')
        $('.rightBlockView').css('height', $(window).height() - 134 + 'px');
        $('#moviePlot').css('height', $(window).height() - 480 + 'px');
        $('#dettagli').css('height', $(window).height() - 480 + 'px');
        $('#boxInfoContainer').css('overflow-y', 'initial');
    }
    $('#loadingLink').css('height', '200px');

    //General info
    getGeneralInfo(id, isSerie);
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
            localStorage.setItem(id + "cast", JSON.stringify(jsonCast))
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
        html += "<img style='width:120px; height:200px;' src='https://image.tmdb.org/t/p/original" + json.cast[i].profile_path + "'>";
        html += "<div class='actorName'> <span class='colorOrange'>" + json.cast[i].name + "</span><br>as<br>" + json.cast[i].character + "</div>";
        html += "</div>";
        $('#cast').html($('#cast').html() + html)
    }
}

function getGeneralInfo(id, isSerie) {
    if (localStorage.getItem(id + "info") != undefined) {
        var jsonInfo = JSON.parse(localStorage.getItem(id + "info"));
        fillGeneralInfo(jsonInfo);
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
            fillGeneralInfo(jsonInfo)
            //Cast
            getCast(id, isSerie);

        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function fillGeneralInfo(json) {
    if (json.runtime == null)
        json.runtime = 'N.D.'
    else
        json.runtime = json.runtime + " Min"

    $('#durataValue').html(json.runtime);
    $('#dataValue').html(json.release_date);
    $('#votoValue').html(json.vote_average);

    var generi = json.genres;
    $('#generi').html("");
    for (var i = 0; i < generi.length; i++) {
        console.log(generi[i].name)
        if (i != generi.length - 1)
            $('#generi').html($('#generi').html() + generi[i].name + "<span class='colorOrange'>,&nbsp;<span>");
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