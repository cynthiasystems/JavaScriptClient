# Cynthia.js

`Cynthia.js` is a lightweight and powerful JavaScript library that integrates AI-powered search 
capabilities into web applications. This library provides an easy way to enhance your website's 
search functionality with intelligent, context-aware results.

## Features

- Easy integration
- AI-powered search
- Fast and lightweight
- Customizable options
- Cross-browser compatible

## Getting Started

To start using `Cynthia.js`, simply include the script in your HTML file:

```html
<script src="https://cynthiasystems.b-cdn.net/Cynthia.js"></script>
```

### Example Usage

Here's an example of how to use `Cynthia.js` in your web application:

```javascript
var cynthiaSearch = new CynthiaSearch({
    apiKey: 'your-api-key-here',
    modelName: 'YourModel',
    modelVersion: 'your-model-version',
    cynthiaHost: 'https://api.cynthia.io',  // Replace with your specific Cynthia host
    timeout: 5000  // Optional: specify timeout in milliseconds
});

function updateSearchResults(error, results) {
    if (error) {
        console.error('Search error:', error);
        return;
    }
    // Update the UI with the search results
    console.log('Search results:', results);
    // ... code to update the UI ...
}

// Perform a search when the user submits a query
document.getElementById('search-form').onsubmit = function(event) {
    event.preventDefault();
    var query = document.getElementById('search-input').value;
    cynthiaSearch.search(query, updateSearchResults);
};
```

## Advanced Usage

`Cynthia.js` offers advanced configuration options and features for more fine-tuned 
control over your search functionality.

### API Version Control

You can specify the API version you want to use:

```javascript
var cynthiaSearch = new CynthiaSearch({
    apiKey: 'your-api-key-here',
    apiVersion: 'v1.0',
    modelName: 'YourModel',
    modelVersion: 'your-model-version',
    cynthiaHost: 'https://api.cynthia.io',
    timeout: 5000
});
```
### Controlling Search Results

The `search` method accepts an optional `options` object as its second parameter, allowing 
you to control the number of results and enable auto-limiting:

```javascript
var searchOptions = {
    top: 5,        // Limit to top 5 results
    autoLimit: true // Allow Cynthia to optimize result count for relevance
};

cynthiaSearch.search('your search query', searchOptions, function(error, results) {
    if (error) {
        console.error('Search error:', error);
        return;
    }
    console.log('Search results:', results);
    // Process and display results
});
```

### Full Advanced Example

Here's a comprehensive example showcasing advanced usage:

```javascript
var cynthiaSearch = new CynthiaSearch({
    apiKey: 'your-api-key-here',
    apiVersion: 'v1.0',
    modelName: 'YourModel',
    modelVersion: 'your-model-version',
    cynthiaHost: 'https://api.cynthia.io',
    timeout: 5000
});

function updateSearchResults(error, results) {
    if (error) {
        console.error('Search error:', error);
        return;
    }
    console.log('Search results:', results);
    // Process and display results
}

document.getElementById('search-form').onsubmit = function(event) {
    event.preventDefault();
    var query = document.getElementById('search-input').value;
    var searchOptions = {
        top: parseInt(document.getElementById('result-limit').value, 10),
        autoLimit: document.getElementById('auto-limit').checked
    };
    cynthiaSearch.search(query, searchOptions, updateSearchResults);
};
```
This example assumes you have form elements with IDs `search-input`, `result-limit`, 
and `auto-limit` in your HTML. It allows users to specify the number of 
results they want and whether to enable auto-limiting, providing a more customizable 
search experience.

## License

`Cynthia.js` is released under the MIT License. See the [LICENSE](LICENSE) file in the repository for the full license text.

## Contributing

We welcome contributions from the community. If you wish to contribute to Cynthia.js, please feel free to:

1. Open issues for bug reports or feature requests
2. Submit pull requests for bug fixes or new features

Before submitting a pull request, please ensure that your code adheres to the existing style and that all tests pass.

## Contact

For more information about Cynthia.js, to report issues, or to get in touch with our team, 
please visit our website at [https://cynthiasystems.com/](https://cynthiasystems.com/).

We appreciate your interest in Cynthia.js and look forward to seeing how you use it in your projects!
