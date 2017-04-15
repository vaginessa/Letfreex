function streamintoExtract(id, success, error, download) {
    cordovaHTTP.headers =[];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("http://streamin.to/embed-" + id + "-640x360.html", {}, {}, function (response) {
        console.log(response);

        if (response.data == "File was deleted")
            error("File was deleted");

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