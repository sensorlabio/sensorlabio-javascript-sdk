User Authentication
~~~~~~~~~~~~~~~~~~~

You can authenticate user and get an authorization token:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.user_token(email, password)
             .then((user) => {
                console.log(user);
             })
             .catch((response) => {
                console.log(response);
             });

On success `User` model object will be returned in promise with generated jwt `token`:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.user_token(email, password)
             .then((user) => {
                console.log(user.token);
             });

Output::

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMTY1ZTQ4MmJlYzJkZjg4N2M2YTMiLCJpYXQiOjE1MjIxNDY0MTYsImV4cCI6MTUyMjIzMjgxNn0.-6kJm1Rbd_SPbuwc6kg6FHuJnUii8FtKI9DXR0J5-Ig

Token will be automatically saved in SensorlabApi object and used for future requests.
You can get token from User model or with method `SensorlabApi.getToken()` and save it for future requests.

.. note:: Not every endpoint is available for user token. You will find more information in the endpoint description itself.