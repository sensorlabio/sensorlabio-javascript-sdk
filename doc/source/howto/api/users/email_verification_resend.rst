Email verification resend
~~~~~~~~~~~~~~~~~~~~~~~~~

In rare occasions email with verification link can be lost. In this case user can request email with verification code once more:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email_resend(email)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success - promise with response type ApiResponse will return with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email_resend(email)
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
    Sent new verification email.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.verify_email_resend(verification_token)
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
    Please, provide email. This cannot be empty.

Messages for codes:

    - `code=100` - `"Sent new verification email."`
    - `code=1` - `"Please, provide email. This cannot be empty."`
    - `code=2` - `"Please, provide correct email."`
    - `code=3` - `"User with this email does not exist."`
    - `code=4` - `"This email is verified already."`
    - `code=5` - `"Too much requests for this email. Please try again later."`