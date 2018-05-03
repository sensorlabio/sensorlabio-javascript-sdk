Getting Started
===============

This is documentation on Javascript SDK for http://sensorlab.io/

This SDK can be easily used in NodeJS or React project.

This SDK utilizes sensorlab.io REST API.

Installation
------------

Install with npm::

   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk

Initialize inside your js code

.. code-block:: javascript

   let api = new SensorlabApi();

You can specify another url to REST API like this:

.. code-block:: javascript

   let api = new SensorlabApi('http://staging.sensorlab.io/api/v1/');

You can also provide saved JWT using `setToken` method:

.. code-block:: javascript

    let api = new SensorlabApi('http://staging.sensorlab.io/api/v1/');
    api.setToken(token);