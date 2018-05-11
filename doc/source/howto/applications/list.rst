Get applications
~~~~~~~~~~~~~~~~

You can get list of applications:

.. code-block:: javascript

    let api = new SensorlabApi();
    api.applications.list(options)
        .then((applications_response) => {
            console.log(applications_response);
        });
    });

On success you will get promise with `ApplicationsResponse` object.

.. code-block:: javascript

    api.applications.list(options)
        .then((applications_response) => {
            console.log(applications_response.page);
            console.log(applications_response.count);
            console.log(applications_response.applications);
        });
    });

Parameters of `ApplicationsResponse`:

    - `page` - amount of pages available.
    - `count` - amount of applications total.
    - `applications` - an array of applications on this page. This is an array of `Applications` models objects.

You can provide `options` as an object with this parameters:

    - `page` - by default will 1.
    - `name` - search applications by name.
    - `sort` - sorting parameter, looks like "`fieldname,order`". Example: "`name,asc`"
        Possible sort fields:
            - `name`
            - `created`
        Possible order types:
            - `asc`
            - `desc`

Method will throw ApiResponse as exception on any error.

.. code-block:: javascript

    api.applications.list(options)
        .catch((response) => {
            console.log(response.status);
        });
    });

Output::

    401

There are no codes or special error for this action.
ApiResponse will have status `401` with message `Unauthorized` if credentials are wrong.