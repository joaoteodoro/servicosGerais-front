'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('cliente.module'));
  
  describe('ClienteCtrl', function(){
    var ClienteCtrl, Cliente,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Cliente service
    	Cliente = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'cliente1'});
    			return deferred.promise;
    		}
    	};
		
				ClienteCtrl = $controller('ClienteCtrl', {
    		'Cliente': Cliente,
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
    	expect($scope.cliente).toBeNull();
    	expect($scope.clientes).toBe('cliente1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshClienteList', function() {
    	// given
    	Cliente.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'cliente2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshClienteList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.clientes).toBe('cliente2');
    });
    
    it('refreshCliente', function() {
    	// given
    	Cliente.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'cliente'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCliente('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.cliente).toBe('cliente'+'1');
    });
    
	it('goToClienteList', function() {
    	// given
    	spyOn($scope, "refreshClienteList");
    	
    	// when
    	$scope.goToClienteList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshClienteList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/cliente');
    });
    
    it('goToCliente', function() {
    	// given
    	spyOn($scope, "refreshCliente");
    	var id = 1;
    	
    	// when
    	$scope.goToCliente(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCliente).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/cliente'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.cliente = {id:'1', name:'cliente'};
    	
    	$scope.mode = 'create';
    	Cliente.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'clienteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.cliente).toBe('clienteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.cliente = {id:'1', name:'cliente'};
    	
    	$scope.mode = 'update';
    	Cliente.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'clienteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.cliente).toBe('clienteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Cliente.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToClienteList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToClienteList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : cliente create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/cliente/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.cliente).toBeNull();
    	expect($scope.clientes).toBe('cliente1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});