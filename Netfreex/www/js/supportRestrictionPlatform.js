function isHostSupported(host) {

    if (window.cordova) {
        if (device.platform == "Win32") {
            for (var i = 0; i < windowsNotSupported.length; i++) {
                if (windowsNotSupported[i] == host)
                    return false;
            }
        }
    }
    return true;

}

function isChannelSupported(channel) {

    if (window.cordova) {
        if (device.platform == "Win32") {
            for (var i = 0; i < windowsNotSupportedChannel.length; i++) {
                if (channel.indexOf(windowsNotSupportedChannel[i]) > -1)
                    return false;
            }
        }
    }
    if (window.cordova) {
        if (device.platform == "iOS") {
            for (var i = 0; i < iosNotSupportedChannel.length; i++) {
                if (channel.indexOf(iosNotSupportedChannel[i]) > -1)
                    return false;
            }
        }
    }
    return true;

}


var windowsNotSupportedHost = [
    "swzz|nowvideo",
    "vcrypt|nowvideo",
    "swzz|openload",
    "vcrypt|openload",
    "swzz|flashx",
    "vcrypt|flashx",
    "vcrypt|rapidvideocom",
    'swzz|streaminto'
];

var windowsNotSupportedChannel = [
    "cb01"
];

var iosNotSupportedHost = [
];

var iosNotSupportedChannel = [
    "cb01"
];