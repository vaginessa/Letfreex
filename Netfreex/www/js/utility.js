function getURLParameters(paramName) {
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0) {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i < arrURLParams.length; i++) {
            var sParam = arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i = 0; i < arrURLParams.length; i++) {
            if (arrParamNames[i] == paramName) {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return null;
    }
}

function truncate(string) {
    var limit = 1000;
    if ($(window).width() < 768)
        limit = 400;
    if (string.length > limit)
        return string.substring(0, limit) + '...';
    else
        return string;
};

function changeBG() {
    $('#bs-example-navbar-collapse-1').css("background-color", "rgba(0, 0, 0, 0.79)");
}

function isEmpty(el) {
    return !$.trim(el.html())
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function sortBy(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortStagioni(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function (a, b) {
        return parseInt(a.key.split(' ')[1]) - parseInt(b.key.split(' ')[1]);
    });
    return arr; // returns array
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

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
    try {
        c = c.split('file:"')[1].split('"')[0];
    }
    catch (e) {
        try {
            c = c.split('src","')[1].split('"')[0];
        } catch (ex) {
            c = c.split('file:\'')[1].split('\'')[0];
        }

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

//HTTP GET
function get(url, success, error) {
    if (cineblog != true) {

        $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
            "q=select%20*%20from%20html%20where%20url%3D%22" +
            encodeURIComponent(url) +
            "%22&format=xml'&callback=?",
            function (data) {
                if (data.results[0]) {
                    success(data.results[0]);
                }
            }, function (er) {
                error(er);
            }
        );
    } else {
       
        if (localStorage.expirationCF && localStorage.cookieCFCB.indexOf("cf_clearance") > -1) {
            if (new Date(localStorage.expirationCF).getTime() < new Date().getTime()) {
                getCookieCF(function() {
                    doGetCB(url, success, error);
                });
            } else {
                doGetCB(url, success, error);
            }
                
        } else {
            getCookieCF(function () {
                doGetCB(url, success, error);
            });
        }

    }
}

function doGetCB(url, success, error) {
    if (localStorage.cookieCFCB) {
        cordovaHTTP.headers = [];
        cordovaHTTP.setHeader("User-Agent", navigator.userAgent);
        cordovaHTTP.setHeader("Cookie", localStorage.cookieCFCB);
    }

    cordovaHTTP.get(url, {}, {}, function (response) {
        $("#loading").addClass("hidden");
        success(response.data);
    }, function (response) {
        $("#loading").addClass("hidden");
        $("#error").removeClass("hidden");
        error(response);
    });
}
