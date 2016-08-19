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

    setTimeout(function () {
        console.log(url);
        host = host.split('|');

        if (host[0] == 'swzz')
            extractLinkSwzz("http://swzz.xyz/link/" + url + "/", host[1]);

        else if (host[0] == 'italiaFilmLinks') {
            if (host[1] == 'openload')
                italiaFilmLinks.extract(url + "?host=2", success, error);
            if (host[1] == 'videomega')
                italiaFilmLinks.extract(url + "?host=1", success, error);
        }

        else if (host[0] == 'nowvideo')
            nowvideo.extract(url, success, error);

        else if (host[0] == 'rapidvideo')
            rapidvideo.extract(url, success, error);

        else if (host[0] == 'flashx')
            flashx.extract(url, success, error);

        else if (host[0] == 'openload')
            openload.extract(url, success, error);

        else if (host[0] == 'streaminto')
            streaminto.extract(url, success, error);

        else if (host[0] == 'videomega')
            videomega.extract(url, success, error);
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
   
    //Unpack packed url (flashx)
    if (url.indexOf("eval") > -1) {
        url = unpack(url);
    }

    //Decode url Openload
    if (url.indexOf('openload') > -1) {
        url = decodeOpenload(url.replace("openload|", ""));
    }

    VideoPlayer.play(url);
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    alert("Il link e' offline");
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
    try{
        c = c.split('file:"')[1].split('"')[0];
    }
    catch (e) {
        c = c.split('src","')[1].split('"')[0];
    }
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

function decodeOpenload(x) {
    x = $("<textarea/>").html(x).text();
    var s = [];
    for (var i = 0; i < x.length; i++) {
        var j = x.charCodeAt(i);
        if ((j >= 33) && (j <= 126)) {
            s[i] = String.fromCharCode(33 + ((j + 14) % 94));
        }
        else {
            s[i] = String.fromCharCode(j);
        }
    }
    var url = "https://openload.co/stream/" + s.join("") + "?mime=true";
    console.log(url)
    return url;
}


