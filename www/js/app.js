// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','route','global','config','ionicLazyLoad','indexdb','commonJs','ngCordova'])

.run(function($ionicPlatform,$location,$ionicHistory,$cordovaToast,$rootScope) {
  $ionicPlatform.ready(function() {
     //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
     //for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    //给android的物理返回按钮添加点击事件
    // 第一个参数是注册的事件，第二个参数是注册事件的优先级
    $ionicPlatform.registerBackButtonAction(function(e){
      if($rootScope.backButtonPressedOnceToExit){
        ionic.Platform.exitApp();
      }
      else {
        if($location.path()=="/tab/home"||$location.path()=="/tab/category"||$location.path()=="/tab/account"||$location.path()=="/tab/cart"){
          $rootScope.backButtonPressedOnceToExit=true;
          $cordovaToast.showShortBottom('再点一次退出！');
          setTimeout(function(){
            $rootScope.backButtonPressedOnceToExit=false;
          },2000)
        }
        else {
          $ionicHistory.goBack();
        }
      }
      e.preventDefault();
      return false
    },110);


  });
})

