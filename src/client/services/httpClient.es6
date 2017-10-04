import {UrlUtils} from '../utils/UrlUtils';

function sendHttpJsonRequest(req, cb) {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                return cb(null, JSON.parse(ajax.responseText));
            }
            else {
                let error = new Error(ajax.responseText);
                error.status = ajax.status;

                return cb(err);
            }
        }
    }

    ajax.open(req.method, req.url, true);

    if (req.headers)
        Object.keys(req.headers).forEach((headerKey, index) => ajax.setRequestHeader(headerKey, req.headers[req.headers]));

    if (req.body) {
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify(req.body));
    }
    else {
        ajax.send();
    }
} 

class HttpClient {
    constructor(baseUrl) {
        this._url = baseUrl;
    }

    GetJson(relativeUrl, config, callback) {
        config = config || {};
        config.method = 'GET';
        config.url = UrlUtils.Combine(this._url, relativeUrl);

        sendHttpJsonRequest(config, callback);
    }

    PostJson(relativeUrl, config, requestBody, callback) {
        config = config || {};
        config.method = 'POST';
        config.url = UrlUtils.Combine(this._url, relativeUrl);
        config.body = requestBody;

        sendHttpJsonRequest(config, callback);
    }

    PutJson(relativeUrl, config, requestBody, callback) {
        config = config || {};
        config.method = 'POST';
        config.url = UrlUtils.Combine(this._url, relativeUrl);
        config.body = requestBody;

        sendHttpJsonRequest(config, callback);
    }

    DeleteJson(relativeUrl, config) {
        config = config || {};
        config.method = 'DELETE';
        config.url = UrlUtils.Combine(this._url, relativeUrl);

        sendHttpJsonRequest(config, callback);
    }
}

export {HttpClient};