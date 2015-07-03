/**
* IndexController
* @namespace writinglab.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('writinglab.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Documents', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Posts, Documents, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];
    vm.documents = []

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf writinglab.layout.controllers.IndexController
    */
    function activate() {
      Posts.all().then(postsSuccessFn, postsErrorFn);

      Documents.all().then(documentsSuccessFn, documentsErrorFn);

      /** Listener for post.created **/
      $scope.$on('post.created', function (event, post) {
        vm.posts.unshift(post);
      });

      $scope.$on('post.created.error', function () {
        vm.posts.shift();
      });

      /** Listener for document.created **/
      $scope.$on('document.created', function (event, document) {
        vm.documents.unshift(document);
      });

      $scope.$on('document.created.error', function () {
        vm.document.shift();
      });


      /**
      * @name postsSuccessFn
      * @desc Update posts array on view
      */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }


      /**
      * @name postsErrorFn
      * @desc Show snackbar with error
      */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }


      /**
      * @name documentsSuccessFn
      * @desc Update documents array on view
      */
      function documentsSuccessFn(data, status, headers, config) {
        vm.documents = data.data;
      }


      /**
      * @name documentsErrorFn
      * @desc Show snackbar with error
      */
      function documentsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();