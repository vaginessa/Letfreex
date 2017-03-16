function openloadExtract(id, success, error) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("https://openload.co/f/" + id , {}, {}, function (response) {
        console.log(response);

        try {

            var content = response.data.split('<script type="text/javascript">ﾟωﾟ')[1].split(";var")[0];
            content = "ﾟωﾟ" + content + ";";

            var var_r = aadecode(content).split("window.r='")[1].split("';")[0];

            var encode = response.data.split('<span id="' + var_r + '">')[1].split("</span>")[0];

            var text_decode = [];

            var idx1 = Math.max(2, encode[0].charCodeAt(0) - 53);
            var idx2 = Math.min(idx1, encode.length - 18);
            var idx3 = encode.substring(idx2, idx2 + 20);
            var decode1 = [];

            for (var i = 0; i < idx3.length; i = i + 2) {
                decode1.push(parseInt(idx3.substring(i, i + 2), 16));
            }
            var idx4 = encode.substring(0, idx2) + encode.substring(idx2 + 20, encode.length);

            for (var i = 0; i < idx4.length; i = i + 3) {
                var data;
                if (i / 3 % 3 == 0) 
                    data = parseInt(idx4.substring(i, i + 3), 8);
                else
                    data = parseInt(idx4.substring(i, i + 3), 16);

                var value = data ^ 47 ^ decode1[(i / 3) % 10];
                text_decode.push(String.fromCharCode(value));
            }
            text_decode = text_decode.join("");

            var url = "https://openload.co/stream/" + text_decode + "?mime=true";

            success(url);
        } catch (ex) {
            error(ex);
        }
    }, function (response) {
        error(response);
    });
}

function aadecode(text) {
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