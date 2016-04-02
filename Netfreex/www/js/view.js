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
        extractLinkSwzz("http://swzz.xyz/link/" + url + "/", host[1]);

    else if (host[0] == 'italiaFilmLinks')
        italiaFilmLinks.extract(url, success, error);

    else if (host[0] == 'nowvideo')
        nowvideo.extract(url, success, error);

    else if (host[0] == 'rapidvideo')
        rapidvideo.extract(url, success, error);

    else if (host[0] == 'flashx')
        flashx.extract(url, success, error);

    else if (host[0] == 'openload')
        openload.extract(url, success, error);

}

//Riproduce il video
var success = function (url) {
    $('#loading').addClass('hidden');
    console.log(url);
 
    //Apri link openload estratto da italiaFilmLinks
    if (url.indexOf("italiaFilmLinks") > -1) {
        openVideo('openload', url.split('|')[1]);
        return;
    }
   
    //Unpack packed url (flashx)
    if (url.indexOf("eval") > -1) {
        url = unpack(url);
    }

    //Decode url Openload
    if (url.indexOf('openload') > -1) {
        url = decodeOpenload(url.split('|')[1]);
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

function decodeOpenload(decodestring) {

    function decode(text) {
        var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
        var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
        var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
        var decodePostamble = ") ());";

        // strip beginning/ending space.
        text = text.replace(/^\s*/, "").replace(/\s*$/, "");

        // returns empty text for empty input.
        if (/^\s*$/.test(text)) {
            return "";
        }
        // check if it is encoded.
        if (text.lastIndexOf(evalPreamble) < 0) {
            throw new Error("Given code is not encoded as aaencode.");
        }
        if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
            throw new Error("Given code is not encoded as aaencode.");
        }

        var decodingScript = text.replace(evalPreamble, decodePreamble)
								 .replace(evalPostamble, decodePostamble);
        return eval(decodingScript);
    }

    decodestring = decode(decodestring);

    if (decodestring.indexOf('toString') > -1) {
        var baseRegex = "toString\\(a\\+(\\d+)"
        var basePattern = new RegExp(baseRegex, 'gi');
        var base;
        while (res = basePattern.exec(decodestring)) {
            base = res[1];
        }

        var numsRegex = "(\\d+), ?(\\d+)"
        var numsPattern = new RegExp(numsRegex, 'gi');
        var nums = [];

        while (res = numsPattern.exec(decodestring)) {
            nums.push(res)
        }

        for (var i = 0; i < nums.length; i++) {
            var base2 = parseInt(base) + parseInt(nums[i][1]);
            var rep12 = (parseInt(nums[i][2])).toString(base2);
            decodestring = decodestring.replace("(" + nums[i][0] + ")", rep12);
        }

        decodestring = decodestring.replace(/[^a-zA-Z0-9\/\.:-_@}]/gi, "");

        var url = "http" + decodestring.split('http')[1].split('}')[0];

        console.log(url);

        return url;

    }
}


