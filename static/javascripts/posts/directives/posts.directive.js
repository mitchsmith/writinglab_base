/**
* Posts
* @namespace writinglab.posts.directives
*/
(function () {
  'use strict';

  angular
    .module('writinglab.posts.directives')
    .directive('posts', posts);

  /**
  * @namespace Posts
  */
  function posts() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf writinglab.posts.directives.Posts
    */
    var directive = {
      controller: 'PostsController',
      controllerAs: 'vm',
      restrict: 'E',
      /* explicitly set $scope.posts to the vlue of the posts attr */
      scope: {
        posts: '='
      },
      templateUrl: '/static/templates/posts/posts.html'
    };

    return directive;
  }
})();