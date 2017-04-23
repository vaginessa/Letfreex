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
        $('#addToFavourites').html('<div tabindex="0" onclick="removeFromFavourites(\'' + url + '\', \'' + titolo + '\',\'' + img + '\',\'' + isSerieTv + '\' )"><i class="fa fa-star colorOrange"></i> Rimuovi dai preferiti</div>');
    else
        $('#addToFavourites').html('<div tabindex="0" onclick="addToFavourites(\'' + url + '\', \'' + titolo + '\',\'' + img + '\',\'' + isSerieTv + '\')"><i class="fa fa-star-o colorOrange"></i> Aggiungi ai preferiti</div>');


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

var nessunLinkDisponibile = "<span class='marginTop10'>Nessun link disponibile, prova su un altro canale.</span>";
function removeLinkOffline(video) {
    var arrayHost = $('div[host]:visible'); //video.find('[host]');

    for (var i = 0; i < arrayHost.length; i++) {

        var host = arrayHost[i].innerHTML.split("openVideo('")[1].split("'")[0];
        var id = arrayHost[i].innerHTML.split("','")[1].split("'")[0];

        if (host == 'vidlox')
            removeLinkOfflineVidLox(id, arrayHost[i]);
        else if (host == 'speedvideo')
            removeLinkOfflineSpeedvideo(id, arrayHost[i]);
        else if (host == 'nowvideo')
            removeLinkOfflineNowvideo(id, arrayHost[i]);
        else if (host == 'vidto')
            removeLinkOfflineVidTo(id, arrayHost[i]);
        else if (host == 'rapidvideo')
            removeLinkOfflineRapidvideo(id, arrayHost[i]);
        else if (host == 'rapidvideocom')
            removeLinkOfflineRapidvideoCom(id, arrayHost[i]);
        else if (host == 'flashx')
            removeLinkOfflineFlashX(id, arrayHost[i]);
        else if (host == 'openload')
            removeLinkOfflineOpenload(id, arrayHost[i]);
        else if (host == 'streaminto')
            removeLinkOfflineStreaminTo(id, arrayHost[i]);
        else if (host == 'megahd')
            removeLinkOfflineMegahd(id, arrayHost[i]);
        else if (host == 'fastvideo')
            removeLinkOfflineFastvideo(id, arrayHost[i]);
    }

    

}

function chooseHost(video) {
    localStorage.currentEpisode = video.attr("info");

    console.log(video);
    swal({
        title: 'Guarda su',
        html: video.clone().find('[host]').removeClass('hidden'),
        background: 'rgba(0, 0, 0, 1)',
        padding: 30,
        showConfirmButton: false
    });
    //if (window.cordova)
    //    removeLinkOffline(video);
}

var download = false;
//Estrae il video di film/serie tv
function openVideo(host, url, download) {
    swal.closeModal();
    $('#loading').removeClass('hidden');

    setTimeout(function () {
        console.log(url);
        host = host.split('|');

        //Redirect link criptati
        if (host[0] == 'swzz') {
            extractLinkSwzz(url, host[1], download);
        }      
        else if (host[0] == 'vcrypt') {
            extractVcrypt(url, host[1], download);
        }
        //Link in chiaro
        else if (host[0] == 'vidlox')
            vidloxExtract(url, success, error, download);
        else if (host[0] == 'speedvideo')
            speedvideoExtract(url, success, error, download);
        else if (host[0] == 'nowvideo')
            nowvideoExtract(url, success, error, download);
        else if (host[0] == 'vidto')
            vidtoExtract(url, success, error, download);
        else if (host[0] == 'rapidvideo')
            rapidvideoExtract(url, success, error, download);
        else if (host[0] == 'rapidvideocom')
            rapidvideocomExtract(url, success, error, download);
        else if (host[0] == 'flashx')
            flashxExtract(url, success, error, download);
        else if (host[0] == 'openload')
            openloadExtract(url, success, error, download);
        else if (host[0] == 'streaminto')
            streamintoExtract(url, success, error, download);
        else if (host[0] == 'megahd')
            megahdExtract(url, success, error, download);
        else if (host[0] == 'fastvideo')
            fastvideoExtract(url, success, error, download);
    }, 100);
}

function hideLoadingiOs() {
    $('#loading').addClass("hidden");
}


//Riproduce il video
var success = function (url, download) {
    
    console.log(url);
    
    if (download == 0)
        playWithOurPlayer(url);
    else if (download == 1) {
        window.open(url, "_system");
    }
    else if (download == 2) {
        VideoPlayer.play(url);
        markAsSeen();
    }
 /*
    if (device.platform == "iOS") {
        if (url.indexOf("nowvideo") > -1) {
            window.plugins.streamingMedia.playVideo(url);
            $('#loading').addClass("hidden");
        } else
            $('#loading').html("<a style='position:relative; top:30%' href='vlc-x-callback://x-callback-url/stream?url=" + encodeURIComponent(url) + "' onclick='hideLoadingiOs()'><img class='poster play' src='img/play_button.png'></a>");

    } else {
        $('#loading').addClass('hidden');
        if (!download)
            VideoPlayer.play(url);
        else 
            window.open(url, "_system");
    }
    */
    $('#loading').addClass("hidden");
    
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    swal({
        title: "Il link e' offline",
        type: "error",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        background: 'rgba(0, 0, 0, 1)'
    });
}


function playWithOurPlayer(url) {
    if (window.cordova) {
        screen.orientation.lock('landscape');
    }

    $('#playerContainer').removeClass('hidden');
    $("#playerContainer").html('<video id="player" class="video-js" poster="null" style="outline: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);-webkit-appearance: none;"><source id="source" type="video/mp4"></video>');

        var myPlayer = videojs('player', {
            controls: true,
            autoplay: true,
            preload: 'auto',
            fluid: true
        });
        myPlayer.src(url);
        myPlayer.ready(function () {
            $('#player').focus();
            this.hotkeys({
                volumeStep: 0.1,
                seekStep: 30,
                enableModifiersForNumbers: false,
                alwaysCaptureHotkeys: true,
                playPauseKey: function (event, player) {
                    return ((event.which === 179) || (event.which === 13));
                }
            });
        });

        myPlayer.on('loadedmetadata', function () {
            myPlayer.currentTime(getLastTime());
        });
}


