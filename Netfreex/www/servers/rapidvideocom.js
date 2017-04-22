function rapidvideocomExtract(id, success, error, download) {
    $.ajax({
        url: "https://www.rapidvideo.com/?v=" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            try {
                var content = response.split('"sources":')[1].split('}); playerInstance')[0];
                content = '{"sources":' + content + '}';

                var links = JSON.parse(content)["sources"];

                var maxRes = links[0];
                for (var i = 0; i < links.length; i++) {
                    if (parseInt(links[i]["res"]) > maxRes["res"])
                        maxRes = links[i];
                }

                var url = maxRes["file"];

                success(url, download);
            } catch (e) {
                error(e);
            }
        },
        error: function (e) {
            $.ajax({
                url: "https://www.raptu.com/?v=" + id,
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
                },
                success: function (response) {
                    try {
                        var content = response.split('"sources":')[1].split(' ,"displaydescription"')[0];
                        content = '{"sources":' + content + '}';

                        var links = JSON.parse(content)["sources"];

                        var maxRes = links[0];
                        for (var i = 0; i < links.length; i++) {
                            if (parseInt(links[i]["res"]) > maxRes["res"])
                                maxRes = links[i];
                        }

                        var url = maxRes["file"];

                        success(url, download);
                    } catch (e) {
                        error(e);
                    }
                },
                error: function (e) {
                    error(e);
                }
            });
        }
    });

}

function removeLinkOfflineRapidvideoCom(id, link) {
    $.ajax({
        url: "https://www.rapidvideo.com/?v=" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.indexOf("got deleted") != -1) {
                link.remove()
                if ($('div[host]:visible').length == 0) {
                    $("#modalContentId").html(nessunLinkDisponibile);
                }
            }
        },
        error: function (e) {
            $.ajax({
                url: "https://www.raptu.com/?v=" + id,
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
                },
                success: function (response) {
                    if (response.indexOf("got deleted") != -1) {
                        link.remove();
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
    });
}