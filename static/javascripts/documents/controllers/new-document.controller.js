/**
* NewDocumentController
* @namespace writinglab.documents.controllers
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.controllers')
    .controller('NewDocumentController', NewDocumentController);

  NewDocumentController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Documents', 'upload'];

  /**
  * @namespace NewDocumentController
  */
  function NewDocumentController($rootScope, $scope, Authentication, Snackbar, Documents, upload) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Document
    * @memberOf writinglab.documents.controllers.NewDocumentController
    */
    function submit() {
      $rootScope.$broadcast('document.created', {
        original_filename: vm.original_filename,
        odtfile: vm.odtfile,
        owner: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();

      Documents.create(vm.original_filename, vm.odtfile).then(createDocumentSuccessFn, createDocumentErrorFn);


      /**
      * @name createDocumentSuccessFn
      * @desc Show snackbar with success message
      */
      function createDocumentSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Document created.');
      }


      /**
      * @name createDocumentErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createDocumentErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('document.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();