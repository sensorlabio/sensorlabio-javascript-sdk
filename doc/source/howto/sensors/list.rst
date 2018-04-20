Get sensors list
~~~~~~~~~~~~~~~~

You can get sensors list for authenticated user like this:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.list(options)
             .then((sensors_response) => {
                console.log(sensors_response);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `SensorsResponse` object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.list(options)
             .then((sensors_response) => {
                console.log(sensors_response.page);
                console.log(sensors_response.count);
                console.log(sensors_response.sensors);
             });

Parameters of `SensorsResponse`:

    - `page` - amount of pages available
    - `count` - amount of sensors
    - `sensors` - an array of sensors on this page. This is an array of `Sensor` models objects.

You can provide `options` as an object with this parameters:

    - `page` - by default will 1.
    - `name` - filter sensors by name.
    - `uniqueid` - filter by uniqueid.
    - `imei` - filter by imei.

All options filter parameters can be used at the same time, but it will search with "AND" condition.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.list(options)
             .catch((response) => {
                console.log(response.status);
             });

Output::

    401

There are no codes or special error for this action. ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.