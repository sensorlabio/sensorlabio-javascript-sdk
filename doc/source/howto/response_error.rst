Response and error handling
===========================

Every endpoint method is async.

Methods await for request to API to completed and then returns Promise with result or throws exception on error.

Here's how you handle success results:

.. code-block:: javascript

    api.sensors.list(options)
             .then((sensors_response) => {
                console.log(sensors_response);
             });

Only HTTP status 200 is considered as success.

SDK handles few error types and throws these exceptions:

- `401` - `ApiErrorUnauthorizedException`. SDK throws this exception if there's problem with authentication with token or authentication credentials are wrong for `token()` methods.

- `404` - `ApiErrorNotFoundException`. SDK throws this exception if there's no object to return. This exception can appear if API's endpoint path is incorrect.

- `500` - `ApiErrorInternalException`. If there are any problems with API this exception will be thrown.

- `422` - `ApiErrorValidationException`. SDK will throw this exception on validation errors. Some fields can be required or require special format. All those error will be available in the `errors` parameter of exception as array.

Example:

.. code-block:: json

    [
      {
        "code": 1,
        "message": "Please, provide name field. This cannot be empty.",
        "param": "name"
      }
    ]

In this example you see 3 fields:
    - `code` - error code for error. You will see information on those codes further in endpoint methods how-to.
    - `message` - error message. You can use those to display it to user.
    - `param` - which field/param has this validation error.


If there's any other HTTP status SDK will throw `ApiErrorBasicException`.

All error exceptions extend `ApiErrorBasicException`.

There are 3 main parameters available for exception classes:

    - `status` - HTTP status
    - `message` - Error message
    - `errors` - this field is mostly for 422 error exceptions.

You can handle errors like this:

.. code-block:: javascript

    api.sensors.list(options)
             .catch((exception) => {
                console.log(exception.status);
                console.log(exception.message);
                console.log(exception.errors);
             });