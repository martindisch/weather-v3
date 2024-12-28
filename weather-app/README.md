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

To run it you can use a systemd unit like this (example using `fnm`):

```systemd
[Unit]
Description=weather-v3 backend & client
After=network.target

[Service]
ExecStart=/home/weather-app/.local/share/fnm/node-versions/v23.5.0/installation/bin/node build
WorkingDirectory=/home/weather-app/weather-v3/weather-app
User=weather-app
Environment=API_KEY=<INSERT>

[Install]
WantedBy=multi-user.target
```

And if you put it behind nginx have a server block like this:

```nginx
server {
    server_name your.domain.com; # managed by Certbot

    location / {
        proxy_buffering off;
        proxy_pass http://localhost:3000;
    }

    listen [::]:443 ssl http2; # managed by Certbot
    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/your.domain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/your.domain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```
