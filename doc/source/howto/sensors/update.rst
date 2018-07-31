Update sensor
~~~~~~~~~~~~~

This is how you can update sensors:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.update(sensor_id, name, application)
             .then((response) => {
                console.log(response);
             })
             .catch((response) => {
                console.log(response);
             });

If success you will get promise with response type ApiResponse with `code=100`, `status=200` and `success=true`

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.update(sensor_id, name, application)
             .then((response) => {
                console.log(response.code);
                console.log(response.status);
                console.log(response.success);
                console.log(response.message);
             });

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.sensors.update(sensor_id, name, application)
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

    - `code=1` - `"Please, provide name field. This cannot be empty."`
    - `code=2` - `"Application ID is incorrect."`

.. note:: Messages are just text information and can be changed by developers.

ApiResponse will have status `401` with `message` = `Unauthorized` if credentials are wrong.

ApiResponse will have status `404` with `message` = `Not Found` if sensor doesn't exist.

Action will throw `ApiResponse` with `status` = `422` on validation error.

.. note::
    Available for:

    - User token
    - Application token

    Application token will have access only to sensors assigned to this application.