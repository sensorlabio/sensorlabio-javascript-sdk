Update sensor alert configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is how you can update new sensor alert configuration:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.update(sensor, alert, threshold_type, measurement_type, threshold_value)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type ApiResponse with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.update(sensor, alert, threshold_type, measurement_type, threshold_value)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Method parameters:

    - `sensor` - Sensor's ID
    - `alert` - Alert's ID.
    - `threshold_type` - threshold type.
    - `measurement_type` - measurement type.
    - `threshold_value` - threshold value.

Codes and messages for validation errors:

    - code=2 - field=sensor - `sensor` field should be a correct UUID format
    - code=4 - field=id - `id` field should be a correct UUID format
    - code=5 - field=threshold_type - `threshold_type` is required
    - code=6 - field=threshold_type - `threshold_type` must be `min`, `max` or `loc`
    - code=7 - field=measurement_type - `measurement_type` is required
    - code=8 - field=threshold_value - `threshold_value` is required
    - code=9 - field=threshold_value - `threshold_value` for `threshold_type` "min" must be a correct float
    - code=10 - field=threshold_value - `threshold_value` for `threshold_type` "max" must be a correct float
    - code=11 - field=threshold_value - `threshold_value` for `threshold_type` "loc" must be a correct JSON object with `lat`, `lng` and `radius` parameters
    - code=12 - field=threshold_value - `threshold_value.lat` must be correct latitude
    - code=13 - field=threshold_value - `threshold_value.lng` must be correct longitude
    - code=14 - field=threshold_value - `threshold_value.radius` must be correct positive integer

.. note::
    Available for:

    - User token
    - Application token