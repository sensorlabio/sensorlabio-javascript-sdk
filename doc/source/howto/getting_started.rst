Getting Started
===============

This is documentation on Javascript SDK for http://sensorlab.io/

This SDK can be easily used in NodeJS or React project.

This SDK utilizes sensorlab.io REST API.

Installation
------------

Install with npm::

   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk

Use with nodejs/React
---------------------

Initialize inside your js code

.. code-block:: javascript

   import {SensorlabApi} from "sensorlabio-javascript-sdk";
   let api = new SensorlabApi();

You can specify another url to REST API like this:

.. code-block:: javascript

   let api = new SensorlabApi('http://testing.sensorlab.io/api');

.. note:: There's no need to append `/v1` to the url, endpoint methods will handle it.

You can also provide saved JWT using `setToken` method:

.. code-block:: javascript

    let api = new SensorlabApi('http://testing.sensorlab.io/api');
    api.setToken(token);

Use with browsers
-----------------

Download latest master release:

    `<https://github.com/sensorlabio/sensorlabio-javascript-sdk/archive/master.zip>`_

Unzip:

    - `builds/index.min.js`
    - `builds/css/index.min.css`

Use them inside your html code:

.. code-block:: html

    <link href="build/css/index.min.css" rel="stylesheet">
    <script src="build/index.min.js"></script>

And inside your JS code:

.. code-block:: html

    <script type="text/javascript">
        var sdk = SensorlabSDK;
        var api = new sdk.SensorlabApi();
    </script>