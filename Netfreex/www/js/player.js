function playWithOurPlayer(url) {

    if (window.cordova) {
        screen.orientation.lock('landscape');
        window.plugins.insomnia.keepAwake();
    }

    setTimeout(function() {

        $('#playerContainer').removeClass('hidden');
        $("#playerContainer").html('<video id="player" class="video-js" poster="null" style="outline: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);-webkit-appearance: none;">' +
            '<source type="video/mp4"><source type="audio/mp4; codecs=mp4a.40.2"></video>');

        var myPlayer = videojs('player', {
            controls: true,
            autoplay: true,
            preload: 'auto',
            fluid: true
        });

        if (url.indexOf('.m3u8') == -1) {
            myPlayer.src(url);
        } else {
            myPlayer.src({
                src: url,
                type: 'application/x-mpegURL',
                withCredentials: true
            });
        }
        myPlayer.ready(function () {
            $('#player').focus();
            this.hotkeys({
                volumeStep: 0.1,
                seekStep: 30,
                enableModifiersForNumbers: false,
                alwaysCaptureHotkeys: true,
                playPauseKey: function (event, player) {
                    return ((event.which === 179) || (event.which === 13));
                }
            });

            $('.vjs-modal-dialog').on('click', function () {
                markAsSeen(myPlayer.currentTime());
                myPlayer.dispose();
                playWithOurPlayer(url);
            });
        });

        myPlayer.on('error', function () {
            markAsSeen(myPlayer.currentTime());
            myPlayer.dispose();
            playWithOurPlayer(url);
        });

        myPlayer.on('ended', function () {
            markAsSeen(0);
            if (window.cordova && device.platform != "iOS")
                hidePlayer();
        });

        myPlayer.on('loadedmetadata', function () {
            myPlayer.currentTime(getLastTime());


        });

        var btna = addNewButton({
            player: myPlayer,
            icon: "fa-remove",
            id: "closePlayer"
        });
        btna.onclick = function () {
            hidePlayer();
        };

        setPlayerDimension();
        $(window).on("resize", function () {
            setPlayerDimension();
        });

    }, 500);
    

    

}


function setPlayerDimension() {
    var shorter = $(window).height() < $(window).width() ? $(window).height() : $(window).width();
    //if (window.cordova) {
    //    if (device.platform == "Win32") {
    //        $("#player").height("0px");
    //        $("#player").css("margin", "0");
    //    }
    //} else {
    //    $("#player").height(shorter + "px");
    //}
    $("#playerContainer").height(shorter + "px");
    $("#player").height(shorter + "px");
    $(".vjs-tech").height(shorter + "px");
}

function addNewButton(data) {

    var pl = data.player,
        newElement = document.createElement('div'),
        newLink = document.createElement('a');

    newElement.id = data.id;
    newElement.className = 'closeBtnPlayer vjs-control';

    newLink.innerHTML = "<i class='fa " + data.icon + " line-height' aria-hidden='true'></i>";
    newElement.appendChild(newLink);
    $(newElement).insertAfter('.vjs-fullscreen-control');
    return newElement;

}