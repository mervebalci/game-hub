# game-hub

## Fetching the games

axios is used to make HTTP requests. After axios is installed (_npm i axios_), create an axios instance (_api-client.ts file_) with custom configuration. In that configuration, include the API key which was copied from the website.

To send a fetch request to the backend, `effect` hook is used (_GameGrid.tsx file_). Call api-client and with `get()` method, send a request to "/games" endpoint. Create an interface that represents the shape of the response object.

interface Game {
id: number;
name: string;
}

interface FetchGamesResponse {
count: number;
results: Game[];
}

When sending get request to the server, use angle brackets <> to provide a generic type argument. With that, we know the shape of the response object. Then grab the response and setGames to data.results which is an array of objects (Game)

apiClient.get<_FetchGamesResponse_>("/games).then(res => setGames(res.data.results))

## Creating a custom hook for fetching games

The `AbortController` is a useful feature in JavaScript that allows you to cancel ongoing network requests, such as those made with the Fetch API. In a Vite React TypeScript project, using `AbortController` can help you manage and clean up network requests effectively.

### Why Use `AbortController`

1. _Canceling Requests:_ If a component unmounts or if a user navigates away before a fetch request completes, `AbortController` allows you to cancel that request to prevent unnecessary processing and resource usage.

2. _Improving Performance:_ Canceling requests that are no longer needed can help improve the performance of your application by avoiding processing responses that will not be used.

3. _Preventing Memory Leaks:_ In single-page applications (SPAs), components can mount and unmount frequently. Using `AbortController` can help prevent memory leaks by ensuring that any outstanding network requests are properly terminated.

4. _Better Error Handling:_ When a request is aborted, you can handle this case explicitly in your error handling logic, allowing you to differentiate between canceled requests and other types of errors.

### How to use `AbortController`

- _Creating an AbortController:_ An instance of `AbortController` is created, which can be used to signal aborting the fetch request.

- _Signal Usage:_ The `signal` property from the controller is passed to the fetch request. This allows the fetch to listen for abort signals.

- _Error Handling:_ If the request is aborted, the error will be of type `AbortError`, which you can handle separately.

- _Cleanup Function:_ The cleanup function in the `useEffect` hook calls `controller.abort()`, ensuring that any ongoing request is canceled when the component unmounts.

### Conclusion

Using `AbortController` in your Vite React TypeScript project helps you manage network requests more effectively, leading to better performance and resource management. It’s a best practice to include this when dealing with asynchronous data fetching in components.
