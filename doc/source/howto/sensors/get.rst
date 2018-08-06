Get sensor by id
~~~~~~~~~~~~~~~~

You can get sensor by its id:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.get(sensor_id)
             .then((sensor) => {
                console.log(sensor);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `Sensor` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.get(sensor_id)
             .then((sensor) => {
                console.log(sensors_response.id);
                console.log(sensors_response.uniqueid);
                console.log(sensors_response.imei);
                console.log(sensors_response.name);
             });

Parameters of `Sensor`:

    - `id` - id in the database.
    - `uniqueid` - uniqueid parameter.
    - `imei` - Sensor's imei.
    - `name` - Sensor's name.
    - `application` - Application ID sensor is connected to.
    - `batteryCharge` - Sensor's battery charge in percent.
    - `isBatteryCharging` - Indicates if battery is charging or not.
    - `isOnline` - Indicates if sensor is online and sending data or not.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to sensors assigned to this application.