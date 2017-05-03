function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    var articoli = html.split('article')
    
    for (var i = 1; i < articoli.length; i = i + 2) {
        try {
            var movie = {
                title: articoli[i].split('title="')[1].split('"')[0],
                img: articoli[i].split("echo=\"")[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0],
                isSerieTv: isSerieTv
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e)
        }
    }
    

    //Prossima pagina
    var patt = new RegExp('<a class="next page-numbers" href="(.*)">', 'gi');
    while (res = patt.exec(html)) {
        console.log(res[1])
        arrayFilm.push(res[1])
    }

    console.log(arrayFilm)
    printPage(isSerieTv, section, nextPage, callback);
}

function parseMostPopular(html, url, isSerieTv, section, callback)
{
    arrayFilm = [];
    var articoli = html.split('thumb_series');

    var start;
    if (isSerieTv)
        start = 1;
    else
        start = 10;
    for (var i = start; i < articoli.length; i++) {
        try {
            var movie = {
                title: articoli[i].split('title="')[1].split('"')[0],
                img: articoli[i].split("src=\"")[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0],
                isSerieTv: isSerieTv
            };
            arrayFilm.push(movie);
        } catch (e) {
            console.log(e);
        }

        if (i == 9)
            break;
    }
    console.log(arrayFilm)
    printPage(isSerieTv, section,null, callback)
}

function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
        manageMovieLinks(html);

        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');
        

    } else {
        //Levo la roba che non serve
        html = html.split('entry-content')[1].split('disqus_thread')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
    $('#loading').addClass('hidden');
}

function search() {
    var input = encodeURI($('#search').val());

    var url = localStorage.italiaFilmUrl + "/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
addSection("movie", "Film - Ultime uscite"),
addSection("serieTv", "Serie TV - Ultime uscite"),
addSection("movieMostPopular", "Film - Piu' popolari"),
addSection("serieTvMostPopular", "Serie TV - Piu' popolari"),
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
         asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-streaming-2017/", false, 'movieMostPopular', true, null),
         asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-streaming-2017/", true, 'serieTvMostPopular', true, null),
         asyncOpenPage(localStorage.italiaFilmUrl + "/category/serie-tv/", true, 'serieTv', false, null),
         asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-streaming-2017/", false, 'movie', false, null),
         asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-azione/", false, 'movieAzione', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-commedia/", false, 'movieCommedia', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-drammatici/", false, 'movieDrammatico', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-horror/", false, 'movieHorror', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-romantici/", false, 'movieRomantico', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-fantascienza-2/", false, 'movieFantascienza', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/genere-thriller/", false, 'movieThriller', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-animazione/", false, 'movieAnimazione', false, null),
        asyncOpenPage(localStorage.italiaFilmUrl + "/category/film-fantasy-1/", false, 'movieFantasy', false, null),
    ])
     .then(function () {
         initViewChannelMode(sections);
        })
     .catch(function (e) {
            console.error(e);
        });

});
