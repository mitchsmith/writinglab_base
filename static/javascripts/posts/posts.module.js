(function () {
  'use strict';

  angular
    .module('writinglab.posts', [
      'writinglab.posts.controllers',
      'writinglab.posts.directives',
      'writinglab.posts.services'
    ]);

  angular
    .module('writinglab.posts.controllers', []);

  angular
    .module('writinglab.posts.directives', ['ngDialog']);

  angular
    .module('writinglab.posts.services', []);
})();