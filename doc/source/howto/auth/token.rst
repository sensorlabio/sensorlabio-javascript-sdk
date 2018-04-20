Authentication
~~~~~~~~~~~~~~

You can authenticate user and get an authorization token:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.token(email, password)
             .then((user) => {
                console.log(user);
             })
             .catch((response) => {
                console.log(response);
             });

On success `User` model object will be returned in promise with generated jwt `token`:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.token(email, password)
             .then((user) => {
                console.log(user.token);
             });

Output::

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMTY1ZTQ4MmJlYzJkZjg4N2M2YTMiLCJpYXQiOjE1MjIxNDY0MTYsImV4cCI6MTUyMjIzMjgxNn0.-6kJm1Rbd_SPbuwc6kg6FHuJnUii8FtKI9DXR0J5-Ig

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.token(email, password)
             .catch((response) => {
                console.log(response.status);
             });

Output::

    401

There are no codes or special error for this action. ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.

Token will be automatically saved in SensorlabApi object and used for future requests.
You can get token from User model or with method `SensorlabApi.getToken()` and save it for future requests.