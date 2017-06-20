'use strict';

/* Module for Servico */

var servicoModule = angular.module('servico.module', ['myApp']);

/**
 * Module for servico
 */
servicoModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/servico',    {templateUrl: 'partials/servico/servico_list.html', controller: 'ServicoCtrl'});
    $routeProvider.when('/servico/new', {templateUrl: 'partials/servico/servico_form.html', controller: 'ServicoCtrl'});
    $routeProvider.when('/servico/:id', {templateUrl: 'partials/servico/servico_form.html', controller: 'ServicoCtrl'});
}]);
