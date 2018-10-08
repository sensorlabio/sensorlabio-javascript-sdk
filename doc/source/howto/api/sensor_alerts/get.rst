Get sensor alert configuration by id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can get sensor alert configuration by its id:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.get(sensor, alert)
             .then((sensor_alert) => {
                console.log(sensor_alert);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `SensorAlert` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.get(sensor, alert)
             .then((sensor_alert) => {
                console.log(sensor_alert.id);
                console.log(sensor_alert.threshold_type);
                console.log(sensor_alert.measurement_type);
                console.log(sensor_alert.threshold_value);
             });

Method parameters:

    - `sensor` - Sensor's ID
    - `alert` - Alert's ID

Parameters of `SensorAlert`:

    - `id` - id in the database.
    - `threshold_type` - threshold type.
    - `measurement_type` - measurement type.
    - `threshold_value` - threshold value.

.. note::
    Available for:

    - User token
    - Application token