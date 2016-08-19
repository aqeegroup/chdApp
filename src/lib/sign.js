/*var params = {
    appKey: 'GiITvn',
    param: '{"userName":"201541020201","password":"cc2015","isRemember":true,"uuId":"53A857EA-AA0A-4032-8612-3E453D042EBB","schoolId":138}',
    time: 1467703122424,
    secure: 0,
}*/
// sign: '681f2339b7cab75022f2c4d35a7d1f99'
// 登录接口
// 'baseCampus/login/login.do'
// 调用 params2md5(params);

export default function signParams(param) {

    let d = new Date();
    let params = {
        appKey: 'GiITvn',
        param: JSON.stringify(param),
        time: d.getTime(),
        secure: 0,
    }
    var str = Object.keys(params).sort(function(e, t) {
        return e < t ? -1 : 1
    }).map(function(t) {
        return t + "=" + params[t]
    }).join("&");
    console.log(str);
    params.sign = hex_md5(str);
    console.log(params);
    return JSON.stringify(params);
}


var m = 0;
var hex_md5 = function(e) {
    return e == "" ? e : n(rstr_md5(o(e)))
}

var rstr_md5 = function(e) {
    return r(a(i(e), e.length * 8))
}

function e() {}

function t(e, t) {
    var n = i(e);
    n.length > 16 && (n = a(n, e.length * 8));
    for (var o = Array(16), s = Array(16), c = 0; c < 16; c++) o[c] = n[c] ^ 909522486, s[c] = n[c] ^ 1549556828;
    var u = a(o.concat(i(t)), 512 + t.length * 8);
    return r(a(s.concat(u), 640))
}

function n(e) {
    try {} catch (t) {
        m = 0
    }
    // console.log(m);
    for (var n, o = m ? "0123456789ABCDEF" : "0123456789abcdef", i = "", r = 0; r < e.length; r++) n = e.charCodeAt(r), i += o.charAt(n >>> 4 & 15) + o.charAt(n & 15);
    return i
}

function o(e) {
    for (var t, n, o = "", i = -1; ++i < e.length;) t = e.charCodeAt(i), n = i + 1 < e.length ? e.charCodeAt(i + 1) : 0, 55296 <= t && t <= 56319 && 56320 <= n && n <= 57343 && (t = 65536 + ((t & 1023) << 10) + (n & 1023), i++), t <= 127 ? o += String.fromCharCode(t) : t <= 2047 ? o += String.fromCharCode(192 | t >>> 6 & 31, 128 | t & 63) : t <= 65535 ? o += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | t & 63) : t <= 2097151 && (o += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | t & 63));
    return o
}

function i(e) {
    for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0;
    for (var n = 0; n < e.length * 8; n += 8) t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << n % 32;
    return t
}

function r(e) {
    for (var t = "", n = 0; n < e.length * 32; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
    return t
}

function a(e, t) {
    e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
    for (var n = 1732584193, o = -271733879, i = -1732584194, r = 271733878, a = 0; a < e.length; a += 16) {
        var s = n,
            p = o,
            m = i,
            h = r;
        n = c(n, o, i, r, e[a + 0], 7, -680876936), r = c(r, n, o, i, e[a + 1], 12, -389564586), i = c(i, r, n, o, e[a + 2], 17, 606105819), o = c(o, i, r, n, e[a + 3], 22, -1044525330), n = c(n, o, i, r, e[a + 4], 7, -176418897), r = c(r, n, o, i, e[a + 5], 12, 1200080426), i = c(i, r, n, o, e[a + 6], 17, -1473231341), o = c(o, i, r, n, e[a + 7], 22, -45705983), n = c(n, o, i, r, e[a + 8], 7, 1770035416), r = c(r, n, o, i, e[a + 9], 12, -1958414417), i = c(i, r, n, o, e[a + 10], 17, -42063), o = c(o, i, r, n, e[a + 11], 22, -1990404162), n = c(n, o, i, r, e[a + 12], 7, 1804603682), r = c(r, n, o, i, e[a + 13], 12, -40341101), i = c(i, r, n, o, e[a + 14], 17, -1502002290), o = c(o, i, r, n, e[a + 15], 22, 1236535329), n = u(n, o, i, r, e[a + 1], 5, -165796510), r = u(r, n, o, i, e[a + 6], 9, -1069501632), i = u(i, r, n, o, e[a + 11], 14, 643717713), o = u(o, i, r, n, e[a + 0], 20, -373897302), n = u(n, o, i, r, e[a + 5], 5, -701558691), r = u(r, n, o, i, e[a + 10], 9, 38016083), i = u(i, r, n, o, e[a + 15], 14, -660478335), o = u(o, i, r, n, e[a + 4], 20, -405537848), n = u(n, o, i, r, e[a + 9], 5, 568446438), r = u(r, n, o, i, e[a + 14], 9, -1019803690), i = u(i, r, n, o, e[a + 3], 14, -187363961), o = u(o, i, r, n, e[a + 8], 20, 1163531501), n = u(n, o, i, r, e[a + 13], 5, -1444681467), r = u(r, n, o, i, e[a + 2], 9, -51403784), i = u(i, r, n, o, e[a + 7], 14, 1735328473), o = u(o, i, r, n, e[a + 12], 20, -1926607734), n = l(n, o, i, r, e[a + 5], 4, -378558), r = l(r, n, o, i, e[a + 8], 11, -2022574463), i = l(i, r, n, o, e[a + 11], 16, 1839030562), o = l(o, i, r, n, e[a + 14], 23, -35309556), n = l(n, o, i, r, e[a + 1], 4, -1530992060), r = l(r, n, o, i, e[a + 4], 11, 1272893353), i = l(i, r, n, o, e[a + 7], 16, -155497632), o = l(o, i, r, n, e[a + 10], 23, -1094730640), n = l(n, o, i, r, e[a + 13], 4, 681279174), r = l(r, n, o, i, e[a + 0], 11, -358537222), i = l(i, r, n, o, e[a + 3], 16, -722521979), o = l(o, i, r, n, e[a + 6], 23, 76029189), n = l(n, o, i, r, e[a + 9], 4, -640364487), r = l(r, n, o, i, e[a + 12], 11, -421815835), i = l(i, r, n, o, e[a + 15], 16, 530742520), o = l(o, i, r, n, e[a + 2], 23, -995338651), n = d(n, o, i, r, e[a + 0], 6, -198630844), r = d(r, n, o, i, e[a + 7], 10, 1126891415), i = d(i, r, n, o, e[a + 14], 15, -1416354905), o = d(o, i, r, n, e[a + 5], 21, -57434055), n = d(n, o, i, r, e[a + 12], 6, 1700485571), r = d(r, n, o, i, e[a + 3], 10, -1894986606), i = d(i, r, n, o, e[a + 10], 15, -1051523), o = d(o, i, r, n, e[a + 1], 21, -2054922799), n = d(n, o, i, r, e[a + 8], 6, 1873313359), r = d(r, n, o, i, e[a + 15], 10, -30611744), i = d(i, r, n, o, e[a + 6], 15, -1560198380), o = d(o, i, r, n, e[a + 13], 21, 1309151649), n = d(n, o, i, r, e[a + 4], 6, -145523070), r = d(r, n, o, i, e[a + 11], 10, -1120210379), i = d(i, r, n, o, e[a + 2], 15, 718787259), o = d(o, i, r, n, e[a + 9], 21, -343485551), n = f(n, s), o = f(o, p), i = f(i, m), r = f(r, h)
    }
    return Array(n, o, i, r)
}

function s(e, t, n, o, i, r) {
    return f(p(f(f(t, e), f(o, r)), i), n)
}

function c(e, t, n, o, i, r, a) {
    return s(t & n | ~t & o, e, t, i, r, a)
}

function u(e, t, n, o, i, r, a) {
    return s(t & o | n & ~o, e, t, i, r, a)
}

function l(e, t, n, o, i, r, a) {
    return s(t ^ n ^ o, e, t, i, r, a)
}

function d(e, t, n, o, i, r, a) {
    return s(n ^ (t | ~o), e, t, i, r, a)
}

function f(e, t) {
    var n = (e & 65535) + (t & 65535),
        o = (e >> 16) + (t >> 16) + (n >> 16);
    return o << 16 | n & 65535
}

function p(e, t) {
    return e << t | e >>> 32 - t
}
