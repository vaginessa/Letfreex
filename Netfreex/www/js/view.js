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
    $('#viewMovieContainer').removeClass('hidden');

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

        if (host[0] == 'swzz') {
            //if(isSerieTv)
            //    extractLinkSwzz("http://www.cb01.uno/serietv/goto/" + url + "", host[1]);
            //else
            extractLinkSwzz(url, host[1]);
        }
            

        else if (host[0] == 'italiaFilmLinks') {
            if (host[1] == 'openload')
                italiafilmLinksExtract(url + "?host=1", success, error);
        }

        else if (host[0] == 'nowvideo')
            nowvideoExtract(url, success, error);
        else if (host[0] == 'vidto')
            vidtoExtract(url, success, error);
        else if (host[0] == 'rapidvideo')
            rapidvideoExtract(url, success, error);
        else if (host[0] == 'flashx')
            flashxExtract(url, success, error);
        else if (host[0] == 'openload')
            openloadExtract(url, success, error);
        else if (host[0] == 'streaminto')
            streamintoExtract(url, success, error);
    }, 100);
}

//Riproduce il video
var success = function (url) {
    $('#loading').addClass('hidden');
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
   
    VideoPlayer.play(url);
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    alert("Il link e' offline");
}





