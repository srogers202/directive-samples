'use strict';

/**
 * @ngdoc function
 * @name dirsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dirsApp
 */
angular.module('dirsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
