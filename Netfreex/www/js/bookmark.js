function markAsSeen(time) {
    if (localStorage.currentMovieId) {
        var bookmarks = {};

        if (localStorage.bookmarks)
            bookmarks = JSON.parse(localStorage.bookmarks);

        if (bookmarks[localStorage.currentMovieId]) {

            //Se è una serie tv
            if (localStorage.currentEpisode != "undefined") {
                if (!bookmarks[localStorage.currentMovieId][localStorage.currentEpisode]) {
                    $("i[info='" + localStorage.currentEpisode + "']").removeClass("hidden");
                    if (time)
                        bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = time;
                    else
                        bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = true;
                } else {
                    if (time)
                        bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = time;
                    else
                        bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = true;
                }

            } else {
                //Se è un film
                if (time)
                    bookmarks[localStorage.currentMovieId] = time;
                else
                    bookmarks[localStorage.currentMovieId]= true;
            }
         
        } else {
            bookmarks[localStorage.currentMovieId] = {}

            if (localStorage.currentEpisode) {
                if (time)
                    bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = time;
                else
                    bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = true;
            } else {
                if (time)
                    bookmarks[localStorage.currentMovieId] = time;
                else
                    bookmarks[localStorage.currentMovieId] = true;
            }

            $("i[info='" + localStorage.currentEpisode + "']").removeClass("hidden");
        }

        localStorage.bookmarks = JSON.stringify(bookmarks);
    }   
}

function markAllAsUnseen() {
    if (localStorage.currentMovieId) {
        var bookmarks = {};

        if (localStorage.bookmarks)
            bookmarks = JSON.parse(localStorage.bookmarks);

        if (bookmarks[localStorage.currentMovieId]) {
            
            bookmarks[localStorage.currentMovieId] = {}
            $(".seenIcon").addClass("hidden");
        } 

        localStorage.bookmarks = JSON.stringify(bookmarks);
    }
}

function isAlreadySeen(episode) {
    if (localStorage.currentMovieId) {
        var bookmarks = {};

        if (localStorage.bookmarks)
            bookmarks = JSON.parse(localStorage.bookmarks);
        if (bookmarks[localStorage.currentMovieId]) {
            if (bookmarks[localStorage.currentMovieId][episode])
                return true; 
        }
    }
    return false;
}

function getLastTime() {
    if (localStorage.currentMovieId) {
        var bookmarks = {};

        if (localStorage.bookmarks)
            bookmarks = JSON.parse(localStorage.bookmarks);
        if (bookmarks[localStorage.currentMovieId]) {

            if (localStorage.currentEpisode != "undefined") {

                var info = bookmarks[localStorage.currentMovieId][localStorage.currentEpisode];
                if (typeof (info) === "boolean") {
                    return 0;
                } else {
                    return parseInt(info);
                }

            } else {
                var infoFilm = bookmarks[localStorage.currentMovieId];
                if (typeof (infoFilm) === "boolean") {
                    return 0;
                } else {
                    return parseInt(infoFilm);
                }
            }
        }
        return 0;
    }
}