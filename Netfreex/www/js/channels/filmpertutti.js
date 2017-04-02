function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    html = html.split('<ul class="posts">')[1].split('<footer>')[0];

    var articoli = html.split('<li>');
    for (var i = 1; i < articoli.length; i = i + 1) {
        try {
            var movie = {
                title: articoli[i].split('class="title">')[1].split('</div')[0],
                img: articoli[i].split('data-thumbnail="')[1].split('"')[0],
                url: articoli[i].split('href="')[1].split('"')[0]
            };
            //Pulisco tag html da titolo
            var div = document.createElement("div");
            div.innerHTML = movie.title;
            movie.title = div.textContent || div.innerText || "";
            movie.title = movie.title.toLowerCase().replace("serie tv", "");
            arrayFilm.push(movie);
        } catch (e) {
           
            continue;
        }
    }


    //Prossima pagina
    var patt = new RegExp('<a href="([^<]*)">Pagina successiva', 'gi');
    while (res = patt.exec(html)) {
        console.log(res[1])
        arrayFilm.push(res[1])

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
        html = html.split('<section id="content">')[1].split('disqus_thread')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
}

function search() {
    var input = encodeURI($('#search').val());

    var url = "http://www.filmpertutti.black/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "movieSliderContainer",
    "serieTvSliderContainer"
];
$("#welcome").addClass("hidden");

    //FILM PER TUTTI

    //Ultime uscite
openPage("http://www.filmpertutti.black/category/film/", false, 'movieSliderContainer', false);
openPage("http://www.filmpertutti.black/category/serie-tv/", true, 'serieTvSliderContainer', false);

$(window).on("load", function () {

    initViewChannelMode();
});
