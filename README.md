# BlogAPI

## Backend NodeJS Second Semester Examination Project
#### A blogging-API built in partial fulfilment of the Altschool of Engineering focused in Backend Engineering (NodeJS) Second Semester Requirement by <a href="https://www.github.com/baccrie/altschool-exam-NodeJS">baccrie</a>, a Backend Engineering student at <a href="https://altschoolafrica.com/schools/engineering">AltSchool Africa</a>.


##### Tools/Languages

<div align="left">

- Javascript
- Node.js
- Express.js
- MongoDB

</div>


#### Clone this repo

```sh
git clone https://github.com/Psalmzee/BlogAPI-API.git
```

#### Install project dependencies

```sh
npm install
```

#### Update .env with [example.env](https://github.com/Psalmzee/BlogAPI-API/blob/main/example.env)

#### Run a development server

```sh
npm run dev
```

#### For testing, run

```sh
npm run test
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
  "username": "baccrie",
  "email": "test@gmail.com",
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
    "username": "baccrie",
    "email": "test@gmail.com",
    "articles": [],
    "_id": "6367c296ba7522bd8561e4f6"
  }
}
```

---

### Logging in

- Route: /api/login
- Method: POST

:point_down: req.body

```json
{
  "username": "baccrie",
  "password": "password"
}
```

:point_down: Response

```json
{
  "token": {token},
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

:point_down: Body

```json
{
  "title": "The Rise and fall of the Northern Empire",
  "tags": ["memoirs", "expose", "fun"],
  "description": "History of the northern people of Nigeria, a Popular myth",
  "body": "lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "title": "The Rise and fall of the Northern Empire",
    "description": "History of the northern people of Nigeria, a Popular myth",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "draft",
    "read_count": 0,
    "tags": ["memoirs", "expose", "fun"],
    "body": "lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!",
    "_id": "6367cc2271c384885108032f",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T15:00:50.202Z",
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

- Route: /api/blog/p
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

:point_down: Response

```json
{
    "status": "success",
    "data": {
        "_id": "6367cc2271c384885108032f",
        "title": "The witcher",
        "description": "The witch who falls inlove",
        "author": {
            "_id": "6367c296ba7522bd8561e4f6",
            "username": "samAltschooler123"
        },
        "state": "published",
        "read_count": 1,
        "tags": [
            "memoirs",
            "expose"
        ],
        "body": "lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!",
        "createdAt": "2022-11-06T15:00:50.202Z",
        "updatedAt": "2022-11-06T19:38:16.100Z",
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

:point_down: Body

```json
{
  "state": "published"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "_id": "6367cc2271c384885108032f",
    "title": "The witcher",
    "description": "The witch who falls inlove",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "published",
    "read_count": 0,
    "tags": ["memoirs", "expose", "fun"],
    "body": "lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T16:17:45.137Z",
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

:point_down: Body

```json
{
  "tags": ["memoirs", "expose"],
  "body": "Here is the updated content: lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!"
}
```

:point_down: Response

```json
{
  "status": "success",
  "data": {
    "_id": "6367cc2271c384885108032f",
    "title": "The witcher",
    "description": "The witch who falls inlove",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "published",
    "read_count": 0,
    "tags": ["memoirs", "expose"],
    "body": "Here is the updated content: lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!vlorem ipsum!lorem ipsum!vvvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!vvlorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!lorem ipsum!",
    "createdAt": "2022-11-06T15:00:50.202Z",
    "updatedAt": "2022-11-06T16:22:29.326Z",
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

- Project Link: [BlogAPI](https://github.com/Psalmzee/BlogAPI-API)

---
## PROJECT OWNER
- NAME: Samson Okeji 
- ALTSCHOOL EMAIL: engrsamsonokeji@gmail.com
- TRACK: Backend Engineering (NodeJS)


