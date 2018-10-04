Create sensor alert configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is how you can create new sensor alert configuration:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.create(sensor, threshold_type, measurement_type, threshold_value)
             .then((sensor_alert) => {
                console.log(sensor_alert);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `SensorAlert` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.create(sensor, threshold_type, measurement_type, threshold_value)
             .then((sensor_alert) => {
                console.log(sensor_alert.id);
                console.log(sensor_alert.threshold_type);
                console.log(sensor_alert.measurement_type);
                console.log(sensor_alert.threshold_value);
             });

Method parameters:

    - `sensor` - Sensor's ID
    - `threshold_type` - threshold type.
    - `measurement_type` - measurement type.
    - `threshold_value` - threshold value.

Parameters of `SensorAlert`:

    - `id` - id in the database.
    - `threshold_type` - threshold type.
    - `measurement_type` - measurement type.
    - `threshold_value` - threshold value.


Codes and messages for validation errors:

    - code=2 - field=sensor - `sensor` field should be a correct UUID format
    - code=3 - field=threshold_type - `threshold_type` is required
    - code=4 - field=threshold_type - `threshold_type` must be `min`, `max` or `loc`
    - code=5 - field=measurement_type - `measurement_type` is required
    - code=6 - field=threshold_value - `threshold_value` is required
    - code=7 - field=threshold_value - `threshold_value` for `threshold_type` "min" must be a correct float
    - code=8 - field=threshold_value - `threshold_value` for `threshold_type` "max" must be a correct float
    - code=9 - field=threshold_value - `threshold_value` for `threshold_type` "loc" must be a correct JSON object with `lat`, `lng` and `radius` parameters
    - code=10 - field=threshold_value - `threshold_value.lat` must be correct latitude
    - code=11 - field=threshold_value - `threshold_value.lng` must be correct longitude
    - code=12 - field=threshold_value - `threshold_value.radius` must be correct positive integer

.. note::
    Available for:

    - User token
    - Application token