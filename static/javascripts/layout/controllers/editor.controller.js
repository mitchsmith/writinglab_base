/**
* IndexController
* @namespace writinglab.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('writinglab.layout.controllers')
    .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', 'Authentication', 'Documents'];

  /**
  * @namespace EditorController
  */
  function EditorController($scope, Authentication, Documents) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.documents = []

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf writinglab.layout.controllers.IndexController
    */
    function activate() {
      console.log("Editor activated.");
      Wodo.createTextEditor('editorContainer', {
        allFeaturesEnabled: true,
        userData: {
          fullName: "Tim Lee",
          color:    "blue"
        }
      },
      function (err, editor) {
        if (err) {
          // something failed unexpectedly, deal with it (here just a simple alert)
          console.log(err);
          return;
        }
        editor.openDocumentFromUrl("/static/adrian_gebz.odt", function(err) {
          if (err) {
          // something failed unexpectedly, deal with it (here just a simple alert)
            console.log("There was an error on opening the document: " + err);
          }
        });
      });
      
    }
  }
})();