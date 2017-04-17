function fastvideoExtract(id, success, error, download) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("http://www.fastvideo.me/embed-" + id + "-607x360.html", {}, {}, function (response) {
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