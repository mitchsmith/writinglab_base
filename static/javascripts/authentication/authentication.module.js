(function () {
  'use strict';

  angular
    .module('writinglab.authentication', [
      'writinglab.authentication.controllers',
      'writinglab.authentication.services'
    ]);

  angular
    .module('writinglab.authentication.controllers', []);

  angular
    .module('writinglab.authentication.services', ['ngCookies']);
})();