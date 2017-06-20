'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('servicoRoupas.module'));
  
  describe('ServicoRoupasCtrl', function(){
    var ServicoRoupasCtrl, ServicoRoupas, Servico, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// ServicoRoupas service
    	ServicoRoupas = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'servicoRoupas1'});
    			return deferred.promise;
    		}
    	};
		
				Servico = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ServicoRoupasCtrl = $controller('ServicoRoupasCtrl', {
    		'ServicoRoupas': ServicoRoupas,
						'Servico': Servico,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.servicoRoupas).toBeNull();
    	expect($scope.servicoRoupass).toBe('servicoRoupas1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshServicoRoupasList', function() {
    	// given
    	ServicoRoupas.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoRoupas2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshServicoRoupasList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.servicoRoupass).toBe('servicoRoupas2');
    });
    
    it('refreshServicoRoupas', function() {
    	// given
    	ServicoRoupas.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoRoupas'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshServicoRoupas('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.servicoRoupas).toBe('servicoRoupas'+'1');
    });
    
	it('goToServicoRoupasList', function() {
    	// given
    	spyOn($scope, "refreshServicoRoupasList");
    	
    	// when
    	$scope.goToServicoRoupasList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshServicoRoupasList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/servicoRoupas');
    });
    
    it('goToServicoRoupas', function() {
    	// given
    	spyOn($scope, "refreshServicoRoupas");
    	var id = 1;
    	
    	// when
    	$scope.goToServicoRoupas(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshServicoRoupas).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/servicoRoupas'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.servicoRoupas = {id:'1', name:'servicoRoupas'};
    	
    	$scope.mode = 'create';
    	ServicoRoupas.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoRoupasSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.servicoRoupas).toBe('servicoRoupasSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.servicoRoupas = {id:'1', name:'servicoRoupas'};
    	
    	$scope.mode = 'update';
    	ServicoRoupas.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoRoupasSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.servicoRoupas).toBe('servicoRoupasSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ServicoRoupas.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToServicoRoupasList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToServicoRoupasList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : servicoRoupas create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/servicoRoupas/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.servicoRoupas).toBeNull();
    	expect($scope.servicoRoupass).toBe('servicoRoupas1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});