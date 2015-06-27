angular
  .module('writinglab', [
    'writinglab.config',
    'writinglab.routes',
    'writinglab.authentication',
    'writinglab.layout',
    'writinglab.posts',
    'writinglab.utils',
    'writinglab.profiles'
  ]);

angular
  .module('writinglab.config', []);

angular
  .module('writinglab.routes', ['ngRoute']);

/** csrf protection in concert with django **/
angular
  .module('writinglab')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}