'use strict';

/**
 * Factory for Servico
 */
servicoModule.factory('Servico', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage servico
    var entityURL = restURL + '/servico';
	
	/**
     * Validate servico
     * @param servico servico
     * @throws validation exception
     */
	var validate = function (servico) {
		var errors = [];
        if( servico.id == null || servico.id == '' ) {
			errors.push('servico.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
		getAllTiposServicos: function(){
			return $http.get(restURL + '/tipoServico');
		},
		
		/**
         * Get all servicos as list items
         * @return all servicos as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/servico');
    	},

        /**
         * Get all servicos
         * @return all servicos
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get servico
         * @param id id
         * @return servico
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new servico
         * @param servico servico
         * @return servico saved
         */
		create: function(servico) {
			validate(servico)
			var url = entityURL;
			return $http.post(url, servico);
    	},

        /**
         * Update servico
         * @param servico servico
         * @return servico saved
         */
    	update: function(servico) {
			validate(servico)
			var url = entityURL + '/' + servico.id;
			return $http.put(url, servico);
    	},

		/**
         * Delete servico
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

