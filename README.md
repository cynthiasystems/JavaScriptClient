# CynthiaAPI.js
CynthiaAPI.js is a concise JavaScript client library designed to asynchronously interface with the Cynthia Cognitive Search API, simplifying the retrieval and handling of search results in web applications.

## Installation
Include the CynthiaAPI.js file in your HTML:

```
<script src="path/to/CynthiaAPI.js"></script>
```

## Usage

### Initialize and Configuration:
After including the `CynthiaAPI.js` script in your HTML file, the CynthiaAPI object becomes available globally. 
   

### Perform a Search
The primary function available in the library is the search function.

```
CynthiaAPI.search(
  ["query1", "query2"],
  "ModelName", 
  "model-version", 
  50, 
  true, 
  "yourAPIKey", 
  onSuccessCallback, 
  onErrorCallback
);
```

#### Parameters

- `queries` *(array of strings)*: A list of search terms or phrases.
- `modelName` *(string)*: The name of the model being used for the search.
- `modelVersion` *(string)*: The version of the model being used.
- `top` *(number, default=50)*: The maximum number of search results to return.
- `autoLimit` *(boolean, default=true)*: Instructs Cynthia to selectively reduce the number of results to increase precision.
- `apiKey` *(string)*: The client API key.
- `onSuccess` *(function)*: A callback function executed upon a successful API call. Receives the JSON response as its argument.
- `onError` *(function)*: A callback function executed when an error occurs. Receives an error message string as its argument.

#### Handling the Response
The `onSuccess` callback function will receive the search results in a JSON format. A typical response will look like:

```
{
  "correlationId": <string>,
  "data": [
    [
      {
        "resultId": <string>,
        "score": <float>,
        "properties": { 
          <string>: <string>,
          ...
        }
      },
      ...
    ]
  ]
}
```
`correlationId`: A unique identifier for the request.
`data`: An array containing search results.
`resultId`: A unique identifier for each result.
`score`: A score indicating the relevance of the result.
`properties`: Additional properties associated with the result.

#### Batch-Oriented API
Cynthia's API is designed with a batch-oriented approach. This design choice facilitates the processing of multiple queries in a single API call, optimizing both performance and costs. It's worth noting the following points:

- Single Query Inference: Even if you submit a batch with only one query, it's still considered a valid operation. While batching allows for bulk processing, individual inferences are entirely feasible and common.
- Billing & Invoicing: Our invoicing and billing process counts each query in the batch as a single inference. Therefore, whether you send a batch of 10 queries or a single query, each query is billed as one inference. This approach offers transparency and consistency in our billing model.

When building and scaling your application, always consider the batch-oriented nature of our API. It's tailored to provide you with flexibility, efficiency, and cost-effectiveness.

#### Browser Compatibility
The `CynthiaAPI.js` library uses `XMLHttpRequest`, which is supported in most modern browsers. However, very old browsers may not support this feature.

#### Troubleshooting
- Ensure the script is correctly included in your HTML.
- Ensure the correct API key is being used.
- Check the browser's console for any errors or warnings.

This `README` is written with clarity for professional web developers and engineers. It should provide a comprehensive overview of how to use the `CynthiaAPI.js` library.