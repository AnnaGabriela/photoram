## Photoram | Your image repository

### Overview
---
This repository is an example of an image repository API. The main functionalities are add/remove/get an image or multiple images at once. The system was developed using Node.js and Express for the core of the API, Mongoose to connect with the MongoDB databse, and Jest with Supertest for the testing.

### Get Started
---
To test this API, you can either clone this project and run it locally on your machine or use this API URL hosted on Heroku to test the endpoints: https://photoram.herokuapp.com/api.

### Setting up on your machine
---
1. Clone the repository
```
$ git clone https://github.com/AnnaGabriela/photoram 
```
2. Install the project depedencies
```
$ npm i
```
3. Create a .env file. You should see a .env.example file with the required env vars you should add. You must create a .env file on the root of the project with the same vars filled.

4. Run the API
```
$ npm start
```
5. You can also run the tests
```
$ npm test
```

### Documentation
You can find the full API documentation with detailed request/response for each endpoint on: https://photoram.docs.apiary.io
