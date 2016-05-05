// guidePage页面业务逻辑
angular.module('guidePage.controller1', ['guidePage.service1'])
  .controller('GuidePageCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicActionSheet,$ionicPopup,$ionicPopover) {


    // 初始化swiper
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 1000,//可选选项，自动滑动
    })



























    //popover
    $ionicPopover.fromTemplateUrl("popover.html", {
        scope: $scope
      })
      .then(function(popover){
        $scope.popover = popover;
      })

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };




    //销毁事件回调处理：清理popover对象
    $scope.$on("$destroy", function() {
      $scope.popover.remove();
    });
    // 隐藏事件回调处理
    $scope.$on("popover.hidden", function() {
      // Execute action
    });
    //删除事件回调处理
    $scope.$on("popover.removed", function() {
      // Execute action
    });angular.module("ezApp", ["ionic"])
      .controller("ezCtrl", function($scope, $ionicPopover) {


      });



    // popup的方法
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认框',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }




    // actionsheet组件弹出方法
    $scope.show = function () {
      // 显示操作表
      $ionicActionSheet.show({
        buttons: [
          {text: 'modal'},
          {text: 'confirm'},
          {text: 'popover'}
        ],
        destructiveText: '删除',
        titleText: '一些操作',
        cancelText: '取消',
        buttonClicked: function (index) {
          switch(index){
            case 0:$scope.openModal();break;
            case 1:$scope.showConfirm();break;
            case 2:$scope.openPopover();break;
          }
          return true;
        }
      });
    };


    // 模态窗口弹出方法
    $ionicModal.fromTemplateUrl('a.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };


    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function () {
      // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function () {
      // 执行动作
    });


    // 轮播图打印序号方法
    $scope.func_change = function (index) {
      console.log(index);
    }

    setInterval(function () {
      $ionicSlideBoxDelegate.next();
    }, 2000)


    // 表单数据
    $scope.radioList = [
      {
        name: "html5",
        value: "1"
      },
      {
        name: "css3",
        value: "2"
      },
      {
        name: "js",
        value: "3"
      },
      {
        name: "canvas",
        value: "4"
      }
    ]

    $scope.choice = {
      choice: ''
    }

  })
