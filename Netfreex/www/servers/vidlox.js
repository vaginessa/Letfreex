function vidloxExtract(id, success, error, download) {
    $.ajax({
        url: "https://vidlox.tv/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            console.log(response);
            try {
                var patt = new RegExp('.m3u8", ?"([^"]+)"', 'gi');
                var url = "";
                var found = false;
                while (matches = patt.exec(response)) {
                    url = matches[1];
                    found = true;
                }
                if (found)
                    success(url, download);
                else
                    error("Not found");
            } catch (e) {
                error("Not found");
            }
        },
        error: function (e) {
            error(e);
        }
    });
}

function removeLinkOfflineVidLox(id, link) {
    $.ajax({
        url: "https://vidlox.tv/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.indexOf("Not Found") != -1) {
                link.remove()
                if ($('div[host]:visible').length == 0) {
                    $("#modalContentId").html(nessunLinkDisponibile);
                }
            }
        },
        error: function (e) {
            console.error(e);
        }
    });
}