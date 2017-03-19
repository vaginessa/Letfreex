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
    var _0x1fd858 = {
        'xRD': function _0xdc348d(_0x14f459, _0x569260) { return _0x14f459 < _0x569260; }, 'ZeT': function _0x53006b(_0x11547f, _0x2c0d13) { return _0x11547f + _0x2c0d13; }, 'WNS': function _0x4387a2(_0x5324b2, _0x9c4759) { return _0x5324b2 + _0x9c4759; }, 'pLB': function _0x15fe57(_0x3ab1d7, _0x5b73ee, _0x12dbc2) { return _0x3ab1d7(_0x5b73ee, _0x12dbc2); }, 'gJK': function _0x2a66de(_0xe13ab1, _0x363e1d) { return _0xe13ab1 == _0x363e1d; }, 'oET': function _0x326a36(_0xbb4971, _0x3fdb77) { return _0xbb4971 % _0x3fdb77; }, 'iJA': function _0x447e58(_0x3953f0, _0x2d9f37, _0x4f842b) { return _0x3953f0(_0x2d9f37, _0x4f842b); }, 'kOL': function _0x1badbd(_0x419965, _0x1ed3ea) { return _0x419965 == _0x1ed3ea; }, 'hlO': function _0xbde649(_0x5319f7, _0x1e7980) { return _0x5319f7 != _0x1e7980; }, 'eAE': function _0x52e7db(_0x425ad1, _0xc0cae2) { return _0x425ad1 < _0xc0cae2; }, 'wyf': function _0x4dc7f8(_0x234038, _0x42c6db) { return _0x234038 - _0x42c6db; }, 'TYf': function _0x299232(_0x3969f8, _0x48db24) { return _0x3969f8 / _0x48db24; }, 'XcK': function _0x559707(_0xfc1900, _0x9e1420) { return _0xfc1900(_0x9e1420); }, 'dFN': function _0x1a9a62(_0x174a99, _0x52dfc2) { return _0x174a99 + _0x52dfc2; }
    };

    var _0x254069 = '3|6|2|7|4|0|5|1|8'['split']('|'), _0x38b61f = 0x0;

    while (!![]) {
        switch (_0x254069[_0x38b61f++]) {
            case '0': var _0x5e82dd = _0x563f72['join'](''), _0x5e5aae = []; continue;
            case '1': for (var _0x1041b1 = 0x0; _0x1fd858['xRD'](_0x1e74c2, _0x5e82dd['length']) ;) {
                var _0x221589 = _0x5e82dd['substring'](_0x1e74c2, _0x1fd858['ZeT'](_0x1e74c2, 0x2)), _0x46bf10 = _0x5e82dd['substring'](_0x1e74c2, _0x1fd858['WNS'](_0x1e74c2, 0x3)), _0x450a25 = _0x1fd858['pLB'](parseInt, _0x221589, 0x10); _0x1e74c2 += 0x2, _0x1fd858['gJK'](_0x1fd858['oET'](_0x1041b1, 0x3), 0x0) ? (_0x450a25 = _0x1fd858['iJA'](parseInt, _0x46bf10, 0x8), _0x1e74c2 += 0x1) : _0x1fd858['kOL'](_0x1fd858['oET'](_0x1041b1, 0x2), 0x0) && _0x1fd858['hlO'](0x0, _0x1041b1) && _0x1fd858['eAE'](_0x5e82dd[_0x1fd858['wyf'](_0x1041b1, 0x1)]['charCodeAt'](0x0), 0x3c) && (_0x450a25 = _0x1fd858['iJA'](parseInt, _0x46bf10, 0xa), _0x1e74c2 += 0x1); var _0x31b23d = _0x347706[_0x1fd858['oET'](_0x1041b1, 0x7)]; _0x450a25 ^= 0xd5, _0x450a25 ^= _0x31b23d, _0x5e5aae['push'](String['fromCharCode'](_0x450a25)), _0x1041b1 += 0x1;
            } continue;
            case '2': for (
                var _0x2d246a = _0x30d464['substring'](_0x84a7b0, _0x1fd858['WNS'](_0x84a7b0, 0x24)), _0x347706 = new Array(0xc), _0x1e74c2 = 0x0; _0x1fd858['eAE'](_0x1e74c2, _0x2d246a['length']) ;) { var _0x24ac16 = _0x2d246a['substring'](_0x1e74c2, _0x1fd858['WNS'](_0x1e74c2, 0x3)); _0x347706[_0x1fd858['TYf'](_0x1e74c2, 0x3)] = _0x1fd858['iJA'](parseInt, _0x24ac16, 0x8), _0x1e74c2 += 0x3; } continue;
            case '3': var _0x30d464 = inputString, _0x526965 = _0x30d464['charCodeAt'](0x0), _0x84a7b0 = _0x1fd858['wyf'](_0x526965, 0x37), _0x4d54a4 = Math['max'](0x2, _0x84a7b0); continue; case '4': _0x563f72['splice'](_0x84a7b0, 0x24); continue; case '5': _0x1e74c2 = 0x0; continue; case '6': _0x84a7b0 = Math['min'](_0x4d54a4, _0x1fd858['wyf'](_0x1fd858['wyf'](_0x30d464['length'], 0x24), 0x2)); continue; case '7': var _0x563f72 = _0x30d464['split'](''); continue;
            case '8':
                var outputLink = _0x5e5aae['join']('');
                var url = "https://openload.co/stream/" + outputLink + "?mime=true"
                return url;
        } break;
    }
}


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