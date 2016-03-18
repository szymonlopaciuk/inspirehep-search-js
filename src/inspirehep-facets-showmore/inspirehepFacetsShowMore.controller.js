(function(angular) {

  function FacetsShowMoreController($scope) {

    $scope.facetResults = 10;

    $scope.step = 10;

    $scope.calculateStep = calculateStep;

    $scope.moreFacetResults = moreFacetResults;

    function moreFacetResults() {
      $scope.facetResults = $scope.facetResults + $scope.step;
    }

    function calculateStep(key) {
      var resultsLeft = $scope.vm.invenioSearchResults.aggregations[key].buckets.length - $scope.facetResults;
      if ( resultsLeft < $scope.step ) {
        return resultsLeft;
      }
      else {
        return $scope.step;
      }
    }

    function resetShowMore() {
      $scope.facetResults = 10;
    }

    $scope.$on('invenio.search.success', resetShowMore);
  }

  FacetsShowMoreController.$inject = ['$scope'];

  angular.module('inspirehepFacetsShowMore.controllers', [])
    .controller('FacetsShowMoreController', FacetsShowMoreController);

})(angular);