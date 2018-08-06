Update application
~~~~~~~~~~~~~~~~~~

This is how you can update applications:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.update(application_id, name, description)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type ApiResponse with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.update(application_id, name, description)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Codes and messages for validation errors:

    - `code=1` - `"Please, provide name field. This cannot be empty."`

.. note::
    Available for:

    - User token