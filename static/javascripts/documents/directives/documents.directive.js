/**
* Documents
* @namespace writinglab.documents.directives
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.directives')
    .directive('documents', documents);

  /**
  * @namespace Documents
  */
  function documents() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf writinglab.documents.directives.Documents
    */
    var directive = {
      controller: 'DocumentsController',
      controllerAs: 'vm',
      restrict: 'E',
      /* explicitly set $scope.documents to the vlue of the documents attr */
      scope: {
        documents: '='
      },
      templateUrl: '/static/templates/documents/documents.html'
    };

    return directive;
  }
})();