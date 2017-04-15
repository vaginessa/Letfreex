function vidloxExtract(id, success, error, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    
    cordovaHTTP.get("https://vidlox.tv/" + id, {}, {}, function (response) {
        console.log(response);

        try {
            var patt = new RegExp('.m3u8", ?"([^"]+)"', 'gi');
            var url = "";
            var found = false;
            while (matches = patt.exec(response.data)) {
                url = matches[1];
                found = true;
            }
            if(found)
                success(url, download);
            else
                error("Not found");
        } catch (e) {
            error("Not found");
        }

    }, function (response) {
        error(response);
    });
}