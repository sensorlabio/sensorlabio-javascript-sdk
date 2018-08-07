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

Parameters of `Sensor`:

    - `id` - id in the database.
    - `imei` - Sensor's imei.
    - `name` - Sensor's name.
    - `application` - Application ID sensor is connected to.
    - `batteryCharge` - Sensor's battery charge in percent.
    - `isBatteryCharging` - Indicates if battery is charging or not.
    - `isOnline` - Indicates if sensor is online and sending data or not.

You can provide `options` as an object with this parameters:

    - `page` - by default will 1.
    - `name` - filter sensors by name.
    - `id` - filter by ID.
    - `imei` - filter by imei.
    - `online_status` - pass "online" to search for online sensors or "offline" for offline sensors.
    - `battery_charge_min` - filter sensors by battery charge.
    - `battery_charge_max` - filter sensors by battery charge.
    - `sort` - sorting parameter, looks like "`fieldname,order`". Example: "`name,asc`"
        Possible sort fields:
            - `name`
            - `created`
        Possible order types:
            - `asc`
            - `desc`

All options filter parameters can be used at the same time, but it will search with "AND" condition.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to sensors assigned to this application.