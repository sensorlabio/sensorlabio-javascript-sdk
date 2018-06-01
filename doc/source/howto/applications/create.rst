Create application
~~~~~~~~~~~~~~~~~~

This is how you can create new application:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.create(name, description)
             .then((application) => {
                console.log(application);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `Application` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.create(name, description)
             .then((application) => {
                console.log(application.id);
                console.log(application.name);
                console.log(application.description);
                console.log(application.created);
                console.log(application.token);
             });

Parameters of `Application`:

    - `id` - id in the database.
    - `name` - application name.
    - `description` - application description.
    - `created` - application's creation date.
    - `token` - authorization token for application.

.. note::
    Token will be displayed only once on creation and you must save it.
    If token if lost, we can't show you current token again, you will be able only to generate new one.

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.create()
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

.. note:: Messages are just text information and can be changed by developers.

ApiResponse will have status `401` with `message`=`Unauthorized` if credentials are wrong.

Action will throw `ApiResponse` with status=`422` on validation error.