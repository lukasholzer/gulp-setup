const global: any = window;
const apple_phone = /iPhone/i,
    apple_ipod          = /iPod/i,
    apple_tablet        = /iPad/i,
    android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
    android_tablet      = /Android/i,
    amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    windows_phone       = /IEMobile/i,
    windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
    other_blackberry    = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera         = /Opera Mini/i,
    other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
    seven_inch = new RegExp(
        '(?:' +         // Non-capturing group

        'Nexus 7' +     // Nexus 7

        '|' +           // OR

        'BNTV250' +     // B&N Nook Tablet 7 inch

        '|' +           // OR

        'Kindle Fire' + // Kindle Fire

        '|' +           // OR

        'Silk' +        // Kindle Fire, Silk Accelerated

        '|' +           // OR

        'GT-P1000' +    // Galaxy Tab 7 inch

        ')',            // End non-capturing group

        'i');           // Case-insensitive matching
const match = function(regex: any, userAgent:any) {
    return regex.test(userAgent);
};

var ua = navigator.userAgent;
let isMobile: any = {};

// Facebook mobile app's integrated browser adds a bunch of strings that
// match everything. Strip it out if it exists.
var tmp = ua.split('[FBAN');
if (typeof tmp[1] !== 'undefined') {
    ua = tmp[0];
}

// Twitter mobile app's integrated browser on iPad adds a "Twitter for
// iPhone" string. Same probable happens on other tablet platforms.
// This will confuse detection so strip it out if it exists.
tmp = ua.split('Twitter');
if (typeof tmp[1] !== 'undefined') {
    ua = tmp[0];
}

isMobile.apple = {
    phone:  match(apple_phone, ua),
    ipod:   match(apple_ipod, ua),
    tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
    device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
};
isMobile.amazon = {
    phone:  match(amazon_phone, ua),
    tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
    device: match(amazon_phone, ua) || match(amazon_tablet, ua)
};
isMobile.android = {
    phone:  match(amazon_phone, ua) || match(android_phone, ua),
    tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
    device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
};
isMobile.windows = {
    phone:  match(windows_phone, ua),
    tablet: match(windows_tablet, ua),
    device: match(windows_phone, ua) || match(windows_tablet, ua)
};
isMobile.other = {
    blackberry:   match(other_blackberry, ua),
    blackberry10: match(other_blackberry_10, ua),
    opera:        match(other_opera, ua),
    firefox:      match(other_firefox, ua),
    chrome:       match(other_chrome, ua),
    device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
};
isMobile.seven_inch = match(seven_inch, ua);
isMobile.any = isMobile.apple.device || isMobile.android.device || isMobile.windows.device || isMobile.other.device || isMobile.seven_inch;

// excludes 'other' devices and ipods, targeting touchscreen phones
isMobile.phone = isMobile.apple.phone || isMobile.android.phone || isMobile.windows.phone;

// excludes 7 inch devices, classifying as phone or tablet is left to the user
isMobile.tablet = isMobile.apple.tablet || isMobile.android.tablet || isMobile.windows.tablet;

global.isMobile = isMobile;

export function detect() {
    document.documentElement.classList.add(detectIE() ? 'ie' : 'not-ie');
    document.documentElement.classList.add(global.isMobile.any ? 'is-mobile' : 'is-desktop');

    if (isMobile.any) {
        let videos = document.querySelectorAll('.section__background_media .embed_container');
        for (let i = 0, max = videos.length; i < max; i++) {
            let video = videos[i];
            video.parentNode.removeChild(video);
        }
    }    
}
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export function detectIE() {
    var ua = window.navigator.userAgent;
    var msie: number = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return !!parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return !!parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return !!parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}





