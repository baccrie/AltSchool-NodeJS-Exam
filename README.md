# BlogAPI

## Backend NodeJS Second Semester Examination Project
#### A blogging-API built in partial fulfilment of the Altschool of Engineering focused in Backend Engineering (NodeJS) Second Semester Requirement by <a href="https://github.com/baccrie">baccrie</a>, a Backend Engineering student at <a href="https://github.com/baccrie/AltSchool-NodeJS-Exam">AltSchool Africa</a>.


##### Tools/Languages

<div align="left">

- Javascript
- Node.js
- Express.js
- MongoDB

</div>


#### Clone this repo

```sh
git clone https://github.com/baccrie/AltSchool-NodeJS-Exam
```

#### Install project dependencies

```sh
npm install
```

#### Update export the following env var or add a .env file in the repo to use proteted env var

PORT=PORT
DBURI=mongodb+srv://<username>:<password>@cluster0.vtauxfw.mongodb.net/<database>?retryWrites=true&w=majority
SECRET=some-secret-key

#### For testing, run

```sh
npm run
```

### Models

#### User

| field     | data_type     | constraints      |
| --------- | ------------- | ---------------- |
| username  | string        | required, unique |
| firstName | string        | required         |
| lastName  | string        | required         |
| email     | string        | required, unique |
| password  | string        | required         |
| articles  | ref - Article |                  |

#### Article

| field        | data_type  | constraints                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| title        | string     | required, unique                                         |
| description  | string     | optional                                                 |
| author       | ref - User |                                                          |
| owner        | string     |                                                          |
| state        | string     | required, default: 'draft', enum: ['draft', 'published'] |
| read_count   | Number     | default: 0                                               |
| reading_time | Number     |                                                          |
| tags         | array      | optional                                                 |
| body         | string     | required                                                 |

---

## Usage


### Creating a user

- Route: /api/signup
- Method: POST

req.body

```json
{
  "firstName": "Rilwan",
  "lastName": "Bakare",
  "username": "baccriee",
  "email": "testing@gmail.com",
  "password": "password"
}
```

res.json

```json
{
    "status": "success",
    "data": {
        "firstName": "Rilwan",
        "lastName": "Bakare",
        "username": "baccriee",
        "email": "testing@gmail.com",
        "articles": [],
        "_id": "652f022d8e5ba378cc77022c"
    }
}
```

---

### Logging in

- Route: /api/login
- Method: POST

Request

```json
{
  "username": "baccriee",
  "password": "password"
}
```

Response

```json
{
  "token": {JWT},
  "username": "baccrie",
  "name": "Bakare Rilwan"
}
```

---

### Create a Blog

- Route: /api/blog
- Method: POST
- Header
  - Authorization: Bearer {token}

Body

```json
{
  "title": "IREV2 Is Not An Election Results “Collation System” - INEC Clarifies",
  "tags": ["ELECTION", "INEC", "IREV"],
  "description": "Nigerian Election latest Update",
  "body": "The Independent National Electoral Commission says its results viewing portal is to enhance election transparency, and not a result collation or transmission system. The INEC Director of ICT, Paul Omokore, gave the clarification in his presentation titled, ‘The role of BVAS, IReV for Bayelsa, Kogi and Imo Governorship elections’ at a two-day capacity workshop for journalists on Monday in Akwanga, Nasarawa State. Omokore advised journalists and members of the public not to confuse uploading polling units’ results to the INEC Result Viewing Portal with the electronic transmission of results.He said that the INEC Bimodal Voter Accreditation System is only used to upload pictures of PUs’ results on form EC8A to IReV, which does not translate to electronic transmission of results."
}
```

Response

```json
{
    "status": "success",
    "data": {
        "title": "IREV2 Is Not An Election Results “Collation System” - INEC Clarifies",
        "description": "Nigerian Election latest Update",
        "author": "652f022d8e5ba378cc77022c",
        "state": "draft",
        "read_count": 0,
        "tags": [
            "ELECTION",
            "INEC",
            "IREV"
        ],
        "body": "The Independent National Electoral Commission says its results viewing portal is to enhance election transparency, and not a result collation or transmission system. The INEC Director of ICT, Paul Omokore, gave the clarification in his presentation titled, ‘The role of BVAS, IReV for Bayelsa, Kogi and Imo Governorship elections’ at a two-day capacity workshop for journalists on Monday in Akwanga, Nasarawa State. Omokore advised journalists and members of the public not to confuse uploading polling units’ results to the INEC Result Viewing Portal with the electronic transmission of results.He said that the INEC Bimodal Voter Accreditation System is only used to upload pictures of PUs’ results on form EC8A to IReV, which does not translate to electronic transmission of results.",
        "_id": "652f03c47a80de6ac257464a",
        "createdAt": "2023-10-17T21:59:32.385Z",
        "updatedAt": "2023-10-17T21:59:32.385Z",
        "reading_time": 1
    }
}
```

---

### Get all published blogs

- Route: /api/blog
- Method: GET
- Header
  - Authorization: Bearer {token}
  - None (Accessible to unauthenticated users)
- Query params:

  - page (default: 1)
  - size (default: 20)

  - Filters: Limit returned response by passing values to any of the following parameters:

    - author
    ```text
    /api/blog?author=Author
    ```
    - title
    ```text
    /api/blog?title=Title
    ```
    - tags: Separate multiple values with a comma 
    ```text
    /api/blog?tags=sql,database
    ```

  - Sort: Sort returned response by passing values matching the fields in the blog to the `orderby` parameter. To sort in descending order, add a `-` prefix. Separate multiple values with a comma
  
    Acceptable values include:
    - author
    - title
    - read_count
    - reading_time
    ```text
      /api/blog?orderby=title,-read_count
      ```

  - Fields: Set the fields to display in the returned response by passing values matching the fields in the blog to the `fields` parameter. To omit any fields, add a `-` prefix. Separate multiple values with a comma
  
    Default fields are `title` and `tags`. Acceptable values include:
    - author
    - title
    - body
    - read_count
    - reading_time
    ```text
      /api/blog?fields=body,-tags,reading_time
      ```


---

### Get all created blogs by authenticated user

- Route: /api/blog/
- Method: GET
- Header
  - Authorization: Bearer {token}
- Query params:

  - page (default: 1)
  - size (default: 20)

  - Filters: Limit returned response by passing values to any of the following parameters:

    - state
    ```text
    /api/blog?state=draft
    ```

    ```text
    /api/blog?state=published
    ```

    - title
    ```text
    /api/blog?title=Title
    ```
    - tags: Separate multiple values with a comma 
    ```text
    /api/blog?tags=sql,database
    ```

  - Sort: Sort returned response by passing values matching the fields in the blog to the `orderby` parameter. To sort in descending order, add a `-` prefix. Separate multiple values with a comma
  
    Acceptable values include:
    - title
    - read_count
    - reading_time
    ```text
      /api/blog?orderby=title,-read_count
      ```

  - Fields: Set the fields to display in the returned response by passing values matching the fields in the blog to the `fields` parameter. To omit any fields, add a `-` prefix. Separate multiple values with a comma
  
    Default fields are `title` and `tags`. Acceptable values include:
    - author
    - title
    - body
    - read_count
    - reading_time
    ```text
      /api/blog?fields=body,-tags,reading_time
      ```

---

### Get specific blog

- Route: /api/blog/:articleId
- Method: GET
- Header
  - Authorization: Bearer {token}
  - None (Published blogs accessible to unauthenticated users)

Response

```json
{
    "status": "success",
    "data": {
        "_id": "652f03c47a80de6ac257464a",
        "title": "IREV Is Not An Election Results “Collation System” - INEC Clarifies",
        "description": "Nigerian Election latest Update",
        "author": {
            "_id": "652f022d8e5ba378cc77022c",
            "username": "baccrie"
        },
        "state": "draft",
        "read_count": 1,
        "tags": [
            "ELECTION",
            "INEC",
            "IREV"
        ],
        "body": "The Independent National Electoral Commission says its results viewing portal is to enhance election transparency, and not a result collation or transmission system. The INEC Director of ICT, Paul Omokore, gave the clarification in his presentation titled, ‘The role of BVAS, IReV for Bayelsa, Kogi and Imo Governorship elections’ at a two-day capacity workshop for journalists on Monday in Akwanga, Nasarawa State. Omokore advised journalists and members of the public not to confuse uploading polling units’ results to the INEC Result Viewing Portal with the electronic transmission of results.He said that the INEC Bimodal Voter Accreditation System is only used to upload pictures of PUs’ results on form EC8A to IReV, which does not translate to electronic transmission of results.",
        "createdAt": "2023-10-17T21:59:32.385Z",
        "updatedAt": "2023-10-17T22:03:35.825Z",
        "reading_time": 1
    }
}
```

---

### Update the state of a Blog

- Route: /api/blog/:articleId
- Method: PATCH
- Header
    - Authorization: Bearer {token}

Body

```json
{
  "state": "published"
}
```

Response

```json
{
    "status": "success",
    "data": {
        "_id": "652f03c47a80de6ac257464a",
        "title": "IREV2 Is Not An Election Results “Collation System” - INEC Clarifies",
        "description": "Nigerian Election latest Update",
        "author": "652f022d8e5ba378cc77022c",
        "state": "published",
        "read_count": 1,
        "tags": [
            "ELECTION",
            "INEC",
            "IREV"
        ],
        "body": "The Independent National Electoral Commission says its results viewing portal is to enhance election transparency, and not a result collation or transmission system. The INEC Director of ICT, Paul Omokore, gave the clarification in his presentation titled, ‘The role of BVAS, IReV for Bayelsa, Kogi and Imo Governorship elections’ at a two-day capacity workshop for journalists on Monday in Akwanga, Nasarawa State. Omokore advised journalists and members of the public not to confuse uploading polling units’ results to the INEC Result Viewing Portal with the electronic transmission of results.He said that the INEC Bimodal Voter Accreditation System is only used to upload pictures of PUs’ results on form EC8A to IReV, which does not translate to electronic transmission of results.",
        "createdAt": "2023-10-17T21:59:32.385Z",
        "updatedAt": "2023-10-17T22:05:37.655Z",
        "reading_time": 1
    }
}
```


---

### Update the contents of a Blog

- Route: /api/blog/:articleId
- Method: PUT
- Header
- Authorization: Bearer {token}

Body

```json
{
  "tags": ["INEC", "OMOKRI"],
  "body": "This blog post has been updated"
}
```

Response

```json
{
    "status": "success",
    "data": {
        "_id": "652f03c47a80de6ac257464a",
        "title": "IREV Is Not An Election Results “Collation System” - INEC Clarifies",
        "description": "Nigerian Election latest Update",
        "author": "652f022d8e5ba378cc77022c",
        "state": "published",
        "read_count": 1,
        "tags": [
            "INEC",
            "OMOKRI"
        ],
        "body": "This blog post has been updated",
        "createdAt": "2023-10-17T21:59:32.385Z",
        "updatedAt": "2023-10-17T22:07:44.283Z",
        "reading_time": 1
    }
}
```


---

### Delete a Blog

- Route: /api/blog/:articleId
- Method: DELETE
- Header
- Authorization: Bearer {token}


---

- Project Link: [BlogAPI](https://github.com/baccrie/AltSchool-NodeJS-Exam)

---
## PROJECT OWNER
- AUTHOR - Bakare Rilwan