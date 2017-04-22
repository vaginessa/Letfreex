function megahdExtract(id, success, error, download) {
    id = id.replace('embed-', '');
    $.ajax({
        url: "http://www.megahd.tv/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            console.log(response);

            try {
                var content = response.split("eval(function")[1].split("</script>")[0];
                content = "eval(function" + content;

                //UNPACK
                var url = unpack(content);

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

function removeLinkOfflineMegahd(id, link) {
    return true;
    //cordovaHTTP.headers = [];
    //cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    //cordovaHTTP.get("http://www.fastvideo.me/" + id, {}, {}, function (response) {
    //    return response.data.indexOf("Not Found") == -1;
    //}, function (response) {
    //    return false;
    //});
}
