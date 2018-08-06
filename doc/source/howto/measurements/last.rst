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

    - `sensor_id` - filter by sensor.
    - `type` - filter by measurement type.

Codes and messages for validation errors:

    - `code=1` - `field=sensor_id` - `Please, provide sensor field. This cannot be empty.`.
    - `code=2` - `field=sensor_id` - `This is not correct id format.`.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to measurements of sensors assigned to this application.