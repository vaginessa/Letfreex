function streamintoExtract(id, success, error, download) {
    $.ajax({
        url: "http://streamin.to/embed-" + id + "-640x360.html",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response == "File was deleted")
                error("File was deleted");

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

function removeLinkOfflineStreaminTo(id,link) {
    $.ajax({
        url: "http://streamin.to/" + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
        },
        success: function (response) {
            if (response.indexOf("File Deleted") != -1) {
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