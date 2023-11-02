(function(window) {
    'use strict';

    var CynthiaAPI = {
        endpoint: 'https://api.cynthia.io/api/v1.0/search', // The endpoint URL

        /**
         * Execute a search against the Cynthia API
         * @param {string} modelName - The name of the model being used
         * @param {string} modelVersion - The version of the model being used
         * @param {string} query - The search term or query
         * @param {string} apiKey - The client API key
         * @param {Object} [options={}] - Search options
         * @param {function} onSuccess - Callback for successful API call
         * @param {function} onError - Callback for error in API call
         */
        search: function(modelName, modelVersion, query, apiKey, options, onSuccess, onError) {
            options = options || {};

            // Default options if not provided
            var defaultOptions = {
                autoLimit: true,
                top: 50
            };
            for (var opt in defaultOptions) {
                if (defaultOptions.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
                    options[opt] = defaultOptions[opt];
                }
            }

            var requestBody = {
                data: [{
                    query: query
                }],
                options: options
            };

            // Check if browser supports XMLHttpRequest
            if (!window.XMLHttpRequest) {
                console.error('Your browser does not support XMLHttpRequest. Consider upgrading.');
                return;
            }

            // Create XMLHttpRequest instance
            var xhr = new XMLHttpRequest();

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

            // Open the XMLHttpRequest
            xhr.open('POST', `${this.endpoint}/${modelName}/${modelVersion}`, true);

            // Set headers
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.setRequestHeader('cynthia-api-key', apiKey);

            // Send the XMLHttpRequest with the requestBody
            xhr.send(JSON.stringify(requestBody));
        }
    };

    // Expose the CynthiaAPI object to the global window object
    window.CynthiaAPI = CynthiaAPI;

})(window);