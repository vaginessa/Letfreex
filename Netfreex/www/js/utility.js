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