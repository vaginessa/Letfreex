function goToHome(backBtn) {
    //Nascondo le pagine
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $('#homeContainer').removeClass('hidden');

    eraseViewMode();
    if (!backBtn)
        $('#bs-example-navbar-collapse-1').collapse('hide');

}

function goToSearch() {
    $('#homeContainer').addClass('hidden');
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').removeClass('hidden');

    eraseViewMode();

    $('#bs-example-navbar-collapse-1').collapse('hide');

}

function eraseViewMode() {
    localStorage.downloadEpisodeInfo = false;
    $('#moviePlot').html("");
    $("#locandina").attr("src", "");
    $("#movieTitle").html("");
    $("#movieDetails").css("background", "url('')");
    $('#playButton').html("");
    $('#cast').html("");
    $('#dataValue').html("");
    $('#durataValue').html("");
    $('#votoValue').html("");
    $('#generi').html("");
    $('#produzione').html("");
    $('.listaStagioni').html("");
    $('#loadingLink').removeClass('hidden');
    $('#playButton').addClass('hidden');
    $('#dropDownStagioni').addClass('hidden');
    $('#currentSeason').html("");
    $('#playButton').removeClass('backgroundBlack');

}

function changeTab(num) {
    switch (num) {
        case 0:
            $('#riepilogo').removeClass('hidden');
            $('#dettagli').addClass('hidden');
            $('#riepilogoButton').addClass('viewButtonActive')
            $('#dettagliButton').removeClass('viewButtonActive')
            break;
        case 1:
            $('#riepilogo').addClass('hidden');
            $('#dettagli').removeClass('hidden');
            $('#riepilogoButton').removeClass('viewButtonActive')
            $('#dettagliButton').addClass('viewButtonActive')
            break;
    }
}

function nextPage(url, isSerieTv, section) {
    console.log(url)
    $('.nextPage' + section).html("<i class=\"fa fa-spinner fa-spin fa-3x\"></i>");
    scrapePage(url, isSerieTv, section)
}

$('#search').keypress(function (e) {
    if (e.which == 13) {
        if (window.cordova) {
            Keyboard.hide();
            StatusBar.hide();
        } 
        $('#searchResultContainer').html('');
        $('#loadingSearch').removeClass('hidden');
        search()
        return false;
    }
});

function showSeason(seasonId) {
    $('.season').addClass('hidden');
    $('#' + seasonId).removeClass('hidden');
}

function changeChannel(name) {
    $('#movieSliderContainer').html('');
    $('#serieTvSliderContainer').html('');
    $('#movieMostPopularSliderContainer').html('');
    $('#serieTvMostPopularSliderContainer').html('');

    $('#carouselItems').html('');

    $('.movieMostPopularTitle').removeClass('hidden');
    $('.serieMostPopularTitle').removeClass('hidden');
    $('#homeFilmMostPopular').removeClass('hidden');
    $('#homeSerieTvMostPopular').removeClass('hidden');


    localStorage.clear();
    $('#channel').html('<scr' + 'ipt type="text/javascript" src="js/channels/' + name + '.js"></scr' + 'ipt>');
}