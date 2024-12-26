# weather-app

This SvelteKit app is the client and backend for storing and interacting with
current and historical readings. It uses a SQLite database.

## Develop

Start by installing dependencies with `npm install`. Then create an empty
database with `npm run db:empty` and add some test data with
`npm run db:test-data`.

Finally make sure you have an environment variable for the API key set if you
want to push data to the API, for example by creating a `.env` file with
something like `API_KEY=your-generated-key` in it.

Then you're good to go with `npm run dev`.

## Build & deploy

After `npm run build` you can start the server with `node build`. Remember to
have both the env variable `API_KEY` set (generate with something like
`uuidgen`) and a `measurements.sqlite3` database in the working directory.
