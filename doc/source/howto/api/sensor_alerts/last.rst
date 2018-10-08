Get last generated alerts for sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can get list of last sensor alerts:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.alerts.last(sensor)
        .then((alerts_response) => {
            console.log(alerts_response);
        });
    });

On success you will get promise with `AlertsResponse` object.

.. code-block:: javascript

    api.alerts.last(options)
        .then((alerts_response) => {
            console.log(alerts_response.alerts);
        });
    });

Method parameters:

    - `sensor` - Sensor's ID

Parameters of `AlertsResponse`:

    - `alerts` - an array of alerts on this page. This is an array of `Alerts` models objects.

.. note::
    Available for:

    - User token
    - Application token