'use strict';

/* Module for Cliente */

var clienteModule = angular.module('cliente.module', ['myApp']);

/**
 * Module for cliente
 */
clienteModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/cliente',    {templateUrl: 'partials/cliente/cliente_list.html', controller: 'ClienteCtrl'});
    $routeProvider.when('/cliente/new', {templateUrl: 'partials/cliente/cliente_form.html', controller: 'ClienteCtrl'});
    $routeProvider.when('/cliente/:id', {templateUrl: 'partials/cliente/cliente_form.html', controller: 'ClienteCtrl'});
}]);
