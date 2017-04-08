//Apre la pagina di un film o serie tv
function openMovie(url,titolo, img, isSerieTv) {
    var obj = {
        title: titolo,
        url: url,
        img: img
    }

    changeTab(0);
    titolo = unescape(titolo);
    $('#homeContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $('#favouritesContainer').addClass('hidden');
    $('#viewMovieContainer').removeClass('hidden');

    //Setto bottone preferiti
    if (isInFavourites(url))
        $('#addToFavourites').html('<div onclick="removeFromFavourites(\'' + url + '\', \'' + titolo + '\',\'' + img + '\',\'' + isSerieTv + '\' )"><i class="fa fa-star colorOrange"></i> Rimuovi dai preferiti</div>');
    else
        $('#addToFavourites').html('<div onclick="addToFavourites(\'' + url + '\', \'' + titolo + '\',\'' + img + '\',\'' + isSerieTv + '\')"><i class="fa fa-star-o colorOrange"></i> Aggiungi ai preferiti</div>');


    getVideoLink(url, isSerieTv);

    $('#movieDetails').css('height', $(window).height() + 'px');
    $('#movieDetails').css('width', $(window).width() + 'px');
    $('#sfumato').css('height', $(window).height() + 'px');
    $('#boxInfoContainer').css('height', $(window).height() + 'px');
    $('#viewButtons').css('width', $(window).width() + 'px');

    console.log(titolo);
    if (localStorage.getItem(titolo) != undefined)
        fillPageWithMovieDetails(JSON.parse(localStorage.getItem(titolo)), isSerieTv, obj, true);
    else
        searchMovieInfo(obj, isSerieTv);
}


//Eventi cordova
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Gestire gli eventi di sospensione e ripresa di Cordova
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        

        document.addEventListener("backbutton", function (e) {
            goToHome(true);
            $('#loading').addClass('hidden');
        }, false);
    };

    function onPause() {
        // TODO: questa applicazione è stata sospesa. Salvarne lo stato qui.
    };

    function onResume() {
        // TODO: questa applicazione è stata riattivata. Ripristinarne lo stato qui.
    };
})();

function chooseHost(video) {
    console.log(video);
    swal({
        title: 'Guarda su',
        html: video.clone().find('[host]').removeClass('hidden'),
        background: 'rgba(0, 0, 0, 0.82)',
        padding: 30,
        showConfirmButton: false
    });
}

//Estrae il video di film/serie tv
function openVideo(host, url, isSerieTv) {
    swal.closeModal();
    $('#loading').removeClass('hidden');

    setTimeout(function () {
        console.log(url);
        host = host.split('|');

        //Redirect link criptati
        if (host[0] == 'swzz') {
            extractLinkSwzz(url, host[1]);
        }      
        else if (host[0] == 'vcrypt') {
            extractVcrypt(url, host[1]);
        }
        //Link in chiaro
        else if (host[0] == 'vidlox')
            vidloxExtract(url, success, error);
        else if (host[0] == 'speedvideo')
            speedvideoExtract(url, success, error);
        else if (host[0] == 'nowvideo')
            nowvideoExtract(url, success, error);
        else if (host[0] == 'vidto')
            vidtoExtract(url, success, error);
        else if (host[0] == 'rapidvideo')
            rapidvideoExtract(url, success, error);
        else if (host[0] == 'rapidvideocom')
            rapidvideocomExtract(url, success, error);
        else if (host[0] == 'flashx')
            flashxExtract(url, success, error);
        else if (host[0] == 'openload')
            openloadExtract(url, success, error);
        else if (host[0] == 'streaminto')
            streamintoExtract(url, success, error);
    }, 100);
}

function hideLoadingiOs() {
    $('#loading').addClass("hidden");
}


//Riproduce il video
var success = function (url) {
    
    console.log(url);
 
    //Apri link openload estratto da italiaFilmLinks
    if (url.indexOf("italiaFilmLinks") > -1) {
        url = url.split('|');
        if(url[1] == 'openload')
            openVideo('openload', url[2]);
        if (url[1] == 'videomega')
            openVideo('videomega', url[2]);
        return;
    }
    if (device.platform != "Android") {
        if (url.indexOf("nowvideo") > -1) {
            window.plugins.streamingMedia.playVideo(url);
            $('#loading').addClass("hidden");
        } else
            $('#loading').html("<a style='position:relative; top:30%' href='vlc-x-callback://x-callback-url/stream?url=" + encodeURIComponent(url) + "' onclick='hideLoadingiOs()'><img class='poster play' src='img/play_button.png'></a>");

    } else {
        $('#loading').addClass('hidden');
        VideoPlayer.play(url);
    }
        
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    alert("Il link e' offline");
}





