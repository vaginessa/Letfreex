var movie = {
    titolo: "",
    backgroundImg: "",
    trama: "",
    attori: "",
    anno: "",
    durata: "",
    urls: [],

};

function openMovie(url, titolo, isSerieTv) {
    changeTab(0);
    titolo = unescape(titolo);
    $('#homeContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $('#viewMovieContainer').removeClass('hidden');

    getVideoLink(url, isSerieTv);

    $('#movieDetails').css('height', $(window).height() + 'px');
    $('#movieDetails').css('width', $(window).width() + 'px');
    $('#sfumato').css('height', $(window).height() + 'px');
    $('#boxInfoContainer').css('height', $(window).height() + 'px');
    $('#viewButtons').css('width', $(window).width() + 'px');

    console.log(titolo);
    if (localStorage.getItem(titolo) != undefined)
        fillPageWithMovieDetails(JSON.parse(localStorage.getItem(titolo)), isSerieTv);
    else
        searchMovieInfo(titolo, isSerieTv);
}

