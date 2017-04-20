function vidtoExtract(id, success, error, download) {

    var page_url = "http://vidto.me/embed-" + id + "-640x360.html";

    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get(page_url, {}, {}, function(response) {
        console.log(response);
        //try {
        //    var content = response.data;

        //    var fname = content.split("fname\" value=\"")[1].split("\"")[0];
        //    var hash = content.split("hash\" value=\"")[1].split("\"")[0];

        //    setTimeout(function() {
        //        doPostRequest(id, fname, hash);
        //    }, 6000);
        //} catch (ex) {
        //    error(ex);
        //}
        
        try {
            var url = response.data.split('sources: [{file:"')[1].split('",label:"360p"')[0];
            if (url == "")
                url = response.data.split(',{file:"')[1].split('",label:"240p"')[0];

            success(url, download);
        } catch (e) {
            error(e);
        }

    }, function(response) {
        error(response);
    });
    
    //function doPostRequest(id, fname, hash) {
    //    cordovaHTTP.setHeader("Content-Type", "application/x-www-form-urlencoded");
    //    cordovaHTTP.post("http://vidto.me/" + id + ".html", {
    //        op: "download1",
    //        usr_login: "",
    //        id: id,
    //        fname: fname,
    //        referer: "",
    //        hash: hash,
    //        imhuman: "Proceed+to+video"
    //    }, {}, function (response) {
    //        try {
    //            var url = response.data.split('sources: [{file:"')[1].split('",label:"360p"')[0];
    //            if (url == "")
    //                url = response.data.split(',{file:"')[1].split('",label:"240p"')[0];

    //            success(url, download);
    //        } catch (e) {
    //            error(e);
    //        }
    //    }, function (response) {
    //        error(response);
    //    });
    //}


}

function removeLinkOfflineVidTo(id, link) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    cordovaHTTP.get("http://vidto.me/" + id, {}, {}, function (response) {
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