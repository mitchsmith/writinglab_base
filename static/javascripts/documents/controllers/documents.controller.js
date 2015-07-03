/**
* DocumentsController
* @namespace writinglab.documents.controllers
*/
(function () {
  'use strict';

  angular
    .module('writinglab.documents.controllers')
    .controller('DocumentsController', DocumentsController);

  DocumentsController.$inject = ['$scope'];

  /**
  * @namespace DocumentsController
  */
  function DocumentsController($scope) {
    var vm = this;

    vm.columns = [];

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf writinglab.documents.controllers.DocumentsController
    */
    function activate() {
      /**
      As explained in the tutorial:
      Because we do not have direct access to the ViewModel that documents is stored on,
      we watch $scope.documents instead of vm.documents. Furthermore, we use $watchCollection
      here because $scope.documents is an array. $watch watches the object's reference,
      not it's actual value. $watchCollection watches the value of an array from changes.
      If we used $watch here instead of $watchCollection, the changes caused by 
      $scope.documents.shift() and $scope.documents.unshift() would not trigger the watcher.
      **/
      $scope.$watchCollection(function () { return $scope.documents; }, render);
      $scope.$watch(function () { return $(window).width(); }, render);
    }


    /**
    * @name calculateNumberOfColumns
    * @desc Calculate number of columns based on screen width
    * @returns {Number} The number of columns containing Documents
    * @memberOf writinglab.documents.controllers.DocumentsControllers
    */
    function calculateNumberOfColumns() {
      var width = $(window).width();

      if (width >= 1200) {
        return 4;
      } else if (width >= 992) {
        return 3;
      } else if (width >= 768) {
        return 2;
      } else {
        return 1;
      }
    }


    /**
    * @name approximateShortestColumn
    * @desc An algorithm for approximating which column is shortest
    * @returns The index of the shortest column
    * @memberOf writinglab.documents.controllers.DocumentsController
    */
    function approximateShortestColumn() {
      var scores = vm.columns.map(columnMapFn);

      return scores.indexOf(Math.min.apply(this, scores));


      /**
      * @name columnMapFn
      * @desc A map function for scoring column heights
      * @returns The approximately normalized height of a given column
      */
      function columnMapFn(column) {
        var lengths = column.map(function (element) {
          return element.original_filename.length;
        });

        return lengths.reduce(sum, 0) * column.length;
      }


      /**
      * @name sum
      * @desc Sums two numbers
      * @params {Number} m The first number to be summed
      * @params {Number} n The second number to be summed
      * @returns The sum of two numbers
      */
      function sum(m, n) {
        return m + n;
      }
    }


    /**
    * @name render
    * @desc Renders Documents into columns of approximately equal height
    * @param {Array} current The current value of `vm.documents`
    * @param {Array} original The value of `vm.documents` before it was updated
    * @memberOf writinglab.documents.controllers.DocumentsController
    */
    function render(current, original) {
      if (current !== original) {
        vm.columns = [];

        for (var i = 0; i < calculateNumberOfColumns(); ++i) {
          vm.columns.push([]);
        }

        for (var i = 0; i < current.length; ++i) {
          var column = approximateShortestColumn();
          vm.columns[column].push(current[i]);
        }
      }
    }
  }
})();