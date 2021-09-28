## Photoram | Your image repository

### Overview
---
This repository is an example of an image repository API. The main functionalities are add/remove/get an image or multiple images at once. The system was developed using Node.js and Express for the core of the API, Mongoose to connect with the MongoDB databse, and Jest with Supertest for the testing.

### Get Started
---
To test this API, you can either clone this project and run it locally on your machine or use this API URL hosted on Heroku to test the endpoints: XXXXXX.

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

### Endpoints
---

**GET** /user/:id

This endpoint returns the user object given an user id.

```
Request example

$ curl -i http://api-url/api/user/61515854031cb0eb1dd6e457
```

```
Response example

{
    "_id": "61515854031cb0eb1dd6e457",
    "name": "Anna Gabriela",
    "email": "anna@gmail.com"
}
```

**POST** /user/

This endpoint creates a new user and returns the user object created.

```
Request example

$ curl -i http://api-url/api/user/

{
    "name": "John Doe",
    "email": "john@doe.com"
}
```

```
Response example

{
    "name": "John Doe",
    "email": "john@doe.com",
    "_id": "61516324778c74b830b08b5a",
    "__v": 0
}
```

**GET** /image/:id

This endpoint returns the image object given an image id.

```
Request example

$ curl -i http://api-url/api/image/61515891031cb0eb1dd6e45a
```

```
Response example

{
    "_id": "61515891031cb0eb1dd6e45a",
    "url": "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1561&q=80",
    "tags": [
        "Woman",
        "Laptop",
        "Table Top",
        "Chair",
        "Mountain"
    ],
    "isPrivate": false,
    "uploadDate": "2021-09-27T03:00:00.000Z",
    "publisherId": "61515854031cb0eb1dd6e457"
}
```

**POST** /image/

This endpoint creates a new image and returns the image object created.

```
Request example

$ curl -i http://api-url/api/image/

{
    "url": "http://placeimg.com/640/480",
    "publisherId": "61516324778c74b830b08b5a"
}
```

```
Response example

{
    "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/team/hero-small-dd914b46ac62310cad1f8aa0a6c9da10eb0b9ff627d00931ec55224266587a41.jpg",
    "tags": [],
    "isPrivate": false,
    "publisherId": "61516324778c74b830b08b5a",
    "uploadDate": "2021-09-28T00:48:45.719Z",
    "_id": "615266b7a2ff99208e36d291",
    "__v": 0
}
```

**DELETE** /image/

This endpoint deletes an image given an id and returns the deleted image object.

```
Request example

$ curl -i http://api-url/api/image/61516de5031cb0eb1dd6e475
```

```
Response example

{
    "_id": "61516de5031cb0eb1dd6e475",
    "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/team/hero-small-dd914b46ac62310cad1f8aa0a6c9da10eb0b9ff627d00931ec55224266587a41.jpg",
    "tags": [],
    "isPrivate": false,
    "publisherId": "61516324778c74b830b08b5a",
    "uploadDate": "2021-09-27T06:51:25.840Z",
    "__v": 0
}
```
**GET** /images/:publisherId

This endpoint returns all public images and private images from the current user. This endpoint uses pagination, it returns a variable with the next page which returns -1 if is doesn't have one.

```
Request example

$ curl -i http://api-url/api/image/61515854031cb0eb1dd6e451
```

```
Response example

{
    "images": [
        {
            "_id": "615266b7a2ff99208e36d291",
            "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/team/hero-small-dd914b46ac62310cad1f8aa0a6c9da10eb0b9ff627d00931ec55224266587a41.jpg",
            "tags": [],
            "isPrivate": false,
            "uploadDate": "2021-09-28T00:48:45.719Z",
            "__v": 0,
            "isOwner": false
        },
        {
            "_id": "6152682b04ca38b0324df366",
            "url": "http://placeimg.com/640/480",
            "tags": [],
            "isPrivate": false,
            "uploadDate": "2021-09-28T00:56:04.505Z",
            "__v": 0,
            "isOwner": false
        }
    ],
    "nextPage": -1
}
```

**POST** /images/

This endpoint creates multiple images and returns the array of the images created.

```
Request example

$ curl -i http://api-url/api/image/

{
    "images": [
        {
            "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/culture/hero-image-small-7f550f0e7f3c91f7e206aceb2a93a057d9ad8f653daf3e7a3b73006b512d6a1d.jpg",
            "publisherId": "61515854031cb0eb1dd6e457"
        },
        {
            "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/culture/shopify-employee-sitting-on-office-couch-with-a-window-small-ceea1bae7a52fc75b49ddf8e08a3c0bf8a2595f0c56fc8dbe4a7a2c392788fec.jpg", 
            "publisherId": "61515854031cb0eb1dd6e457"
        }
    ]
}
```

```
Response example

[
    {
        "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/culture/hero-image-small-7f550f0e7f3c91f7e206aceb2a93a057d9ad8f653daf3e7a3b73006b512d6a1d.jpg",
        "tags": [],
        "isPrivate": false,
        "publisherId": "61515854031cb0eb1dd6e457",
        "uploadDate": "2021-09-28T01:42:26.080Z",
        "_id": "615274b0cec02e980714866f",
        "__v": 0
    },
    {
        "url": "https://cdn.shopify.com/shopifycloud/brochure/assets/culture/shopify-employee-sitting-on-office-couch-with-a-window-small-ceea1bae7a52fc75b49ddf8e08a3c0bf8a2595f0c56fc8dbe4a7a2c392788fec.jpg",
        "tags": [],
        "isPrivate": false,
        "publisherId": "61515854031cb0eb1dd6e457",
        "uploadDate": "2021-09-28T01:42:26.080Z",
        "_id": "615274b0cec02e9807148670",
        "__v": 0
    }
]
```

**DELETE** /images/

This endpoint deletes multiple images given their id and returns the amount of deleted images.

```
Request example

$ curl -i http://api-url/api/image/61516de5031cb0eb1dd6e475

{
    "images": ["615169fe7fe3d3fae17c49ec", "61516a007fe3d3fae17c49ee"]
}
```

```
Response example

{
    "deletedCount": 2
}
```

