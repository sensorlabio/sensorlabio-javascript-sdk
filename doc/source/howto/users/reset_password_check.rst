Password reset check
~~~~~~~~~~~~~~~~~~~~

You can check reset password token with Javascript SDK:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_check(token)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If request was success a promise with response will be returned with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_check(token)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Output::

    100
    200
    true
    Token is correct.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_check(token)
             .catch((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Output::

    1
    200
    false
    You must provide token.

Messages for codes:

    - `code=100` - `"Token is correct."`
    - `code=1` - `"You must provide token."`
    - `code=2` - `"Token is incorrect or already has been used."`