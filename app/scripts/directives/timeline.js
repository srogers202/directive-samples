'use strict';

/**
 * @ngdoc directive
 * @name dirsApp.directive:timeline
 * @description
 * # timeline
 */
angular.module('dirsApp')
  .directive('timeline', function () {
    return {
      template:
      '<div class="timeline">' +
        '<div class="relative"><span ng-repeat="time in timeData" class="timeline-label" style="left: {{time.fromLeft}}%">{{time.label}}</span></div>' +
        '<div class="timeline-line"></div>' +
        '<div class="timeline-line-active" style="width: {{currentData.fromLeft}}%"></div>' +
        '<div class="timeline-line-point" style="left: {{currentData.fromLeft}}%"></div>' +
        '<div class="relative"><span ng-repeat="time in timeData" class="timeline-label" style="left: {{time.fromLeft > 90 ? 86 : time.fromLeft}}%;top:38px">{{time.date}}</span></div>' +
      '</div>',
      restrict: 'E',
      scope: {
        times: '='
      },
      link: function postLink(scope) {
        var dateCount = scope.times.length;
        var times = [];
        var startDate, endDate;

        if (dateCount > 0) {

          startDate = moment(scope.times[0].date);
          endDate = moment(scope.times[dateCount - 1].date);

          for (var i=0;i<dateCount;i++) {
            var date = moment(scope.times[i].date);
            if (date < startDate) {
              startDate = date;

            }
            if (date > endDate) {
              endDate = date;
            }
          }

          var span = timeSpan(startDate, endDate);

          for (var j=0;j<dateCount;j++) {
            var date2 = moment(scope.times[j].date);
            var label = scope.times[j].descr;
            var fromLeft = ((date2 - startDate) * 100) / span;

            if (fromLeft > 95) {
              fromLeft = 95;
            }

            times.push({fromLeft: Math.round(fromLeft), date: date2.format('ll'), label: label});
          }

          var currentFromLeft = (((moment() - startDate) * 100) / span);

          scope.currentData = {fromLeft: Math.min(100, currentFromLeft)};
          scope.timeData = times;
        }

        function timeSpan(date1, date2) {
          var d1 = new Date(date1);
          var d2 = new Date(date2);
          return d2.getTime() - d1.getTime();
        }
      }
    };
  });
