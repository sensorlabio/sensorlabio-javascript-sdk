Get last measurement for sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Every `Sensor` model has access to the measurement methods. You can get last measurement for specified sensor:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.one(sensor_id)
             .then((sensor) => {
                sensor.measurements.last(options).then((measurement) => {
                    console.log(measurement);
                });
             });

On success you will get promise with `Measurement` model object.

.. code-block:: javascript

    sensor.measurements.last(options)
             .then((measurement) => {
                console.log(measurement.type);
                console.log(measurement.value);
                console.log(measurement.timestamp);
             });

Parameters of `Measurement` model object:

    - `type` - measurement type
    - `value` - value array
    - `timestamp` - timestamp measurement was created

You can provide `options` as an object with this parameters:

    - `type` - filter by measurement type.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to measurements of sensors assigned to this application.