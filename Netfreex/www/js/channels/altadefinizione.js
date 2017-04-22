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
}

function search() {
    var input = encodeURI($('#search').val());

    var url = "http://www.altadefinizione01.uno/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "movieSliderContainer",
];

$("#welcome").addClass("hidden");

$(document).on("ready", function () {
    Promise.all([
            asyncOpenPage("http://www.altadefinizione01.uno/", false, 'movieSliderContainer', false, null),
    ])
    .then(function () {
        initViewChannelMode();
    })
    .catch(function (e) {
        console.error(e);
    });
});