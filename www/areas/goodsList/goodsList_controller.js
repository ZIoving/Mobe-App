// 商品列表页面
angular.module('goodsList.controller', ['goodsList.service'])
  .controller('GoodsListCtrl', function ($scope, $stateParams, GoodsListFty,$ionicHistory,$ionicLoading) {

    // 和前台绑定的数据对象
    $scope.obj_goodsListData = [];
    // 判断有没有更多数据可以加载
    $scope.pms_isMoreItemsAvailable=true;

    // 分页查询对象
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      pageNum: 1,
      pageSize: 10,
      sortFlag: "0",
      sortType: "desc",
      typeNumber:""
    };

    // 视图事件
    $scope.$on('$ionicView.beforeEnter', function (e) {
      $scope.func_refreshGoodsList();
    });


    // 刷新列表数据的方法
    $scope.func_refreshGoodsList=function(){
      // 分页信息处理，每次刷新的时候让页码变为第一页
      $scope.obj_pagingInfo.pageNum=1;
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      // 把参数对象变为字符串
      var message=JSON.stringify($scope.obj_pagingInfo);
      // 通过promise去调用咱们的方法
      var promise = GoodsListFty.refreshGoodsList(message);
      promise.then(
        function (data) {
          // 为了代码健壮性做判断
          if(data){
            $scope.obj_goodsListData=data;
            $scope.pms_isMoreItemsAvailable=true;

          }
          else{
            $scope.pms_isMoreItemsAvailable=false;
          }

        },
        function (reason) {
          console.log(reason);
        }
      ).finally(function() {
        // 停止广播ion-refresher
        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },2000)

      });;
    }

    // 上拉加载更多数据的方法
    $scope.func_loadMoreGoodsList=function(){
      $ionicLoading.show({
        template: '正在加载数据.....'
      });


      $scope.obj_pagingInfo.pageNum++;
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      var message=JSON.stringify($scope.obj_pagingInfo);

      console.log($scope.obj_pagingInfo.pageNum);
      var promise = GoodsListFty.loadMoreGoodsList(message);
      promise.then(
        function (data) {
          // 为了代码健壮性做判断
          if (data) {
            $.each(data, function (i, item) {
              $scope.obj_goodsListData.push(item);
            });
            $scope.pms_isMoreItemsAvailable = true;
          }
          else {
            $scope.pms_isMoreItemsAvailable = false;
          }
        },
        function (reason) {
          console.log(reason);
        }
      ).finally(function() {
        setTimeout(function(){
          // 停止加载更多的广播
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $ionicLoading.hide();
        },2000)

      });;
    }

    // 返回前一个页面
    // 返回方法
    $scope.func_goBack=function(){
      $ionicHistory.goBack();
    }


    // 测试promise执行顺序
    //console.log(1);
    //var promise=GoodsListFty.test();
    //promise.then(
    //  function(data){
    //    console.log(2);
    //    return data;
    //  },
    //  function(reason){
    //    console.log(3);
    //    console.log(reason);
    //
    //  }
    //).then(function(data){
    //  console.log(4);
    //  console.log(data);
    //})
    //console.log(5);

  })
