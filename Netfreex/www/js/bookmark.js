function markAsSeen() {
    if (localStorage.currentMovieId) {
        var bookmarks = {};

        if (localStorage.bookmarks)
            bookmarks = JSON.parse(localStorage.bookmarks);

        if (bookmarks[localStorage.currentMovieId]) {
            if (!bookmarks[localStorage.currentMovieId][localStorage.currentEpisode]) {
                $("i[info='" + localStorage.currentEpisode + "']").removeClass("hidden");
                bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = true;
            }
         
        } else {
            bookmarks[localStorage.currentMovieId] = {}
            bookmarks[localStorage.currentMovieId][localStorage.currentEpisode] = true;
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