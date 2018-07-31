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
                console.log(measurement.id);
                console.log(measurement.sensor_id);
                console.log(measurement.type);
                console.log(measurement.value);
                console.log(measurement.received);
                console.log(measurement.created);
                console.log(measurement.measurementgroup);
             });

Parameters of `Measurement` model object:

    - `id` - id in the database.
    - `sensor_id` - id of `Sensor`
    - `type` - measurement type
    - `value` - value array
    - `received` - datetime measurement was received
    - `created` - datetime measurement was created
    - `measurementgroup` - measurement group

You can provide `options` as an object with this parameters:

    - `type` - filter by measurement type.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    sensor.measurements.list(options)
             .catch((response) => {
                console.log(response.status);
             });

Output::

    401

ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.

ApiResponse will have status `404` with `message` = `Not Found` if there's no measurement.

Action will throw `ApiResponse` with `status` = `422` on validation error.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to measurements of sensors assigned to this application.