Getting Started
===============

This is documentation on Javascript SDK for http://sensorlab.io/ Websockets.

This SDK can be easily used in NodeJS and as JS library to use in browser.

Websockets are implemented based on socket.io

With this implementation you can receive measurements and alerts from sensors in real-time.

Installation
------------

Install with npm::

   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk

Use with NodeJS
---------------

Initialize inside your js code

.. code-block:: javascript

   import {SensorlabWebsockets} from "sensorlabio-javascript-sdk";
   let measurements_ws = new ws.measurements();
   let alerts_ws = new ws.alerts();
   let public_ws = new ws.public();

You can specify another url to websockets:

.. code-block:: javascript

   let measurements_ws = new ws.measurements('http://testing.sensorlab.io:8080/');

For React you must use another build for web:

    import {SensorlabWebsockets} from "sensorlabio-javascript-sdk/build/web.min";

Use with browsers
-----------------

Download latest master release:

    `<https://github.com/sensorlabio/sensorlabio-javascript-sdk/archive/master.zip>`_

Unzip:

    - `builds/web.min.js`

Use them inside your html code:

.. code-block:: html

    <script src="build/web.min.js"></script>

And inside your JS code:

.. code-block:: html

    <script type="text/javascript">
        var sdk = SensorlabSDK;
        var ws = new sdk.SensorlabWebsockets();
    </script>