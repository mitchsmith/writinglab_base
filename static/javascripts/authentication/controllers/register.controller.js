/**
* Register controller
* @namespace writinglab.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('writinglab.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {

    /* this is a ViewModel */
    var vm = this;

    vm.register = register;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf writinglab.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf writinglab.authentication.services.Authentication
    */
    /*function register(email, password, username) {
      return $http.post('/api/v1/accounts/registation/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);*/
    function register() {
      Authentication.register(vm.email, vm.password, vm.username);
    }

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(username, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }
})();