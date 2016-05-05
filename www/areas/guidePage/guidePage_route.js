// guidePage页面子路由
angular.module('guidePage.route', ['guidePage.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('guidePage', {
        url: '/guidePage',
        templateUrl: 'areas/guidePage/guidePage.html',
        controller: 'GuidePageCtrl'
      })
  })
