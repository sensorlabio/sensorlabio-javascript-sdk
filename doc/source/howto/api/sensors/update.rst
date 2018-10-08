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

    - code=1 - field=name - Please, provide name field. This cannot be empty
    - code=2 - field=application - `application` must be correct UUID format
    - code=3 - field=is_public - `is_public` must be correct boolean format

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to sensors assigned to this application.