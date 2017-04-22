function rapidvideoExtract(id, success, error, download) {
    $.ajax({
        url: "http://www.rapidvideo.cool/embed-" + id + "-607x360.html",
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

function removeLinkOfflineRapidvideo(id, link) {
    $.ajax({
        url: "http://www.rapidvideo.cool/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.data.indexOf("Not Found") != -1) {
                link.remove()
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