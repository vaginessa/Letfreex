function vidtoExtract(id, success, error, download) {
    $.ajax({
        url: "http://vidto.me/embed-" + id + "-640x360.html",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            console.log(response);
            try {
                var url = response.split('hq="')[1].split('"')[0];
                success(url, download);
            } catch (e) {
                try {
                    var url = response.split('normal="')[1].split('"')[0];
                    success(url, download);
                } catch (e) {
                    error(e);
                }
            }
        },
        error: function (e) {
            error(e);
        }
    });
}

function removeLinkOfflineVidTo(id, link) {
    $.ajax({
        url: "http://vidto.me/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.indexOf("Not Found") != -1) {
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