// LIVE
let config = {
    url: window.location.hostname
}

// TEST
if (window.location.hostname.search(/test.netural.com/i) != -1 || window.location.hostname.search(/dev.netural.com/i) != -1) {

}

// DEV
if (window.location.hostname.search(/localhost/i) != -1 || window.location.hostname.search(/0.0.0.0/i) != -1) {
   
}

export default config;