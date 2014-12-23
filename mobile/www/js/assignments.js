function assignmentCtrl($rootScope,$scope, $http){

   // $scope.transactions = { };
 
 $http.get(baseURL + 'assignall'  ).success(function(res) {
  
    console.log(res);

   }).error(function() {
   alert("Please check your internet connection or data source..");
  });
 //console.log(id);
 //alert(id);

 //$http.post(baseURL + 'getransaction', { key : 'tax_rate'} ).success(function(res) {$scope.options.tax_rate = res.value; });
 //$http.post(baseURL + 'getransaction', { key : 'minimum_payment'} ).success(function(res) {$scope.options.minimum_payment = res.value; });

 
 



  };