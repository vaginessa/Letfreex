function playByUrl() {
    $("#singleLink").html("");
    $("#singleLink").removeClass("hidden");
    $("#welcome").addClass("hidden");
    $('#bs-example-navbar-collapse-1').collapse('hide');

    swal({
        background: 'rgba(0, 0, 0, 1)',
        title: 'Inserisci l\'indirizzo del video',
        input: 'text',
        showCancelButton: true,
        animation: false,
        //customClass: 'top-60',
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        allowOutsideClick: false,
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                if (value == "")
                    reject();

                resolve();
            });
        }
    }).then(function (result) {
        closeNav();
        manageSingleLink(result);
    }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
            goToHome();
        }
    });
    setTimeout(function () {
        $('.dropdown-toggle').html('<span id="menuDropDownLabel" >Gestione canali </span><span class="caret"></span>');
    }, 1);
}

function manageSingleLink(html) {
    var trovato = false;
    for (var i = 0; i < movieOneLinkHosts.length; i++) {
        var patt = new RegExp(movieOneLinkHosts[i].regex, 'gi');

        var host = movieOneLinkHosts[i].host.split('|')[1];

        if (!host)
            host = movieOneLinkHosts[i].host;

        while (res = patt.exec(html)) {
            console.log('trovato ' + res[1]);
            var link = "<div class=\"guarda singleLinkPlay\"  >" +
                            "<img class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />" +
                            "<div  class=\"hidden marginBottom10\" host >" +
                            "<img tabindex='0' onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 0)\" width=\"200\" src=\"img/host/" + host + ".png\">" +
                            "<i tabindex='0' class=\"fa fa-download\" aria-hidden=\"true\" onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 1)\"></i>" +
                            "<img tabindex='0' onclick=\"openVideo('" + movieOneLinkHosts[i].host + "','" + res[1] + "', 2)\" class=\"castIcon\" src=\"img/cast.png\">" +
                            "</div>";
            $('#singleLink').html($('#singleLink').html() + link + "</div>");
            trovato = true;
        }
    }
    if (!trovato)
        $("#singleLink").html("Nessun video trovato al link " + html);
}
