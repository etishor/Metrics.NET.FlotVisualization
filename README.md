Metrics.NET.FlotVisualization
=============================

[![Build status](https://ci.appveyor.com/api/projects/status/abost1rrml5bkior)](https://ci.appveyor.com/project/etishor/metrics-net-flotvisualization)
[![Build Status](https://api.travis-ci.org/etishor/Metrics.NET.FlotVisualization.svg)](https://travis-ci.org/etishor/Metrics.NET.FlotVisualization)
[![NPM dependencies](https://david-dm.org/etishor/Metrics.NET.FlotVisualization.png)](https://david-dm.org/etishor/Metrics.NET.FlotVisualization)
[![NPM devDependencies](https://david-dm.org/etishor/Metrics.NET.FlotVisualization/dev-status.png)](https://david-dm.org/etishor/Metrics.NET.FlotVisualization#info=devDependencies)

JavaScript visualization app for [Metrics.NET](https://github.com/etishor/Metrics.NET) based on the excelent charting capabilities of [FlotCharts](http://www.flotcharts.org/)

###What is it
FlotVisualization is a web based, client side javascript application. It provides charts based on the data exposed by the [Metrics.NET](https://github.com/etishor/Metrics.NET) library.

This javascript application is embedded  in the Metrics.NET core library as a html page in which external resources (css,js) have been embedded.

The app is built on top of [angularjs](http://angularjs.org/) and uses [FlotCharts](http://www.flotcharts.org/) to render charts.

###How to build

FlotVisualization is developed with grunt & bower. 

Steps to get started (after cloning the repo, and CDing in the root folder):

```shell
    npm install -g grunt-cli bower
    npm install
    bower install
    grunt serve
    grunt build
```

You also need to edit app\index.html to specify the path to the metrics endpoint:

```js
    <script>window.metricsEndpoint = 'http://localhost:1234/json';</script>
```

###Sample

![Sample Visualization](https://raw.githubusercontent.com/etishor/Metrics.NET.FlotVisualization/master/sample.png)

###License
This application is released under Apache 2.0 License ( see LICENSE ) Copyright (c) 2014 Iulian Margarintescu
