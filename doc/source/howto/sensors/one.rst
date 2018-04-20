Get sensor by id
~~~~~~~~~~~~~~~~

You can get sensor by its id:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.one(sensor_id)
             .then((sensor) => {
                console.log(sensor);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `Sensor` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.one(sensor_id)
             .then((sensor) => {
                console.log(sensors_response.id);
                console.log(sensors_response.uniqueid);
                console.log(sensors_response.imei);
                console.log(sensors_response.name);
             });

Parameters of `Sensors`:

    - `id` - id in the database.
    - `uniqueid` - uniqueid parameter.
    - `uniqueid` - sensors imei.
    - `name` - sensors name.

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