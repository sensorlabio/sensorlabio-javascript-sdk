Email verification
~~~~~~~~~~~~~~~~~~

You can run email verification with Javascript SDK:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email(verification_token)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If email verification was success promise with response type ApiResponse will return with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email(verification_token)
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
    Your email is now verified.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email(verification_token)
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
    You must provide verification token.

Messages for codes:

    - `code=100` - `"Your email is now verified."`
    - `code=1` - `"No verification token provided."`
    - `code=2` - `"Email verification token is incorrect or outdated."`