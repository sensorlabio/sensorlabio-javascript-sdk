Get user profile
~~~~~~~~~~~~~~~~

You can get user's profile information

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.get()
             .then((profile) => {
                console.log(profile);
             })
             .catch((response) => {
                console.log(response);
             });

On success `Profile` model object will be returned in promise with available profile information:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.get()
             .then((profile) => {
                console.log(profile.email);
             });

Output::

    test@test.com

You can fetch profile with `User` model object that you got from authentication:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.get()
             .then((user) => {
                user.profile().then((profile) => {
                    console.log(profile.email);
                });
             });

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.get()
             .catch((response) => {
                console.log(response.status);
             });

Output::

    401

There are no codes or special error for this action. ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.