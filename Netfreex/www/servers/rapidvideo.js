function rapidvideoExtract(id, success, error, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("http://www.rapidvideo.cool/embed-" + id + "-607x360.html", {}, {}, function (response) {
        console.log(response);

        try {
            var content = response.data.split("eval(function")[1].split("</script>")[0];
            content = "eval(function" + content;

            //UNPACK
            var url = unpack(content);

            success(url, download);
        } catch (e) {
            error(e);
        }
        

    }, function (response) {
        error(response);
    });
}

function removeLinkOfflineRapidvideo(id, link) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.get("http://www.rapidvideo.cool/" + id, {}, {}, function (response) {
        if (response.data.indexOf("Not Found") != -1) {
            link.remove()
            if ($('div[host]:visible').length == 0) {
                $("#modalContentId").html(nessunLinkDisponibile);
            }
        }
    }, function (response) {
        console.log(response);
    });
}