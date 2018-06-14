Get last measurement
~~~~~~~~~~~~~~~~~~~~

You can get last measurment without being attached to sensor:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.measurements.last(options).then((measurement) => {
        console.log(measurement);
    });

On success you will get promise with `Measurement` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.measurements.last(options)
             .then((measurement) => {
                console.log(measurement.id);
                console.log(measurement.sensor_id);
                console.log(measurement.type);
                console.log(measurement.value);
                console.log(measurement.created);
             });

Parameters of `Measurement` model object:

    - `id` - id in the database.
    - `sensor_id` - id of `Sensor`
    - `type` - measurement type
    - `value` - value array
    - `created` - datetime measurement was created

You can provide `options` as an object with this parameters:

    - `type` - filter by measurement type.
    - `sensor_id` - filter by sensor.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    api.measurements.list(options)
             .catch((response) => {
                console.log(response.status);
             });

Output::

    401

There are no codes or special error for this action. ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.