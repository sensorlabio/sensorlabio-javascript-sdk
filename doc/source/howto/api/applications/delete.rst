Delete application
~~~~~~~~~~~~~~~~~~

This is how you can delete applications:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.delete(application_id)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type ApiResponse with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.delete(application_id)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

.. note::
    Available for:

    - User token
    - Application token