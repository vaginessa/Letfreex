function openloadExtract(id, success, error, download) {
    $.ajax({
        url: "https://openload.co/f/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            try {

                //Main script
                var script = response.split('<script type="text/javascript">ﾟωﾟ')[1].split("}})")[0];

                //ContentDiv for the url
                var divContent = response.split('<div style="display:none;">')[1].split("</div>")[0];
                $("#openloadDecode").html(divContent);

                script = "ﾟωﾟ" + script + "}})";

                eval(script);

                var url = "https://openload.co/stream/" + $("#streamurl").html() + "?mime=true";

                success(url, download);
            } catch (ex) {
                error(ex);
            }
        },
        error: function (e) {
            error(e);
        }
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

function removeLinkOfflineOpenload(id, link) {
    $.ajax({
        url: "https://openload.co/f/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.indexOf("got deleted") > -1 || response.indexOf(".rar") > -1) {
                link.remove();
                if ($('div[host]:visible').length == 0) {
                    $("#modalContentId").html(nessunLinkDisponibile);
                }
            };
        },
        error: function (e) {
            console.error(e);
        }
    });
}