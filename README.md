# Map Marker API

* Develop a suite of CRUD APIs for a marker (label, lat, lng)
* APIs should support adding/editing/deleting marker
* Search should support pagination and should return 10 items by default per invocation - done
* Add unit tests and Integration tests for each functionality. - done
* Add basic authentication for the app. Use environment variables or basic auth(for rest APIs)
* The code should scale out for millions of markers

# Installation steps

* System requirement: nodejs >=10.15.3
* clone the git repo: `git clone https://github.com/thisrashid/map-marker-api.git`
* go inside of the project directory: `cd map-marker-api`
* install dependencies: `npm install`
* set env variables `PORT` and `DATABASE`. `PORT` is where the http server listens and `DATABASE` is the URL of mongodb
* to start local mongodb server: `docker-compose up`. It will start mongodb listening on the port 27017 without and username or password
* to start local dev server: `npm run serve`. It will start the server at port 8080 (if no `PORT` defined). Port may be configured by setting env variable `PORT`
* create, update and delete requires basic authorization header. View and search are public. As of now username password is hard coded as username: testuser, password: dontknow
* Endpoints:
  * GET /markers : to search
  * POST /markers : to create marker
  * GET /markers/:id : to view marker by id
  * PUT /markers/:id : to update marker by id
  * DELETE /markers/:id : to delete marker by id
  * payload for POST & PUT : `{
    "id": 123,
    "label": "berlin",
    "lat": 48.1351253,
    "lng": 11.5819805
}`

Sample search query: `http://localhost:8080/markers?keyword=berlin&limit=10&page=2&sortby=label`.
