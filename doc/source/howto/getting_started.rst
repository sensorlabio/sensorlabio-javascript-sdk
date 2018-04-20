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

You can also provide saved JWT token in constructor:

.. code-block:: javascript

   let api = new SensorlabApi('http://staging.sensorlab.io/api/v1/', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJqdGkiOiI1MmYyNjE3My1iMzFjLTQ5OWYtYTczOS03NGVjNzMxZWU3ZmIiLCJpYXQiOjE1MjQxNDA0MTcsImV4cCI6MTUyNDE0NDAxN30.WOfKYQLX9hUl4_yW3Rd9sts0MzLlHG6j7KEAeK918lI');