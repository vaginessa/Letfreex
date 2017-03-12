function parsePage(html, url, isSerieTv, section, nextPage) {
    arrayFilm = [];
    var articoli = html.split('featuredItem');
    for (var i = 1; i < articoli.length; i = i + 2) {
        try {
            var movie = {
                title: articoli[i].split('html">')[1].split('</a')[0],
                img: articoli[i].split("src=\"")[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0]
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e);
        }

    }

    //Prossima pagina
    var n = parseInt(url.split('=')[1]) + 1;
    arrayFilm.push(url.substr(0, url.length - 1) + n);

    console.log(arrayFilm)
    printPage(isSerieTv, section, nextPage);
}

function scrapeMostPopular(url, isSerieTv, section) {

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

    var url = "http://www.piratestreaming.news/cerca.php?all=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "movieSliderContainer",
    "serieTvSliderContainer"
];


//Most popular
    $('.movieMostPopularTitle').addClass('hidden');
    $('.serieMostPopularTitle').addClass('hidden');
    $('#homeFilmMostPopular').addClass('hidden');
    $('#homeSerieTvMostPopular').addClass('hidden');

    //Ultime uscite
    openPage("http://www.piratestreaming.black/film-aggiornamenti.php?pageNum_lista_film=0", false, 'movieSliderContainer', false);

    openPage("http://www.piratestreaming.black/serietv-aggiornamentii.php?pageNum_lista_film=1", true, 'serieTvSliderContainer', false);

    //openPage("http://www.piratestreaming.news/serietv-aggiornamentii.php?pageNum_lista_film=2", true, 'serieTvSliderContainer', false);
    //openPage("http://www.piratestreaming.news/film-aggiornamenti.php?pageNum_lista_film=2", false, 'movieSliderContainer', false);

