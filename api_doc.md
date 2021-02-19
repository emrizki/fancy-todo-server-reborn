## **Register User**

return json data in the form of id and email from user.

- **URL**

  /users/register

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  NO

- **Data Body**

  **Required:**

  `first_name=[string]`
  `email=[string]`
  `password=[string]`

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:** `{ "id": 5, "email": "rizko@mail.com" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Invalid Email / Password Format" }`

  OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Password at least 6 characters" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/register`,
    data: {
      first_name,
      last_name,
      email,
      password,
    },
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  })
    .done((response) => {
      console.log(response);
      showLoginPage();
    })
    .fail((xhr, textStatus) => {
      console.log(xhr, textStatus);
    });
  ```
## **Login User**

return json data in the form of access_token and full_name from user.

- **URL**

  /users/login

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  NO

- **Data Body**

  **Required:**

  `email=[string]`
  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "access_token": <generate_token>, "full_name": "Mochamad Rizki" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Invalid Password / Email" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('full_name_user', response.full_name);
      showMainPage();
    })
    .fail((xhr, textStatus) => {
      console.log(xhr, textStatus);
    })
    .always((_) => {
      $('#email-input').val('');
      $('#password-input').val('');
    });
  ```
## **POST Todo**

return json data in the form of title, description, status and due_date from todo.

- **URL**

/todos

- **Method:**

`POST`

- **URL Params**

**Required:**

NO

- **Data Headers**

**Required:**

`access_token: <token>`

- **Data Body**

**Required:**

`status=[string]`
`due_date=[date]`

- **Success Response:**

- **Code:** 201 CREATED <br />
  **Content:**  `{
    "id": 1,
    "title": "isi title",
    "description": "isi description",
    "status": "isi status",
    "due_date": "2021-05-05",
    "UserId": 1,
    "updatedAt": "2021-02-19T09:02:14.340Z",
    "createdAt": "2021-02-19T09:02:14.340Z"
}`

- **Error Response:**

- **Code:** 500 INTERNAL SERVER ERROR<br />
  **Content:** `{
    "message": "Internal Server Error",
    "msg": "Validation error: Status is required"
}`

- **Error Response:**

- **Code:** 400 BAD REQUEST<br />
  **Content:** `{
    "message": "do not enter the date that is past today"
}`

- **Sample Call:**

```javascript
$.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      fetchTodos()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
    })
    .always(_ => {
      $("#title-input").val("")
      $("#description-input").val("")
      $("#status-input").val("")
      $("#due_date-input").val("")
    })
```