Password reset request
~~~~~~~~~~~~~~~~~~~~~~

You request password reset for user using Javascript SDK:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_request(email)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If request was success a promise with response will be returned with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_request(email)
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
    Password reset link has been sent to your email

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.reset_password_request(email)
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
    Please, provide an email to reset password

Messages for codes:

    - `code=100` - `"Password reset link has been sent to your email"`
    - `code=1` - `"Please, provide an email to reset password"`
    - `code=2` - `"There's no such user in the database"`
    - `code=3` - `"Too much password reset requests"`