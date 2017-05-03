function goToHome(backBtn) {
    
    if (isChannelListEmpty())
        $("#welcome").removeClass("hidden");
    else
        $('#homeContainer').removeClass('hidden');

    //Nascondo le pagine
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $('#favouritesContainer').addClass('hidden');
    $("#singleLink").addClass("hidden");

    eraseViewMode();
    if (!backBtn)
        $('#bs-example-navbar-collapse-1').collapse('hide');
    redesignView();
    closeNav();
}

function goToSearch() {
    $('#searchResultContainer').html('');
    $('#homeContainer').addClass('hidden');
    $('#viewMovieContainer').addClass('hidden');
    $('#favouritesContainer').addClass('hidden');
    $("#singleLink").addClass("hidden");
    $('#searchContainer').removeClass('hidden');

    eraseViewMode();

    $('#searchForm').addClass('hidden');
    $('#searchType').removeClass('hidden');

    $('#bs-example-navbar-collapse-1').collapse('hide');
    redesignView();
    closeNav();
}

function goToFavourites() {
    

    $('#homeContainer').addClass('hidden');
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $("#singleLink").addClass("hidden");
    $('#favouritesContainer').removeClass('hidden');

    eraseViewMode();

    $('#bs-example-navbar-collapse-1').collapse('hide');
    fillFavourites();
    redesignView();
    closeNav();
}

function eraseViewMode() {
    localStorage.downloadEpisodeInfo = false;
    localStorage.removeItem("currentMovieId");
    localStorage.removeItem("currentEpisode");

    $('#moviePlot').html("");
    $("#locandina").attr("src", "");
    $("#movieTitle").html("");
    $("#movieDetails").css("background", "url('')");
    $('#playButton').html("");
    $('#cast').html("");
    $('#dataValue').html("");
    $('#durataValue').html("");
    $('#votoValue').html("");
    $('#generi').html("");
    $('#produzione').html("");
    $('.listaStagioni').html("");
    $('#loadingLink').removeClass('hidden');
    $('#playButton').addClass('hidden');
    $('#dropDownStagioni').addClass('hidden');
    $('#currentSeason').html("");
    $('#playButton').removeClass('backgroundBlack');
    $('img').imageReloader();

}

var navOpened = false;
function openNav() {
    if (buttonMode)
        $("#mySidenav").removeClass('hidden');
    document.getElementById("mySidenav").style.marginLeft = "0";
    $('.menuItem').attr("tabindex", "2");
    navOpened = true;

}

function closeNav() {
    if (buttonMode)
        $("#mySidenav").addClass('hidden');
    document.getElementById("mySidenav").style.marginLeft = "-250px";
    $('.menuItem').attr("tabindex", "-1");
    navOpened = false;
}


function changeTab(num) {
    switch (num) {
        case 0:
            $('#riepilogo').removeClass('hidden');
            $('#dettagli').addClass('hidden');
            $('#riepilogoButton').addClass('viewButtonActive');
            $('#dettagliButton').removeClass('viewButtonActive');
            break;
        case 1:
            $('#riepilogo').addClass('hidden');
            $('#dettagli').removeClass('hidden');
            $('#riepilogoButton').removeClass('viewButtonActive');
            $('#dettagliButton').addClass('viewButtonActive');
            break;
    }
}

function nextPage(url, isSerieTv, section) {
    console.log(url)
    $('.nextPage' + section).html("<i class=\"fa fa-spinner fa-spin fa-3x\"></i>");
    scrapePage(url, isSerieTv, section, true);
}

$('#search').keypress(function (e) {
    if (e.which == 13) {
        if (window.cordova) {
            Keyboard.hide();
            StatusBar.hide();
        } 
        $('#searchResultContainer').html('');
        $('#loadingSearch').removeClass('hidden');

        $('#searchForm').addClass('hidden');
        $('#searchType').removeClass('hidden');

        search();
        return false;
    }
});

function setSearchType(isSerie) {
    $('#searchResultContainer').html('');
    $('#searchForm').removeClass('hidden');
    $('#searchType').addClass('hidden');
    $('#serieTv').prop('checked', isSerie);

    if (isSerie)
        $('#searchingFor').html("una Serie Tv");
    else
        $('#searchingFor').html("un Film");
}

function showSeason(seasonId) {
    $('.season').addClass('hidden');
    $('#' + seasonId).removeClass('hidden');
}

function redesignView() {
    //Reimposto gli slider della home
    var windowLength = $(window).width();
    if (windowLength >= 1024 && windowLength <= 1350)
        slidePerView = 5;
    if (windowLength >= 1350 && windowLength <= 1700)
        slidePerView = 6;
    if (windowLength >= 1800)
        slidePerView = 8;
    if (windowLength < 1024 && windowLength >= 570)
        slidePerView = 4;
    if (windowLength < 570 && windowLength >= 426)
        slidePerView = 3;
    if (windowLength < 426)
        slidePerView = 3;

    try {
        for (var i = 0; i < slidersHomeArray.length; i++) {
            slidersHomeArray[i].params.slidesPerView = slidePerView;
            slidersHomeArray[i].update();
        }
    } catch (e) {
        console.log("No slide");
    }
    

    //Reimposto la vista view movie
    $('#movieDetails').css('height', $(window).height() + 'px');
    $('#movieDetails').css('width', $(window).width() + 'px');
    $('#sfumato').css('height', $(window).height() + 'px');
    $('#boxInfoContainer').css('height', $(window).height() + 'px');
    $('#viewButtons').css('width', $(window).width() + 'px');

    if ($(window).width() > 700) {
        $('.rightBlockView').css('width', $(window).width() - ($('#boxInfoContainer').outerWidth(true) - $('#boxInfoContainer').outerWidth() + 340 + 30) + 'px')
        $('.rightBlockView').css('height', $(window).height() - 148 + 'px');
        $('#moviePlot').css('height', $(window).height() - 480 + 'px');
        $('#dettagli').css('height', $(window).height() - 480 + 'px');
    }
}
$(window).resize(function () {
    redesignView();
});

function hidePlayer() {
    if (window.cordova) {
        screen.orientation.unlock();
        window.plugins.insomnia.allowSleepAgain();
    }

    $('#playerContainer').addClass('hidden');
    $('#loading').addClass('hidden');

    var player = videojs('player');

    markAsSeen(player.currentTime());

    player.dispose();
}

function goBack() {
    if (!$('#playerContainer').hasClass("hidden")) {
        hidePlayer();
    } else {
        if (!$('#homeContainer').hasClass("hidden")) {
            if(window.cordova)
                navigator.app.exitApp();
        }

        goToHome(true);
        closeNav();
        $('#loading').addClass('hidden');
    }
}

//Eventi cordova
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Gestire gli eventi di sospensione e ripresa di Cordova
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);


        document.addEventListener('chcp_updateLoadFailed', chcp_updateLoadFailedCallback, false);
        function chcp_updateLoadFailedCallback(eventData) {
            console.error("UPDATE FAILED")
            console.log(eventData)
            //var error = eventData.details.error;
            //if (error) {
            //    console.log('Error with code: ' + error.code);
            //    console.log('Description: ' + error.description);
            //}
        }

        document.addEventListener('chcp_nothingToUpdate', chcp_nothingToUpdateCallback, false);
        function chcp_nothingToUpdateCallback(eventData) {
            console.log("nothing to update")
        }

        document.addEventListener('chcp_updateInstallFailed', chcp_updateInstallFailedCallback, false);
        function chcp_updateInstallFailedCallback(eventData) {
            console.log("install failed")
        }
        document.addEventListener('chcp_updateIsReadyToInstall', chcp_updateIsReadyToInstallCallback, false);
        function chcp_updateIsReadyToInstallCallback(eventData) {
            console.log("ready to install")
        }

        document.addEventListener("backbutton", function (e) {
            goBack();

        }, false);

        if(device.platform == "Win32")
            Fullscreen.on();

    };

    function onPause() {
        // TODO: questa applicazione è stata sospesa. Salvarne lo stato qui.
    };

    function onResume() {
        // TODO: questa applicazione è stata riattivata. Ripristinarne lo stato qui.
    };
})();

