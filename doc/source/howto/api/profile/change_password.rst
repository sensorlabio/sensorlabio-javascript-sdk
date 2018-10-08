Change user password
~~~~~~~~~~~~~~~~~~~~

You can change password for authenticated users.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.change_password(old_password, new_password, new_password_check)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

On success `ApiResponse` object will be returned in promise with available profile information:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.profile.change_password(old_password, new_password, new_password_check)
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
    New password is set for user.

Codes and messages for validation errors:

    - `code=1` - `Please, provide old password. This cannot be empty.`
    - `code=2` - `You must provide new password.`
    - `code=3` - `You must provide new password check.`
    - `code=4` - `Password is incorrect. Please provide you current password.`
    - `code=5` - `Both "new password" and "new password check" values must be equal.`

.. note::
    Available for:

    - User token