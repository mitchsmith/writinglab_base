/**
* Document File
* @namespace writinglab.documents.directives
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.directives')
    .directive('documentfile', ['$parse'], document_file);

  /**
  * @namespace Document
  */
  function document_file($parse) {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf writinglab.documents.directives.Document
    */
    /*var directive = {
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
    };*/
    var directive = {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };

    return directive;
  }
})();