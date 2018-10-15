Public Measurements
===================

You can receive measurements from public sensors using websockets.

In order to connect to websockets you should get public api key for your application.

With public api key you can connect to /public namespace:

.. code-block:: javascript

    var ws = new sdk.SensorlabWebsockets();
    let public_ws = new ws.public();

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
    }).catch((error) => {
        console.log(error);
    });

If there are problems with connection or authentication promise will throw an exception.

.. code-block:: javascript

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
    }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
    });

In case authentication problems exception code will be "401" with message "Authentication error. Please check your token."

If connection problem - SDK will throw exception with code "0" and message "Connection error"

When connected, you can join sensor rooms. There are 2 types of rooms:

- measurements for sensor
- measurements by type for sensor

Connect sensor room:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
        public_ws.joinSensor(sensor);
    });

Connect to sensor/type room:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
        public_ws.joinSensor(sensor, 'TMP');
    });

If user/application with this token doesn't have rights to the sensor and sensor is not public - a sensor/access_denied message will be emitted.

You can catch this message with listener:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedPublicMeasurements(sensor, message) {
        console.log('access denied', sensor, message);
    }

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
        public_ws.joinSensor(sensor, 'TMP');
        public_ws.onAccessDenied(onAccessDeniedPublicMeasurements);
    });

If there are no problems - you can connect listeners to rooms:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedPublicMeasurements(sensor, message) {
        console.log('access denied', sensor, message);
    }

    function getMeasurements(measurements) {
        measurements.forEach((measurement) => {
            console.log(measurement.timestamp);
            console.log(measurement.type);
            console.log(measurement.value);
        });
    }

    function getMeasurementsTMP(measurements) {
        measurements.forEach((measurement) => {
            console.log(measurement.timestamp);
            console.log(measurement.value);
        });
    }

    public_ws.connect(token).then(() => {
        console.log('Connected and authenticated to public');
        public_ws.joinSensor(sensor);
        public_ws.onMeasurements(sensor, null, getMeasurements);
        public_ws.onMeasurements(sensor, 'TMP', getMeasurementsTMP);
        public_ws.onAccessDenied(onAccessDeniedPublicMeasurements);
    });

You can connect any amount of listeners to each room.

Do disable listener, use `offMeasurements` method:

.. code-block:: javascript

    function getMeasurements(measurements) {
        measurements.forEach((measurement) => {
            console.log(measurement.timestamp);
            console.log(measurement.type);
            console.log(measurement.value);
        });
    }

    public_ws.offMeasurements(sensor, null, getMeasurements);

You can leave sensor room like this:

.. code-block:: javascript

    public_ws.leaveSensor(sensor, 'TMP');

To leave all rooms run this code:

.. code-block:: javascript

    public_ws.leaveAll();

.. note:: Leaving rooms will stop data to be emitted, but listeners will still be connected.