'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('servico.module'));
  
  describe('ServicoCtrl', function(){
    var ServicoCtrl, Servico, Cliente, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Servico service
    	Servico = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'servico1'});
    			return deferred.promise;
    		}
    	};
		
				Cliente = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ServicoCtrl = $controller('ServicoCtrl', {
    		'Servico': Servico,
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
    	expect($scope.servico).toBeNull();
    	expect($scope.servicos).toBe('servico1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshServicoList', function() {
    	// given
    	Servico.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servico2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshServicoList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.servicos).toBe('servico2');
    });
    
    it('refreshServico', function() {
    	// given
    	Servico.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'servico'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshServico('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.servico).toBe('servico'+'1');
    });
    
	it('goToServicoList', function() {
    	// given
    	spyOn($scope, "refreshServicoList");
    	
    	// when
    	$scope.goToServicoList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshServicoList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/servico');
    });
    
    it('goToServico', function() {
    	// given
    	spyOn($scope, "refreshServico");
    	var id = 1;
    	
    	// when
    	$scope.goToServico(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshServico).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/servico'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.servico = {id:'1', name:'servico'};
    	
    	$scope.mode = 'create';
    	Servico.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.servico).toBe('servicoSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.servico = {id:'1', name:'servico'};
    	
    	$scope.mode = 'update';
    	Servico.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'servicoSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.servico).toBe('servicoSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Servico.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToServicoList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToServicoList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : servico create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/servico/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.servico).toBeNull();
    	expect($scope.servicos).toBe('servico1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});