Get sensor alerts configurations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can get list of sensor alerts configuration:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensor_alerts.list(sensor)
        .then((sensor_alerts_response) => {
            console.log(sensor_alerts_response);
        });
    });

On success you will get promise with `SensorAlertsResponse` object.

.. code-block:: javascript

    api.sensor_alerts.list(options)
        .then((sensor_alerts_response) => {
            console.log(sensor_alerts_response.sensor_alerts);
        });
    });

Method parameters:

    - `sensor` - Sensor's ID

Parameters of `SensorAlertsResponse`:

    - `sensor_alerts` - an array of sensor alerts. This is an array of `SensorAlerts` models objects.

.. note::
    Available for:

    - User token
    - Application token