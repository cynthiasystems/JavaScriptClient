(function(window) {
    'use strict';

    // Cynthia API Client
    var CynthiaAPI = {
        endpoint: 'https://api.cynthia.io/api/v1.0/search',

        /**
         * Execute a search against the Cynthia API
         * @param {string[]} queries - List of search terms or queries
         * @param {string} modelName - The model's name
         * @param {string} modelVersion - The model's version
         * @param {int} top - Max number of results
         * @param {bool} autoLimit - Option to allow Cynthia to reduce results for increased precision
         * @param {string} apiKey - API key for authentication
         * @param {function} onSuccess - Callback for successful API call
         * @param {function} onError - Callback for error in API call
         */
        search: function(queries, modelName, modelVersion, top, autoLimit, apiKey, onSuccess, onError) {
            // Check if browser supports XMLHttpRequest
            if (!window.XMLHttpRequest) {
                console.error('Your browser does not support XMLHttpRequest. Consider upgrading.');
                return;
            }

            // Create XMLHttpRequest instance
            var xhr = new XMLHttpRequest();

            // Construct request payload from queries
            var requestData = {
                data: queries.map(function(query) {
                    return { query: query };
                }),
                options: {
                    autoLimit: autoLimit,
                    top: top
                }
            };

            // Handle ready state change
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            onSuccess(jsonResponse);
                        } catch (e) {
                            onError('Error parsing API response.');
                        }
                    } else {
                        onError('API request failed with status ' + xhr.status);
                    }
                }
            };

            // Handle errors
            xhr.onerror = function() {
                onError('Network error.');
            };

            // Open and send the XMLHttpRequest
            var apiUrl = this.endpoint + '/' + modelName + '/' + modelVersion;
            xhr.open('POST', apiUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("cynthia-api-key", apiKey);
            xhr.send(JSON.stringify(requestData));
        }
    };

    // Expose the CynthiaAPI object to the global window object
    window.CynthiaAPI = CynthiaAPI;

})(window);




