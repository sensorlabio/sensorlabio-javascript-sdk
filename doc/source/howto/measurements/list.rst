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
            console.log(measurements_response.page);
            console.log(measurements_response.count);
            console.log(measurements_response.measurements);
        });
    });

Parameters of `MeasurementsResponse`:

    - `page` - amount of pages available.
    - `count` - amount of measurements total.
    - `measurements` - an array of measurements on this page. This is an array of `Measurements` models objects.

You can provide `options` as an object with this parameters:

    - `page` - by default will 1.
    - `type` - filter by measurement type.
    - `sensor_id` - filter by sensor id.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    api.measurements.list(options)
        .catch((response) => {
            console.log(response.status);
        });
    });

Output::

    401

There are no codes or special error for this action. ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.