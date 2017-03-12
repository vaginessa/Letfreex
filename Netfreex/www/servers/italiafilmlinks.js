function italiafilmLinksExtract(id, success, error) {
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.setHeader("Referer", "http://www.italia-film.gratis");

    cordovaHTTP.get("http://hdlink.video/l/" + id + "?host=1", {}, {}, function (response) {
        console.log(response);
        var html = response.data;

        var urlPost = html.split('<form action="')[1].split('"')[0];
        var token = html.split('name="_token" value="')[1].split('"')[0];
        cordovaHTTP.post(urlPost, {
            _token: token
        }, {}, function (response) {
            html = response.data;
        }, function (response) {
            error(response);
        });

        success(url);

    }, function (response) {
        error(response);
    });
}