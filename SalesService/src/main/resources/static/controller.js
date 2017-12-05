var app = angular.module("serviceApp", []);
// var app = app();

app.controller('controller', function($scope, $window, $http) {

    $scope.loadDocument = function() {
        $http.get("/get").success(function(response) {
            $scope.json = response;
        });
    }

    $scope.myVar = true;


    $scope.form = {};
    $scope.addName = function() {
        /* changes for loader*/
        $(".loader").css("display", "block");
        $(".loaderimage").css("display", "block");

        setTimeout(function() {

            $(".loader").css("display", "none");
            $(".loaderimage").css("display", "none");

        }, 2000);
        
        if($scope.form.id==null){


        $http.post("/createSales", $scope.form).success(function(response) {

        	location.reload();
            console.log("Created successfully");
        });
        
        $scope.form = {};
        
        }else{
        	
        	
             $http.put("/updateSales", $scope.form).success(function(response) {
                 location.reload();
                 console.log("Updated successfully");
             });
             $scope.form = {};
        	
        }

        
    }

    $scope.editPage = function(form) {
        $scope.form = form;
        $scope.myVar = false;

    }


    $scope.deleteName = function(id) {
    	
        $(".loader").css("display", "block");
        $(".loaderimage").css("display", "block");

        setTimeout(function() {

            $(".loader").css("display", "none");
            $(".loaderimage").css("display", "none");

        }, 2000);


        $scope.form = {};
        $http.delete("/deleteSales/" + id).success(function(response) {

            
            console.log("Deleted successfully");
            
            location.reload();
        });

    }



})