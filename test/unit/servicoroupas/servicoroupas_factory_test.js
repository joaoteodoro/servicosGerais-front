'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('servicoRoupas.module'));
  
  describe('ServicoRoupas', function(){
	var $httpBackend, ServicoRoupas, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ServicoRoupas = $injector.get('ServicoRoupas');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/servicoRoupas').respond("test");
    	ServicoRoupas.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/servicoRoupas').respond("test");
    	ServicoRoupas.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/servicoRoupas/1').respond("test");
    	ServicoRoupas.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ServicoRoupas.create({id:null,name:'servicoRoupas'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('servicoRoupas.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/servicoRoupas').respond("test");
    	ServicoRoupas.create({id:'1',name:'servicoRoupas'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ServicoRoupas.update({id:null,name:'servicoRoupas'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('servicoRoupas.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/servicoRoupas/1').respond("test");
    	ServicoRoupas.update({id:'1',name:'servicoRoupas'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/servicoRoupas/1').respond("test");
    	ServicoRoupas.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});