
'use strict';

const Url   = require('url');
const http  = require('http');
const https = require('https');

const options = require('./options.json');

let cnt = 0;

function sendRequest() {
    try {
        let url = Url.parse(options.url);
        let _http = url.protocol === 'https:' ? https : http;
        url = Object.assign(url, {
            method: options.method || 'GET',
            headers: options.headers || {}
        });
        let req = _http.request(url);
        req.on('error', (err) => {
            console.log(err);
        });
        req.write(options.body);
        req.end();
        if (++cnt % 100 === 0) console.log('Request sent * ' + cnt);
    } catch (err) {
        console.log(err);
    }
    setImmediate(sendRequest);
}

sendRequest();
