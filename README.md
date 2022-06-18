# Express-and-MongoDB-project

Project for the Full Stack Web Technologies postgraduate course. In this project I had to create a server using Express.js with connection to a MongoDB database using docker. Middleware had to be used as well as good structuring of the whole server. I created a simple database with cities that have buildings (many-to-one relationship) to test all the technologies used in this project.

## Files in /server:
- The Nodejs part of the backend.
- API-calls-for-insomnia.json : Exported from Insomnia. Contains the API tests done in Insomnia as well as example data.
- .env : (dotenv) configuration file for the server port and URL connection to MongoDB.
- /src:
  - server.js : is the main script of the server. Configures, starts and mantains server.
  - db.js : contains the connection to MongoDB.
  - config.js: reads the data in .env to configure the server and Mongo's URL.
- /src/resources : contains the structuring of all the code related to the use of the cities and buildings and their connection to the database:
  - example.model.js: contains the mongoose schema of the city/building to have better control of the structure of each element.
  - example.controllers.js: contains all the CRUD functionalities for the cities/buildings.
  - example.router.js: contains the routing of the endpoints related to cities/buildings.

## Files in /mongodb:
- docker-compose.yml : the docker compose file to configure the MongoDB database and user credentials.
- db-console.sh : execute this script once the MongoDB database is up to connect directly to MongoDB shell.
- db-exec.sh : (UNUSED). You could use this script to execute a script inside MongoDB shell. For importing data for example.

## Considerations:
- In order to reproduce the many-to-one relationships, the sub-documents approach has been used. Each building contains a sub-document of its city.
