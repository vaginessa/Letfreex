function openloadExtract(id, success, error) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("https://openload.co/f/" + id , {}, {}, function (response) {
        console.log(response);

        try {

            //Main script
            var script = response.data.split('<script type="text/javascript">ﾟωﾟ')[1].split("}})")[0];

            //ContentDiv for the url
            var divContent = response.data.split('<div style="display:none;">')[1].split("</div>")[0];
            $("#openloadDecode").html(divContent);

            script = "ﾟωﾟ" + script + "}})";

            eval(script);

            var url = "https://openload.co/stream/" + $("#streamurl").html() + "?mime=true";

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