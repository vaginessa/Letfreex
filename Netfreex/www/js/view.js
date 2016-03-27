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
    })
}

//Estrae il video di film/serie tv
function openVideo(host, url) {
    swal.closeModal();

    $('#loading').removeClass('hidden');
    console.log(url);


    host = host.split('|');

    if (host[0] == 'swzz')
        extractLinkCineblog("http://swzz.xyz/link/" + url + "/", host[1]);
    else if (host[0] == 'nowvideo')
        nowvideo.extract(url, success, error);
    else if (host[0] == 'rapidvideo')
        rapidvideo.extract(url, success, error);
    else if (host[0] == 'flashx')
        flashx.extract(url, success, error);
}

//Riproduce il video
var success = function (url) {
    $('#loading').addClass('hidden');
    console.log(url);
    try {
        if (url.split("(")[0] == "eval") {
            url = unpack(url);
        }
    } catch (e) {
        error(e);
    }
    VideoPlayer.play(url);
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    alert("Il link è offline");
}

function unpack(p) {
    var c = p;
    var a = 5, x = 1;
    while (x < a) {
        c = unescape(c);
        if (/eval\(+function\(/.test(c)) {
            c = depack(c);
            x++;
        } else { break }
    };
    c = unescape(c);

    c = c.split('file:"')[1].split('"')[0];

    return c;
}
function depack(p) {
     if (p != "") {
         c = unescape(p);
         var _e = eval, s = "eval=function(v){c=v;};" + c + ";eval=_e;";
         eval(s);
     } else { c = p };

    return c;
}

