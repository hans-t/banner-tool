# banner-tool

A tool for automating the creation of banners, built mostly using [React.js](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and HTML5 Canvas with [Flask](http://flask.pocoo.org/) backend.


## Development environment setup

Follow these steps:

1. Install Node v6 and Python v3.5.

2. Clone this repo.

3. In repo folder, install required libraries for Node and Python, by running
`npm i` and `pip install -r requirements.txt` respectively.

4. Afterwards, you need to start up Webpack dev server and Flask development server by running:
`npm run dev` and `python app.py` respectively.

5. It is highly recommended to install Chrome extensions `Redux DevTools` and `React Developer Tools` for debugging.


## Deployment

1. You need to specify SITENAME environment variable when running provisioning.sh.
Example:

    `SITENAME=yoursite.com bash provisioning.sh`

2. Include this project Nginx conf to the main site Nginx configuration file. Example:

    ```
    # inside main.conf

    server {
        ...
        include /etc/nginx/subsites-enabled/${SITENAME}/banner-tool.conf;
    }
    ```

3. Reload Nginx.

    `sudo service nginx reload`
