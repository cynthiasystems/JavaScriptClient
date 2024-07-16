// Cynthia.js

(function(window) {
    'use strict';

    // Cynthia Search API client
    function CynthiaSearch(config) {
        this.apiKey = config.apiKey;
        this.apiVersion = config.apiVersion || 'v1.0';
        this.modelName = config.modelName;
        this.modelVersion = config.modelVersion;
        this.cynthiaHost = config.cynthiaHost;
        this.timeout = config.timeout || 5000;
    }

    CynthiaSearch.prototype.search = function(query, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        var searchOptions = {
            autoLimit: options.autoLimit !== undefined ? options.autoLimit : true,
            top: options.top || 10
        };

        var searchRequest = {
            data: [{ query: query }],
            options: searchOptions
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.cynthiaHost + '/api/' + this.apiVersion + '/search/' + this.modelName + '/' + this.modelVersion, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('cynthia-api-key', this.apiKey);
        xhr.timeout = this.timeout;

        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callback(null, response);
            } else {
                callback(new Error('Request failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            callback(new Error('Request failed. Network error.'));
        };

        xhr.ontimeout = function() {
            callback(new Error('Request timed out.'));
        };

        xhr.send(JSON.stringify(searchRequest));
    };

    // Expose the CynthiaSearch constructor to the global scope
    window.CynthiaSearch = CynthiaSearch;

})(window);
