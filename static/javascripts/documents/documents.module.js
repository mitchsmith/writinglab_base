(function () {
  'use strict';

  angular
    .module('writinglab.documents', [
      'writinglab.documents.controllers',
      'writinglab.documents.directives',
      'writinglab.documents.services'
    ]);

  angular
    .module('writinglab.documents.controllers', []);

  angular
    .module('writinglab.documents.directives', ['ngDialog']);

  angular
    .module('writinglab.documents.services', []);
})();