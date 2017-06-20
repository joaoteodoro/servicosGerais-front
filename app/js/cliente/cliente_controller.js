'use strict';

/**
 * Controller for Cliente
 **/
clienteModule.controller('ClienteCtrl', ['Cliente',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Cliente, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of clientes
    $scope.clientes = [];
	// cliente to edit
    $scope.cliente = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh clientes list
     */
    $scope.refreshClienteList = function() {
    	try {
			$scope.clientes = [];
        	Cliente.getAll().then(
				function(success) {
        	        $scope.clientes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh cliente
     */
    $scope.refreshCliente = function(id) {
    	try {
        	$scope.cliente = null;
	        Cliente.get(id).then(
				function(success) {
        	        $scope.cliente = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the clientes list page
     */
    $scope.goToClienteList = function() {
        $scope.refreshClienteList();
        $location.path('/cliente');
    }
    /**
     * Go to the cliente edit page
     */
    $scope.goToCliente = function(id) {
        $scope.refreshCliente(id);
        $location.path('/cliente/'+id);
    }

    // Actions

    /**
     * Save cliente
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Cliente.create;
			} else {
				save = Cliente.update;
			}
			save($scope.cliente).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.cliente = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete cliente
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Cliente.delete(id).then(
				function(success) {
                	$scope.goToClienteList();
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
        $scope.cliente = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshCliente($routeParams.id);
    } else {
        // List page
        $scope.refreshClienteList();
    }
    
    
}]);
