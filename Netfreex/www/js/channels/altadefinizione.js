function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    var articoli = html.split('cover boxcaption');
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            var movie = {
                title: articoli[i].split('alt="')[1].split('"')[0],
                img: articoli[i].split("src=\"")[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0],
                isSerieTv: isSerieTv
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e);
        }

    }

    //Prossima pagina
    console.log(html)
    try {
        var urlNextPage = html.split('nextpostslink" rel="next" href="')[1].split('"')[0];
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
        manageMovieLinks(html);

        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');
        

    } else {
        //Levo la roba che non serve
        html = html.split('Guarda L')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
    $('#loading').addClass('hidden');
}

function search() {
    var input = encodeURI($('#search').val());

    var url = localStorage.altadefinizioneUrl + "/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    addSection("movie", "Film - Ultime uscite"),
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
            asyncOpenPage(localStorage.altadefinizioneUrl, false, 'movie', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/azione/", false, 'movieAzione', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/commedia/", false, 'movieCommedia', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/drammatico/", false, 'movieDrammatico', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/horror/", false, 'movieHorror', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/romantico/", false, 'movieRomantico', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/fantascienza/", false, 'movieFantascienza', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/thriller/", false, 'movieThriller', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/animazione/", false, 'movieAnimazione', false, null),
            asyncOpenPage(localStorage.altadefinizioneUrl + "/genere/film/fantasy/", false, 'movieFantasy', false, null),
    ])
    .then(function () {
        initViewChannelMode(sections);
    })
    .catch(function (e) {
        console.error(e);
    });
});