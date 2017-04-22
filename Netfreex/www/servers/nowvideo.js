function nowvideoExtract(id, success, error, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("http://embed.nowvideo.sx/embed/?v=" + id, {}, {}, function (response) {
        console.log(response);

        var patt = new RegExp('<source src="([^<]+)"', 'gi');
        var url = "";
        var found = false;
        while (matches = patt.exec(response.data)) {
            url = matches[1];
            found = true;
        }


        try {
            if (!found) {
                url = response.data.split("src: '")[1].split("',")[0];
                url = url.split("dash/")[1].split("/")[0],
                url = "http://www.nowvideo.sx/download.php?file=mm" + url + ".mp4";
                found = true;
            }
        } catch (e) {
        }

        if (found)
            success(url, download);
        else
            error("Not found");

    }, function (response) {
        error(response);
    });
}

function removeLinkOfflineNowvideo(id, link) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.get("http://www.nowvideo.sx/video/" + id, {}, {}, function (response) {
        if (response.data.indexOf("no longer exists") != -1) {
            link.remove()
            if ($('div[host]:visible').length == 0) {
                $("#modalContentId").html(nessunLinkDisponibile);
            }
        }
    }, function (response) {
        console.log(response);
    });
}


//function nowvideoExtract(id, success, error, download) {
//    $.ajax({
//        url: "http://embed.nowvideo.sx/embed/?v=" + id,
//        type: "GET",
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//        },
//        success: function (response) {
//            console.log(response);

//            var patt = new RegExp('<source src="([^<]+)"', 'gi');
//            var url = "";
//            var found = false;
//            while (matches = patt.exec(response)) {
//                url = matches[1];
//                found = true;
//            }

//            try {
//                if (!found) {
//                    url = response.split("src: '")[1].split("',")[0];
//                    url = url.split("dash/")[1].split("/")[0],
//                    url = "http://www.nowvideo.sx/download.php?file=mm" + url + ".mp4";
//                    found = true;
//                }
//            } catch (e) {
//            }

//            if (found)
//                success(url, download);
//            else
//                error("Not found");
//        },
//        error: function (e) {
//            error(e);
//        }
//    });

//}

//function removeLinkOfflineNowvideo(id, link) {
//    $.ajax({
//        url: "http://www.nowvideo.sx/video/" + id,
//        type: "GET",
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//        },
//        success: function (response) {
//            if (response.indexOf("no longer exists") != -1) {
//                link.remove()
//                if ($('div[host]:visible').length == 0) {
//                    $("#modalContentId").html(nessunLinkDisponibile);
//                }
//            }
//        },
//        error: function (e) {
//            console.log(e);
//        }
//    });
//}