function loadChannelList(added) {
    var channelListHtml = '<li><a onclick="aggiungiCanale();">Aggiungi canale</a></li><li class="borderBottomWhite"><a onclick="eliminaCanale();">Elimina canale</a></li>';
    if (localStorage.cineblogUrl) {
        channelListHtml += '<li><a href="index.html?channel=cineblog">Cineblog</a></li>';
    }
    if (localStorage.italiaFilmUrl) {
        channelListHtml += '<li><a href="index.html?channel=italiafilm">ItaliaFilm</a></li>';
    }
    if (localStorage.pirateStreamingUrl) {
        channelListHtml += '<li><a href="index.html?channel=piratestreaming">Piratestreaming</a></li>';
    }

    $("#channelList").html(channelListHtml);

    if ($("#channelList").html() != '<li><a onclick="aggiungiCanale();">Aggiungi canale</a></li><li class="borderBottomWhite"><a onclick="eliminaCanale();">Elimina canale</a></li>') {
        //INIZIALIZZAZIONE CANALI
        var channel = getURLParameters('channel');
        if (channel != null && !added) {
            changeChannel(channel);
            $('#channelName').html(channel);
        } else {
            //CANALE DEFAULT
            if (localStorage.cineblogUrl) {
                window.location.replace("index.html?channel=cineblog");
            } else if (localStorage.italiaFilmUrl) {
                window.location.replace("index.html?channel=italiafilm");
            } else if (localStorage.pirateStreamingUrl) {
                window.location.replace("index.html?channel=piratestreaming");
            }

        }
    } 
    
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

    $('img').imageReloader();

    $('#channel').html('<scr' + 'ipt type="text/javascript" src="js/channels/' + name + '.js"></scr' + 'ipt>');
}

function initViewChannelMode() {
    $('#homeContainer').removeClass('hidden');
    $('#welcome').addClass('hidden');
    $('#cerca').removeClass('hidden');

    //NASCONDO GLI SLIDER VUOTI
    if (isEmpty($('#movieSliderContainer'))) {
        $('.movieLastTitle').addClass('hidden');
        $('#homeFilm').addClass('hidden');
    }
    if (isEmpty($('#serieTvSliderContainer'))) {
        $('.serieLastTitle').addClass('hidden');
        $('#homeSerieTv').addClass('hidden');
    }
    if (isEmpty($('#serieTvMostPopularSliderContainer'))) {
        $('.serieMostPopularTitle').addClass('hidden');
        $('#homeSerieTvMostPopular').addClass('hidden');
    }
    if (isEmpty($('#movieMostPopularSliderContainer'))) {
        $('.movieMostPopularTitle').addClass('hidden');
        $('#homeFilmMostPopular').addClass('hidden');
    }

    //SE SONO VUOTI TUTTI DO ERRORE DI RETE
    if (isEmpty($('#movieSliderContainer')) && isEmpty($('#serieTvSliderContainer')) && isEmpty($('#serieTvMostPopularSliderContainer')) && isEmpty($('#movieMostPopularSliderContainer'))) {
        $('#error').removeClass('hidden');
    }
    slidePerView = 4;
    //Inizializzo gli slider con le copertine
    var windowLength = $(window).width();
    if (windowLength >= 1024 && windowLength <= 1350)
        slidePerView = 5;
    if (windowLength >= 1350 && windowLength <= 1700)
        slidePerView = 6;
    if (windowLength >= 1800)
        slidePerView = 8;
    if (windowLength < 1024 && windowLength >= 768)
        slidePerView = 4;
    if (windowLength < 768)
        slidePerView = 4;

    for (var i = 0; i < sections.length; i++) {
        initializeSliderPoster(sections[i]);
    }

    //Carousel
    fillCarousel();
}

function aggiungiCanale() {
    
    swal({
        background: 'rgba(0, 0, 0, 0.568627)',
        title: 'Inserisci l\'indirizzo del canale',
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
                if (value.indexOf("italia-film") == -1 && value.indexOf("cb01") == -1 && value.indexOf("piratestreaming") == -1) {
                    reject('Il canale che hai inserito non e\' valido');
                } else {
                    resolve();
                }
            });
        }
    }).then(function(result) {
        if (result.indexOf("italia-film") > -1) {
            localStorage.italiaFilmUrl = result;
        }
        else if (result.indexOf("cb01") > -1) {
            localStorage.cineblogUrl = result;
        }
        else if (result.indexOf("piratestreaming") > -1) {
            localStorage.pirateStreamingUrl = result;
        }
        loadChannelList(true);
    });
    setTimeout(function() {
        $('.dropdown-toggle').html('<span id="menuDropDownLabel" >Gestione canali </span><span class="caret"></span>');
    }, 1);

}

function eliminaCanale() {
    setTimeout(function () {
        $('.dropdown-toggle').html('<span id="menuDropDownLabel" >Gestione canali </span><span class="caret"></span>');
    }, 1);

    var channelList = {};

    if (localStorage.cineblogUrl) {
        channelList["cineblogUrl"] = "Cineblog";
    }
    if (localStorage.italiaFilmUrl) {
        channelList["italiaFilmUrl"] = "ItaliaFilm";
    }
    if (localStorage.pirateStreamingUrl) {
        channelList["pirateStreamingUrl"] = "Piratestreaming";
    }

    swal({
        background: 'rgba(0, 0, 0, 0.568627)',
        title: 'Quale canale vuoi eliminare?',
        input: 'select',
        inputOptions: channelList,
        inputPlaceholder: 'Seleziona canale',
        showCancelButton: true,
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        inputValidator: function(value) {
            return new Promise(function(resolve, reject) {

                resolve();

            });
        }
    }).then(function (result) {
        localStorage.removeItem(result);
        window.location.replace("index.html");
    });
}
