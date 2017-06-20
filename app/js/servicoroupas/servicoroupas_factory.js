'use strict';

/**
 * Factory for ServicoRoupas
 */
servicoRoupasModule.factory('ServicoRoupas', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage servicoRoupas
    var entityURL = restURL + '/servicoRoupas';
	
	/**
     * Validate servicoRoupas
     * @param servicoRoupas servicoRoupas
     * @throws validation exception
     */
	var validate = function (servicoRoupas) {
		var errors = [];
        if( servicoRoupas.id == null || servicoRoupas.id == '' ) {
			errors.push('servicoRoupas.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all servicoRoupass as list items
         * @return all servicoRoupass as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/servicoRoupas');
    	},

        /**
         * Get all servicoRoupass
         * @return all servicoRoupass
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get servicoRoupas
         * @param id id
         * @return servicoRoupas
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new servicoRoupas
         * @param servicoRoupas servicoRoupas
         * @return servicoRoupas saved
         */
		create: function(servicoRoupas) {
			validate(servicoRoupas)
			var url = entityURL;
			return $http.post(url, servicoRoupas);
    	},

        /**
         * Update servicoRoupas
         * @param servicoRoupas servicoRoupas
         * @return servicoRoupas saved
         */
    	update: function(servicoRoupas) {
			validate(servicoRoupas)
			var url = entityURL + '/' + servicoRoupas.id;
			return $http.put(url, servicoRoupas);
    	},

		/**
         * Delete servicoRoupas
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

