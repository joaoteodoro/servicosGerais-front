'use strict';

/**
 * Controller for Servico
 **/
servicoModule.controller('ServicoCtrl', ['Servico',  'Cliente', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Servico, Cliente, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Cliente',     // edition mode
    $scope.mode = null;
    
	// list of servicos
    $scope.servicos = [];
	// servico to edit
    $scope.servico = null;

	// referencies entities
	$scope.items = {};
    // clientes
	$scope.items.clientes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Cliente.getAllAsListItems().then(
				function(success) {
        	        $scope.items.clientes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh servicos list
     */
    $scope.refreshServicoList = function() {
    	try {
			$scope.servicos = [];
        	Servico.getAll().then(
				function(success) {
        	        $scope.servicos = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh servico
     */
    $scope.refreshServico = function(id) {
    	try {
        	$scope.servico = null;
	        Servico.get(id).then(
				function(success) {
        	        $scope.servico = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the servicos list page
     */
    $scope.goToServicoList = function() {
        $scope.refreshServicoList();
        $location.path('/servico');
    }
    /**
     * Go to the servico edit page
     */
    $scope.goToServico = function(id) {
        $scope.refreshServico(id);
        $location.path('/servico/'+id);
    }

    // Actions

    /**
     * Save servico
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Servico.create;
			} else {
				save = Servico.update;
			}
			save($scope.servico).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.servico = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete servico
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Servico.delete(id).then(
				function(success) {
                	$scope.goToServicoList();
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
        $scope.servico = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshServico($routeParams.id);
    } else {
        // List page
        $scope.refreshServicoList();
    }
    
    
}]);
