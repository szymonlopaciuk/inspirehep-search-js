(function (angular) {

  function MathjaxController($scope, $window) {

    function requestMathjax() {
          setTimeout(function() {
            $window.MathJax.Hub.Queue(['Typeset', $window.MathJax.Hub]);
          });
    }

    $scope.$on('invenio.search.success', requestMathjax);
  }

  MathjaxController.$inject = ['$scope', '$window'];

  angular.module('inspirehepMathjax.controllers', [])
    .controller('MathjaxController', MathjaxController);

})(angular);
