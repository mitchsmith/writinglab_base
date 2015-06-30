/**
* Documents
* @namespace writinglab.documents.services
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.services')
    .factory('Documents', Documents);

  Documents.$inject = ['$http'];

  /**
  * @namespace Documents
  * @returns {Factory}
  */
  function Documents($http) {
    var Documents = {
      all: all,
      create: create,
      get: get
    };

    return Documents;

    ////////////////////

    /**
    * @name all
    * @desc Get all Documents
    * @returns {Promise}
    * @memberOf writinglab.documents.services.Documents
    */
    function all() {
      return $http.get('/api/v1/documents/');
    }


    /**
    * @name create
    * @desc Create a new Document
    * @param {string} original_filename The content of the new Document
    * @param {file} odtfile The file containing the new Document
    * @returns {Promise}
    * @memberOf writinglab.documents.services.Documents
    */
    function create(original_filename, odtfile) {
      return $http.post('/api/v1/documents/', {
        odtfile: odtfile
      });
    }

    /**
     * @name get
     * @desc Get the Documents of a given user
     * @param {string} username The username to get Documents for
     * @returns {Promise}
     * @memberOf writinglab.documents.services.Documents
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/documents/');
    }
  }
})();