'use strict';

/**
 * Factory for Cliente
 */
clienteModule.factory('Cliente', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage cliente
    var entityURL = restURL + '/cliente';
	
	/**
     * Validate cliente
     * @param cliente cliente
     * @throws validation exception
     */
	var validate = function (cliente) {
		var errors = [];
        /*if( cliente.id == null || cliente.id == '' ) {
			errors.push('cliente.id.not.defined');
		}*/
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all clientes as list items
         * @return all clientes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/cliente');
    	},

        /**
         * Get all clientes
         * @return all clientes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get cliente
         * @param id id
         * @return cliente
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new cliente
         * @param cliente cliente
         * @return cliente saved
         */
		create: function(cliente) {
			validate(cliente)
			var url = entityURL;
			return $http.post(url, cliente);
    	},

        /**
         * Update cliente
         * @param cliente cliente
         * @return cliente saved
         */
    	update: function(cliente) {
			validate(cliente)
			var url = entityURL + '/' + cliente.id;
			return $http.put(url, cliente);
    	},

		/**
         * Delete cliente
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

