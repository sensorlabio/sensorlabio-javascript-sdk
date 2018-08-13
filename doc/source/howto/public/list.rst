Get measurements for public sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can get access to `Measurements` for public `Sensor` using only Public Api Key from your `Application`.

On success you will get promise with `MeasurementsResponse` object.

.. code-block:: javascript

    sensor.public.list(public_api_key, options)
             .then((measurements_response) => {
                console.log(measurements_response.page);
                console.log(measurements_response.count);
                console.log(measurements_response.measurements);
             });

Parameters of `MeasurementsResponse`:

    - `next` - next measurement id for pagination.
    - `prev` - previous measurement id for pagination.
    - `measurements` - an array of measurements on this page. This is an array of `Measurements` models objects.
    - `timestamp_start` - filter by timestamp range.
    - `timestamp_stop` - filter by timestamp range.

You can provide `options` as an object with this parameters:

    - `next` - by default will null.
    - `type` - filter by measurement type.
    - `sensor_id` - filter by sensor id.

Codes and messages for validation errors:

    - code=2 - field=sensor_id - This is not correct id format
    - code=3 - field=next - This is not correct id format
    - code=4 - field=timestamp_start - `timestamp_start` should be correct unix timestamp format
    - code=5 - field=timestamp_stop - `timestamp_stop` should be correct unix timestamp format
    - code=6 - field=timestamp_stop - `timestamp_stop` should be more or equal `timestamp_start`