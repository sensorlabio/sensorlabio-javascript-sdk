Application Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~

You can authenticate application and get an authorization token:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.application_token(public_api_key, private_api_key)
             .then((application_token) => {
                console.log(application_token);
             })
             .catch((response) => {
                console.log(response);
             });

On success `ApplicationToken` model object will be returned in promise with generated jwt `token`:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.application_token(public_api_key, private_api_key)
             .then((application_token) => {
                console.log(application_token.token);
             });

Output::

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMTY1ZTQ4MmJlYzJkZjg4N2M2YTMiLCJpYXQiOjE1MjIxNDY0MTYsImV4cCI6MTUyMjIzMjgxNn0.-6kJm1Rbd_SPbuwc6kg6FHuJnUii8FtKI9DXR0J5-Ig

Token will be automatically saved in SensorlabApi object and used for future requests.
You can get token from User model or with method `SensorlabApi.getToken()` and save it for future requests.

.. note:: Not every endpoint is available for application token. You will find more information in the endpoint description itself.