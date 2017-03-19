﻿function rapidvideocomExtract(id, success, error) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("https://www.rapidvideo.com/?v=" + id , {}, {}, function (response) {
        console.log(response);

        var content = response.data.split('"sources":')[1].split(' ,"displaydescription"')[0];
        content = '{"sources":' + content + '}';

        var links = JSON.parse(content)["sources"];

        var maxRes = links[0];
        for (var i = 0; i < links.length; i++) {
            if (parseInt(links[i]["res"]) > maxRes["res"])
                maxRes = links[i];
        }

        var url = maxRes["file"];

        success(url);

    }, function (response) {
        error(response);
    });
}