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
apiClient.get<FetchGamesResponse>("/games).then(res => setGames(res.data.results))
