Delete sensor alert configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is how you can delete sensor alert configuration:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alert.delete(sensor, alert)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type `ApiResponse` with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alert.delete(sensor, alert)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Codes and messages for validation errors:

    - code=2 - field=sensor - `sensor` field should be a correct UUID format
    - code=4 - field=id - `id` field should be a correct UUID format

.. note::
    Available for:

    - User token
    - Application token