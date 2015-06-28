/**
* Document
* @namespace writinglab.documents.directives
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.directives')
    .directive('document', document);

  /**
  * @namespace Document
  */
  function document() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf writinglab.documents.directives.Document
    */
    var directive = {
      restrict: 'E',
      scope: {
        document: '='
      },
      templateUrl: '/static/templates/documents/document.html'
    };

    return directive;
  }
})();