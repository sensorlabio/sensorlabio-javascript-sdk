Password reset
~~~~~~~~~~~~~~

You can run reset password action with Javascript SDK:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password(token, password, password_check)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If request was success a promise with response will be returned with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password(token, password, password_check)
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
    Password updated.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password(token, password, password_check)
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

    - `code=100` - `"Password updated."`
    - `code=1` - `"You must provide token."`
    - `code=2` - `"Token is incorrect or already has been used."`
    - `code=3` - `"Both \"password\" and \"password_check\" fields must be equal."`