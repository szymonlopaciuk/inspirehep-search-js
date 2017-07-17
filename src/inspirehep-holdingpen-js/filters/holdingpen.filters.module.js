(function (angular) {
  angular.module('holdingpen.filters', [
    'ngSanitize',
    'angular.filter',
    'holdingpen.filters.abstract',
    'holdingpen.filters.categories',
    'holdingpen.filters.unifyKeywords'
  ]);
}(angular));