var currentVersion;
//Eventi cordova
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {        
        //cordova.getAppVersion.getVersionNumber(function (version) {
        //    currentVersion = version;
        //    checkLastVersion();
        //});

    };
})();


function checkLastVersion() {
    $.getJSON("https://raw.githubusercontent.com/Be4t5/Netfreex/master/version.json",
     function (data) {
         if (data.version > currentVersion) {
             updateVersion();
         }
     }
   );
}

function updateVersion() {
    console.log("update");
    var fileTransfer = new FileTransfer();

 

   
            fileTransfer.download(
                "https://github.com/Be4t5/Netfreex/raw/master/Netfreex.apk",
                cordova.file.externalCacheDirectory + "Netfreex.apk",
                function(theFile) {
                    console.log("download complete: " + theFile.toURL());
                    cordova.plugins.fileOpener2.open(
                        cordova.file.externalCacheDirectory + "Netfreex.apk",
                        'application/vnd.android.package-archive'
                    );
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code: " + error.code);
                }
            )
     
  
}
