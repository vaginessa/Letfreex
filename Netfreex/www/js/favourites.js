function addToFavourites(url, title, img, isSerieTv) {
    var elem = {
        url: url,
        channel: $('#channelName').text(),
        title: title,
        img: img,
        isSerieTv: isSerieTv
    }

    var preferiti = [];
    if (localStorage.favourites) {
        preferiti = JSON.parse(localStorage.favourites);
    }

    preferiti.push(elem);

    localStorage.favourites = JSON.stringify(preferiti);
    
    $('#addToFavourites').html('<div tabindex="0" onclick="removeFromFavourites(\'' + url + '\', \'' + title + '\',\'' + img + '\',\'' + isSerieTv + '\')"><i class="fa fa-star colorOrange"></i> Rimuovi dai preferiti</div>');
}

function removeFromFavourites(url, title, img, isSerieTv) {
    var preferiti = [];
    if (localStorage.favourites) {
        preferiti = JSON.parse(localStorage.favourites);
    }
    for (var i = preferiti.length - 1; i >= 0; i--) {
        if (preferiti[i].url == url) preferiti.splice(i, 1);
    }

    localStorage.favourites = JSON.stringify(preferiti);


    $('#addToFavourites').html('<div tabindex="0" onclick="addToFavourites(\'' + url + '\', \'' + title + '\',\'' + img + '\',\'' + isSerieTv + '\')"><i class="fa fa-star-o colorOrange"></i> Aggiungi ai preferiti</div>');
}

function isInFavourites(url) {
    var preferiti = [];
    if (localStorage.favourites) {
        preferiti = JSON.parse(localStorage.favourites);
    }
    for (var i = 0; i < preferiti.length; i++) {
        if (preferiti[i].url == url)
            return true;
    }
    return false;
}

function fillFavourites() {
    if (localStorage.favourites) {
        var preferiti = JSON.parse(localStorage.favourites);
        $('#favouritesResultContainer').html("");
        arrayFilm = [];
        for (var i = 0; i < preferiti.length; i = i + 1) {
            var movie = {
                title: preferiti[i].title,
                img: preferiti[i].img,
                url: preferiti[i].url,
                isSerieTv: preferiti[i].isSerieTv,
                carousel: "false"
            };
            if ($('#channelName').text() == preferiti[i].channel)
                arrayFilm.push(movie);
        }
        if (arrayFilm.length > 0)
            printPage(true, "favouritesResultContainer", true, false);
    }
}