Get measurements
~~~~~~~~~~~~~~~~

You can get measurments without being attached to sensor:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.measurements.list(options)
        .then((measurements_response) => {
            console.log(measurements_response);
        });
    });

On success you will get promise with `MeasurementsResponse` object.

.. code-block:: javascript

    api.measurements.list(options)
        .then((measurements_response) => {
            console.log(measurements_response.next);
            console.log(measurements_response.prev);
            console.log(measurements_response.measurements);
        });
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
    - `sensor` - filter by sensor id.
    - `timestamp_start` - filter by timestamp range - range start.
    - `timestamp_stop` - filter by timestamp range - range stop.

Codes and messages for validation errors:

    - code=1 - field=sensor_id - Please, provide sensor field. This cannot be empty
    - code=2 - field=sensor_id - This is not correct id format
    - code=3 - field=next - This is not correct id format
    - code=4 - field=timestamp_start - `timestamp_start` should be correct unix timestamp format
    - code=5 - field=timestamp_stop - `timestamp_stop` should be correct unix timestamp format
    - code=6 - field=timestamp_stop - `timestamp_stop` should be more or equal `timestamp_start`

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to measurements of sensors assigned to this application.