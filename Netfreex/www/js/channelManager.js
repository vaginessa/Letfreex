function loadChannelList(added) {
    var channelListHtml = '<li><a class="menuItem" onclick="aggiungiCanale();">Aggiungi canale</a></li><li class="borderBottomWhite"><a class="menuItem" onclick="eliminaCanale();">Elimina canale</a></li>';
    if (localStorage.cineblogUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=cineblog">Cineblog</a></li>';
    }
    if (localStorage.italiaFilmUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=italiafilm">ItaliaFilm</a></li>';
    }
    if (localStorage.pirateStreamingUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=piratestreaming">Piratestreaming</a></li>';
    }
    if (localStorage.filmPerTuttiUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=filmpertutti">FilmPerTutti</a></li>';
    }
    if (localStorage.cinemaLiberoUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=cinemalibero">CinemaLibero</a></li>';
    }
    if (localStorage.altadefinizioneUrl) {
        channelListHtml += '<li><a class="menuItem" href="index.html?channel=altadefinizione">Altadefinizione</a></li>';
    }

    $("#channelList").html(channelListHtml);

    if (!isChannelListEmpty()) {
        //INIZIALIZZAZIONE CANALI
        var channel = getURLParameters('channel');
        if (channel != null && !added) {
            changeChannel(channel);
            $('#channelName').html(channel);
        } else {
            //CANALE DEFAULT
            if (localStorage.filmPerTuttiUrl) {
                window.location.replace("index.html?channel=filmpertutti");
                
            } else if (localStorage.italiaFilmUrl) {
                window.location.replace("index.html?channel=italiafilm");
            } else if (localStorage.pirateStreamingUrl) {
                window.location.replace("index.html?channel=piratestreaming");
            }
            else if (localStorage.cinemaLiberoUrl) {
                window.location.replace("index.html?channel=cinemalibero");
            }
            else if (localStorage.altadefinizioneUrl) {
                window.location.replace("index.html?channel=altadefinizione");
            }
            else if (localStorage.cineblogUrl) {
                window.location.replace("index.html?channel=cineblog");
            }

        }
    } 
    
}

function isChannelListEmpty() {
    return $("#channelList").html() == '<li><a class="menuItem" onclick="aggiungiCanale();">Aggiungi canale</a></li><li class="borderBottomWhite"><a class="menuItem" onclick="eliminaCanale();">Elimina canale</a></li>';
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

    clearCache();
    $('#channel').html('<scr' + 'ipt type="text/javascript" src="js/channels/' + name + '.js"></scr' + 'ipt>');
}

function initViewChannelMode() {
    $('#homeContainer').removeClass('hidden');
    $('#welcome').addClass('hidden');
    $('#cerca').removeClass('hidden');
    $('#preferiti').removeClass('hidden');

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

    ////SE SONO VUOTI TUTTI DO ERRORE DI RETE
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
    if (windowLength < 1024 && windowLength >= 570)
        slidePerView = 4;
    if (windowLength < 569 && windowLength >= 426)
        slidePerView = 3;
    if (windowLength < 426)
        slidePerView = 3;

    slidersHomeArray = new Array();
    for (var i = 0; i < sections.length; i++) {
        initializeSliderPoster(sections[i]);
    }

    try {

        //Carousel
        if (arrayCarousel.length == 0)
            setTimeout(fillCarousel, 500);
        else
            fillCarousel();
    } catch (e) {

        $('#loading').addClass('hidden');
        $('.tf-menu').removeClass('hidden');
        $('#tf-menu').removeClass('hidden');
        $("#homeContainer").addClass('paddingTopSection');
    }


    if (localStorage.timeStampDonation == undefined)
        localStorage.timeStampDonation = new Date();

    if (new Date(localStorage.timeStampDonation).getTime() < new Date().getTime()) {
        var donation = '<p style="color: white"> Stiamo portando avanti questo progetto soltanto per passione.' +
            '<br><br> Se ti piace l\'app, vuoi dirci grazie e supportare il nostro lavoro, perche\' non offrirci un caffe\'?<br>Grazie!</p>' +
            '<i style="color:orange">Il team di Netfreex</i><br><br>' +
            '<a href="http://paypal.me/be4t5"> <img src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png" alt="Donate"></a>';

        swal({
            title: 'Netfreex e\' gratis!',
            type: 'info',
            html: donation,
            background: 'rgba(0, 0, 0, 0.82)',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false

        });
        localStorage.timeStampDonation = new Date().addDays(1);
    }
}

function aggiungiCanale() {
    
    swal({
        background: 'rgba(0, 0, 0, 1)',
        title: 'Inserisci l\'indirizzo del canale',
        input: 'text',
        showCancelButton: true,
        customClass: 'top-60',
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        inputValidator: function(value) {
            return new Promise(function (resolve, reject) {
                if (value == "")
                    reject();

                if (value.indexOf("italia-film") == -1
                    && value.indexOf("cb01") == -1
                    && value.indexOf("piratestreaming") == -1
                    && value.indexOf("filmpertutti") == -1
                    && value.indexOf("cinemalibero") == -1
                    && value.indexOf("altadefinizione") == -1
                    ) {
                    reject('Il canale che hai inserito non e\' valido');
                } else {

                    if (isChannelSupported(value))
                        resolve();
                    else
                        reject('Il canale che hai inserito non e\' compatibile con il tuo device');
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
        else if (result.indexOf("filmpertutti") > -1) {
            localStorage.filmPerTuttiUrl = result;
        }
        else if (result.indexOf("cinemalibero") > -1) {
            localStorage.cinemaLiberoUrl = result;
        }
        else if (result.indexOf("altadefinizione") > -1) {
            localStorage.altadefinizioneUrl = result;
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
    if (localStorage.filmPerTuttiUrl) {
        channelList["filmPerTuttiUrl"] = "FilmPerTutti";
    }
    if (localStorage.cinemaLiberoUrl) {
        channelList["cinemaLiberoUrl"] = "CinemaLibero";
    }
    if (localStorage.altadefinizioneUrl) {
        channelList["altadefinizioneUrl"] = "Altadefinizione";
    }

    swal({
        background: 'rgba(0, 0, 0, 1)',
        title: 'Quale canale vuoi eliminare?',
        input: 'select',
        inputOptions: channelList,
        customClass: 'top-60',
        inputPlaceholder: 'Seleziona canale',
        showCancelButton: true,
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
                if (value == "")
                    reject();
                resolve();

            });
        }
    }).then(function (result) {
        localStorage.removeItem(result);
        window.location.replace("index.html");
    });
}
