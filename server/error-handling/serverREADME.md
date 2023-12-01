# API endpoints 

**Introduction:**



**Work Solutions routes**


**Users routes**

| **HTTP Method** | **URI path**              | **Description**                    |
| --------------- | ------------------------- | ---------------------------------- |
| GET             | `/api/users/list`         | List of all registered users       |
| GET             | `/api/users/:_id`         | Specific user details by ID        |
| PUT             | `/api/user/:_id/edit`     | Update the info of a specific user |
| DELETE          | `/api/users/:_id/delete`  | Delete a specific user             |


**Posts routes**

| HTTP Method | URI path                | Description                        |
| ----------- | ----------------------- | -----------------------------------|
| POST        | `/api/newpost`          | Create New Post                    |
| GET         | `/api/allposts`         | List of Posts                      |
| GET         | `/api/post/:postId`     | Specific Post details by ID        |
| PUT         | `/api/post/:_id/edit`   | Update the info of a specific Post |
| DELETE      | `/api/post/:_id/delete` | Delete a specific Post             |
| POST        | `/api/addCompany`       | Add company to my FavCompanys      |


**Documentation routes**

| **HTTP Method** | **URI path**           | **Description**             |
| --------------- | -----------------------| ----------------------------|
| GET             | `/api/documents `      | List of documents           |
| POST            | `/api/documents`       | Uploads a new document      |
| DELETE          | `/api/documents/:docId`| Deletes a specific document |    



**Auth routes**

| **HTTP Method** | **URI path** | **Description**   |
| --------------- | ------------ | ----------------- |
| POST            | `/signup`    | Signup            |
| POST            | `/login`     | Login user        |
| PUT             | `/edit/:id`  | Login user        |
| GET             | `/verify`    | Verify Auth token |
| POST            | `/logout`    | Verify Auth token |

