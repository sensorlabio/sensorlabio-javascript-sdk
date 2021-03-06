Getting Started
===============

This is documentation on Javascript SDK for http://sensorlab.io/ REST API.

This SDK can be easily used in NodeJS and as JS library to use in browser.

Installation
------------

Install with npm::

   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk

Use with NodeJS
---------------

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

Use them inside your html code:

.. code-block:: html

    <script src="build/index.min.js"></script>

And inside your JS code:

.. code-block:: html

    <script type="text/javascript">
        var sdk = SensorlabSDK;
        var api = new sdk.SensorlabApi();
    </script>