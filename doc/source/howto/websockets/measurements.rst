Measurements
============

You can receive measurements using websockets.

In order to connect to websockets you should generate correct JWT.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.auth.application_token(public_api_key, private_api_key)
             .then((application_token) => {
                console.log(application_token);
             })
             .catch((response) => {
                console.log(response);
             });

When you have token you can connect to /measurements namespace:

.. code-block:: javascript

    var ws = new sdk.SensorlabWebsockets();
    let measurements_ws = new ws.measurements();

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
    }).catch((error) => {
        console.log(error);
    });

If there are problems with connection or authentication promise will throw an exception.

.. code-block:: javascript

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
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

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
        measurements_ws.joinSensor(sensor);
    });

Connect to sensor/type room:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
        measurements_ws.joinSensor(sensor, 'TMP');
    });

If user/application with this token doesn't have rights to the sensor, a "sensor/access_denied" message will be emitted.

You can catch this message with listener:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedMeasurements(sensor, message) {
        console.log('access denied', sensor, message);
    }

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
        measurements_ws.joinSensor(sensor, 'TMP');
        measurements_ws.onAccessDenied(onAccessDeniedMeasurements);
    });

If there are no problems - you can connect listeners to rooms:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedMeasurements(sensor, message) {
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

    measurements_ws.connect(token).then(() => {
        console.log('Connected and authenticated to measurements');
        measurements_ws.joinSensor(sensor);
        measurements_ws.onMeasurements(sensor, null, getMeasurements);
        measurements_ws.onMeasurements(sensor, 'TMP', getMeasurementsTMP);
        measurements_ws.onAccessDenied(onAccessDeniedMeasurements);
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

    measurements_ws.offMeasurements(sensor, null, getMeasurements);

You can leave sensor room like this:

.. code-block:: javascript

    measurements_ws.leaveSensor(sensor, 'TMP');

To leave all rooms run this code:

.. code-block:: javascript

    measurements_ws.leaveAll();

.. note:: Leaving rooms will stop data to be emitted, but listeners will still be connected.