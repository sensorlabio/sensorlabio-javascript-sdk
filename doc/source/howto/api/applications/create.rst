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
                console.log(application.public_api_key);
                console.log(application.private_api_key);
             });

Parameters of `Application`:

    - `id` - id in the database.
    - `name` - application name.
    - `description` - application description.
    - `created` - application's creation date.
    - `public_api_key` - Public Api Key
    - `private_api_key` - Generated private API key.

.. note::
    Please note, that Private API Key will appear only once after app creation.
    You will be able to generate new one though.

Codes and messages for validation errors:

    - `code=1` - `"Please, provide name field. This cannot be empty."`

.. note::
    Available for:

    - User token