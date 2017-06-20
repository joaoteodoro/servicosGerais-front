'use strict';

/**
 * Controller for ServicoRoupas
 **/
servicoRoupasModule.controller('ServicoRoupasCtrl', ['ServicoRoupas',  'Servico', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ServicoRoupas, Servico, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Servico',     // edition mode
    $scope.mode = null;
    
	// list of servicoRoupass
    $scope.servicoRoupass = [];
	// servicoRoupas to edit
    $scope.servicoRoupas = null;

	// referencies entities
	$scope.items = {};
    // servicos
	$scope.items.servicos = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Servico.getAllAsListItems().then(
				function(success) {
        	        $scope.items.servicos = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh servicoRoupass list
     */
    $scope.refreshServicoRoupasList = function() {
    	try {
			$scope.servicoRoupass = [];
        	ServicoRoupas.getAll().then(
				function(success) {
        	        $scope.servicoRoupass = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh servicoRoupas
     */
    $scope.refreshServicoRoupas = function(id) {
    	try {
        	$scope.servicoRoupas = null;
	        ServicoRoupas.get(id).then(
				function(success) {
        	        $scope.servicoRoupas = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the servicoRoupass list page
     */
    $scope.goToServicoRoupasList = function() {
        $scope.refreshServicoRoupasList();
        $location.path('/servicoRoupas');
    }
    /**
     * Go to the servicoRoupas edit page
     */
    $scope.goToServicoRoupas = function(id) {
        $scope.refreshServicoRoupas(id);
        $location.path('/servicoRoupas/'+id);
    }

    // Actions

    /**
     * Save servicoRoupas
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = ServicoRoupas.create;
			} else {
				save = ServicoRoupas.update;
			}
			save($scope.servicoRoupas).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.servicoRoupas = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete servicoRoupas
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    ServicoRoupas.delete(id).then(
				function(success) {
                	$scope.goToServicoRoupasList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.servicoRoupas = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshServicoRoupas($routeParams.id);
    } else {
        // List page
        $scope.refreshServicoRoupasList();
    }
    
    
}]);
