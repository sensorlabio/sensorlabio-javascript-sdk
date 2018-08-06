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

.. note::
    Available for:

    - User token