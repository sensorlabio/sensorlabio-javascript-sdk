Get last measurement for public sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can get access to `Measurements` for public `Sensor` using only Public Api Key from your `Application`.

On success you will get promise with `Measurement` model object.

.. code-block:: javascript

    sensor.public.last(public_api_key, options)
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