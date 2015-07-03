/**
* Document File
* @namespace writinglab.documents.directives
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.directives')
    .directive('documentfile', document_file);

  /**
  * @namespace Document
  */
  function document_file() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf writinglab.documents.directives.Document
    */
    var directive = {
      restrict: 'E',
      template: '<input type="file" />',
      replace: true,
      require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            var listener = function() {
                scope.$apply(function() {
                    attr.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]);
                });
            }
            element.bind('change', listener);
        }
    };

    return directive;
  }
})();