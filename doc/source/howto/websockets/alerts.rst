Alerts
======

You can receive alerts using websockets.

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

When you have token you can connect to /alerts namespace:

.. code-block:: javascript

    var ws = new sdk.SensorlabWebsockets();
    let alerts_ws = new ws.alerts();

    alerts_ws.connect(token).then(() => {
        console.log('Connected and authenticated to alerts');
    }).catch((error) => {
        console.log(error);
    });

If there are problems with connection or authentication promise will throw an exception.

.. code-block:: javascript

    alerts_ws.connect(token).then(() => {
        console.log('Connected and authenticated to alerts');
    }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
    });

In case authentication problems exception code will be "401" with message "Authentication error. Please check your token."

If connection problem - SDK will throw exception with code "0" and message "Connection error"

When connected, you can join sensor rooms.

Connect sensor room:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    alerts_ws.connect(token).then(() => {
        console.log('Connected and authenticated to alerts');
        alerts_ws.joinSensor(sensor);
    });

If user/application with this token doesn't have rights to the sensor, a sensor/access_denied message will be emitted.

You can catch this message with listener:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedAlerts(sensor, message) {
        console.log('access denied', sensor, message);
    }

    alerts_ws.connect(token).then(() => {
        console.log('Connected and authenticated to alerts');
        alerts_ws.joinSensor(sensor, 'TMP');
        alerts_ws.onAccessDenied(onAccessDeniedAlerts);
    });

If there are no problems - you can connect listeners to rooms:

.. code-block:: javascript

    let sensor = '7e9fb090-c717-11e8-b4d3-c587309ce935';

    function onAccessDeniedAlerts(sensor, message) {
        console.log('access denied', sensor, message);
    }

    function getAlerts(alerts) {
        alerts.forEach((alert) => {
            console.log(alert.measurement.timestamp);
            console.log(alert.measurement.type);
            console.log(alert.measurement.value);

            console.log(alert.threshold.measurement_type);
            console.log(alert.threshold.threshold_type);
            console.log(alert.threshold.threshold_value);
        });
    }

    alerts_ws.connect(token).then(() => {
        console.log('Connected and authenticated to alerts');
        alerts_ws.joinSensor(sensor);
        alerts_ws.onAlerts(sensor, getAlerts);
        alerts_ws.onAccessDenied(onAccessDeniedAlerts);
    });

You can connect any amount of listeners to each room.

Do disable listener, use `offAlerts` method:

.. code-block:: javascript

    function getAlerts(alerts) {
        alerts.forEach((alert) => {
            console.log(alert.measurement.timestamp);
            console.log(alert.measurement.type);
            console.log(alert.measurement.value);

            console.log(alert.threshold.measurement_type);
            console.log(alert.threshold.threshold_type);
            console.log(alert.threshold.threshold_value);
        });
    }

    alerts_ws.offAlerts(sensor, getAlerts);