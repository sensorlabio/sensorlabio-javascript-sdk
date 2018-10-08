Signup User
~~~~~~~~~~~

You can run signup process using Javascript SDK:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.signup(email, password, password_check)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If signup was successfull promise with response type ApiResponse will return with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.signup(email, password, password_check)
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
    User has been successfully signed up.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.users.signup()
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
    Please, provide email. This cannot be empty

Messages for codes:

    - `code=100` - `"User has been successfully signed up."`
    - `code=1` - `"Please, provide email. This cannot be empty"`
    - `code=2` - `"Please, provide correct email."`
    - `code=3` - `"Someone already registered this email."`
    - `code=4` - `"Please provide both \"password\" and \"password_check\" fields. They cannot be empty."`
    - `code=5` - `"Both \"password\" and \"password_check\" fields must be equal."`

.. note:: Messages are just text information and can be changed by developers.