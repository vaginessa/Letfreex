function openloadExtract(id, success, error) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get("https://openload.co/f/" + id , {}, {}, function (response) {
        console.log(response);

        try {

            var content = response.data.split('<script type="text/javascript">ﾟωﾟ')[1].split(";$")[0];
            content = "ﾟωﾟ" + content + ";";

            var var_r = aadecode(content).split("window.r='")[1].split("';")[0];

            var encode = response.data.split('<span id="' + var_r + '">')[1].split("</span>")[0];

            var url = decodeOpenload(encode);


            success(url);
        } catch (ex) {
            error(ex);
        }
    }, function (response) {
        error(response);
    });
}

function decodeOpenload(inputString) {

    var _0x3990aa = {
        'FSk': function _0x3e7467(_0x322270, _0x15e984) {
            return _0x322270 < _0x15e984;
        },
        'ehJ': function _0xd1816d(_0x3d6921, _0x3db0f5) {
            return _0x3d6921 + _0x3db0f5;
        },
        'mmk': function _0x223fc(_0x4ce281, _0x3b943b) {
            return _0x4ce281 + _0x3b943b;
        },
        'XWo': function _0x14e2a2(_0x46a93d, _0x44286c, _0x2c596a) {
            return _0x46a93d(_0x44286c, _0x2c596a);
        },
        'FCr': function _0x3e9373(_0x597f69, _0x4e2a31) {
            return _0x597f69 == _0x4e2a31;
        },
        'YVW': function _0xb4867e(_0x3eb7b2, _0x5ba7f5) {
            return _0x3eb7b2 % _0x5ba7f5;
        },
        'mtm': function _0x528290(_0x258b48, _0x142a30) {
            return _0x258b48 == _0x142a30;
        },
        'YYt': function _0x195902(_0x4417fe, _0x2daaf0) {
            return _0x4417fe != _0x2daaf0;
        },
        'qTV': function _0x5f4e88(_0x3e7db2, _0x1d5511) {
            return _0x3e7db2 - _0x1d5511;
        },
        'Huj': function _0xa4f861(_0x16aa89, _0x3890d0, _0x1316f7) {
            return _0x16aa89(_0x3890d0, _0x1316f7);
        },
        'Hol': function _0x2dc8d5(_0x33d927, _0x4627a8) {
            return _0x33d927(_0x4627a8);
        },
        'JXH': function _0x9853df(_0x1c5b70, _0x1378b2) {
            return _0x1c5b70 - _0x1378b2;
        },
        'Qyb': function _0x5a7dee(_0x42bca4, _0x4676fa) {
            return _0x42bca4 - _0x4676fa;
        },
        'fTD': function _0x41f054(_0x4e6ad7, _0x12999e) {
            return _0x4e6ad7 - _0x12999e;
        },
        'dDI': function _0x24d171(_0x1cefda, _0x5b4a16) {
            return _0x1cefda + _0x5b4a16;
        },
        'Mrs': function _0x189327(_0x95adcb, _0x1db922) {
            return _0x95adcb + _0x1db922;
        },
        'TLn': function _0x393d6f(_0x3d6934, _0x504bc2) {
            return _0x3d6934 / _0x504bc2;
        },
        'spc': function _0x1bd020(_0x5c0337, _0x571afa) {
            return _0x5c0337(_0x571afa);
        }
    };

    var _0x243cf8 = '2|3|4|6|8|5|0|1|7'['split']('|'), _0x16a278 = 0x0;

    while (!![]) {
        switch (_0x243cf8[_0x16a278++]) {
            case '0':
                _0x20fe06 = 0x0;
                continue;

            case '1':
                for (var _0x2b5057 = 0x0; _0x3990aa['FSk'](_0x20fe06, _0x45262d['length']) ;) {
                    var _0xaa6ce7 = _0x45262d['substring'](_0x20fe06, _0x3990aa['ehJ'](_0x20fe06, 0x2)), _0x2e272c = _0x45262d['substring'](_0x20fe06, _0x3990aa['mmk'](_0x20fe06, 0x3)), _0x4fcf9c = _0x3990aa['XWo'](parseInt, _0xaa6ce7, 0x10);

                    _0x20fe06 += 0x2, _0x3990aa['FCr'](_0x3990aa['YVW'](_0x2b5057, 0x3), 0x0) ? (_0x4fcf9c = _0x3990aa['XWo'](parseInt, _0x2e272c, 0x8), _0x20fe06 += 0x1) : _0x3990aa['mtm'](_0x3990aa['YVW'](_0x2b5057, 0x2), 0x0) && _0x3990aa['YYt'](0x0, _0x2b5057) && _0x3990aa['FSk'](_0x45262d[_0x3990aa['qTV'](_0x2b5057, 0x1)]['charCodeAt'](0x0), 0x3c) && (_0x4fcf9c = _0x3990aa['Huj'](parseInt, _0x2e272c, 0xa), _0x20fe06 += 0x1);

                    var _0x68a9c3 = _0x3d56ff[_0x3990aa['YVW'](_0x2b5057, 0xc)];

                    _0x4fcf9c ^= 0xd5, _0x4fcf9c ^= _0x68a9c3, _0xb71712['push'](String['fromCharCode'](_0x4fcf9c)), _0x2b5057 += 0x1;

                } continue;

            case '2':
                var _0x529fb5 = inputString, _0x135c0f = _0x529fb5['charCodeAt'](0x0), _0x26c260 = _0x3990aa['JXH'](_0x135c0f, 0x37), _0x2188bd = Math['max'](0x2, _0x26c260);
                continue;

            case '3':
                _0x26c260 = Math['min'](_0x2188bd, _0x3990aa['Qyb'](_0x3990aa['fTD'](_0x529fb5['length'], 0x24), 0x2));
                continue;

            case '4':
                for (var _0x488068 = _0x529fb5['substring'](_0x26c260, _0x3990aa['dDI'](_0x26c260, 0x24)), _0x3d56ff = new Array(0xc), _0x20fe06 = 0x0; _0x3990aa['FSk'](_0x20fe06, _0x488068['length']) ;) {
                    var _0x4139b3 = _0x488068['substring'](_0x20fe06, _0x3990aa['Mrs'](_0x20fe06, 0x3));
                    _0x3d56ff[_0x3990aa['TLn'](_0x20fe06, 0x3)] = _0x3990aa['Huj'](parseInt, _0x4139b3, 0x8), _0x20fe06 += 0x3;
                }
                continue;

            case '5':
                var _0x45262d = _0x3702d7['join'](''), _0xb71712 = [];

                continue;

            case '6':
                var _0x3702d7 = _0x529fb5['split']('');

                continue;

            case '7':
                var url = "https://openload.co/stream/" + _0xb71712['join']('') + "?mime=true";
                return url;

            case '8':
                _0x3702d7['splice'](_0x26c260, 0x24);

                continue;

        } break;

    }


};


function aadecode(text) {
    var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    var decodePostamble = ") ());";

    // strip beginning/ending space.
    text = text.replace(/^\s*/, "").replace(/\s*$/, "");

    // returns empty text for empty input.
    if (/^\s*$/.test(text)) {
        return "";
    }
    // check if it is encoded.
    if (text.lastIndexOf(evalPreamble) < 0) {
        throw new Error("Given code is not encoded as aaencode.");
    }
    if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
        throw new Error("Given code is not encoded as aaencode.");
    }

    var decodingScript = text.replace(evalPreamble, decodePreamble)
                             .replace(evalPostamble, decodePostamble);
    return eval(decodingScript);
}