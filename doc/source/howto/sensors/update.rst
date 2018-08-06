Update sensor
~~~~~~~~~~~~~

This is how you can update sensors:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.update(sensor_id, name, application)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type ApiResponse with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.update(sensor_id, name, application)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Codes and messages for validation errors:

    - `code=1` - `"Please, provide name field. This cannot be empty."`
    - `code=2` - `"Application ID is incorrect."`

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to sensors assigned to this application.