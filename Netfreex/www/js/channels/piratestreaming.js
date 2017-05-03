function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    var articoli = html.split('featuredItem');
    console.log(html)
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            articoli[i] = articoli[i].split("paginazione")[0];
            var img = articoli[i].indexOf("src=\"") > -1 ? articoli[i].split("src=\"")[1].split('"')[0] : articoli[i].split("src=")[1].split(' ')[0]
            var urlMovie = articoli[i].indexOf('href="') > -1 ? articoli[i].split("href=\"")[1].split('"')[0] : articoli[i].split("href=")[1].split(' ')[0]
            var movie = {
                title: articoli[i].split('html>')[1].split('<')[0],
                img: img,
                url: urlMovie,
                isSerieTv: isSerieTv
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

    var url = localStorage.pirateStreamingUrl + "/cerca.php?all=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

//INIZIALIZZO LE FASCE
var sections = [
    addSection("movie", "Film - Ultime uscite"),
    addSection("serieTv", "Serie TV - Ultime uscite"),
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
            asyncOpenPage(localStorage.pirateStreamingUrl + "/film-aggiornamenti.php?pageNum_lista_film=0", false, 'movie', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/azione.html?pageNum_lista_film=0", false, 'movieAzione', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/commedia.html?pageNum_lista_film=0", false, 'movieCommedia', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/drammatico.html?pageNum_lista_film=0", false, 'movieDrammatico', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/fantascienza.html?pageNum_lista_film=0", false, 'movieFantascienza', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/thriller.html?pageNum_lista_film=0", false, 'movieThriller', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/animazione.html?pageNum_lista_film=0", false, 'movieAnimazione', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/fantasy.html?pageNum_lista_film=0", false, 'movieFantasy', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/romantico.html?pageNum_lista_film=0", false, 'movieRomantico', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/categoria/film/horror.html?pageNum_lista_film=0", false, 'movieHorror', false, null),
            asyncOpenPage(localStorage.pirateStreamingUrl + "/serietv-aggiornamentii.php?pageNum_lista_film=1", true, 'serieTv', false, null),
    ])
    .then(function () {
        initViewChannelMode(sections);
    })
    .catch(function (e) {
        console.error(e);
    });

});