'use strict';

/* Module for ServicoRoupas */

var servicoRoupasModule = angular.module('servicoRoupas.module', ['myApp']);

/**
 * Module for servicoRoupas
 */
servicoRoupasModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/servicoRoupas',    {templateUrl: 'partials/servicoroupas/servicoroupas_list.html', controller: 'ServicoRoupasCtrl'});
    $routeProvider.when('/servicoRoupas/new', {templateUrl: 'partials/servicoroupas/servicoroupas_form.html', controller: 'ServicoRoupasCtrl'});
    $routeProvider.when('/servicoRoupas/:id', {templateUrl: 'partials/servicoroupas/servicoroupas_form.html', controller: 'ServicoRoupasCtrl'});
}]);
