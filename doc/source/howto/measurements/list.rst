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

You can provide `options` as an object with this parameters:

    - `next` - by default will null.
    - `type` - filter by measurement type.
    - `sensor_id` - filter by sensor id.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.measurements.list()
             .catch((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
                response.errors.forEach((error) => { //validation errors
                   console.log(error.code);
                   console.log(error.message);
                   console.log(error.param);
                });
             });

Codes and messages for validation errors:

    - `code=1` - `field=sensor_id` - `This is not correct id format.`.
    - `code=2` - `field=next` - `This is not correct id format.`.

.. note:: Messages are just text information and can be changed by developers.

ApiResponse will have status `401` with `message`=`Unauthorized` if credentials are wrong.

Action will throw `ApiResponse` with status=`422` on validation error.