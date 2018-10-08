Get application by id
~~~~~~~~~~~~~~~~~~~~~

You can get application by its id:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.get(application_id)
             .then((application) => {
                console.log(application);
             })
             .catch((response) => {
                console.log(response);
             });

On success you will get promise with `Application` model object.

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.get(application_id)
             .then((application) => {
                console.log(application.id);
                console.log(application.name);
                console.log(application.description);
                console.log(application.created);
                console.log(application.public_api_key);
             });

Parameters of `Application`:

    - `id` - id in the database.
    - `name` - application name.
    - `description` - application description.
    - `created` - application's creation date.
    - `public_api_key` - Public Api Key

.. note::
    Available for:

    - User token