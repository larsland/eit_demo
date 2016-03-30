var app = angular.module('gameMaster', []);

app.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval) {
    $scope.year = 0;
    $scope.health = 100;
    $scope.hunger = 0;
    $scope.stress = 100;
    $scope.thirst = 0;

    $scope.numWater = 3;
    $scope.numHealthyFood = 2;
    $scope.numJunkFood = 0;
    $scope.numCondoms = 1;
    $scope.numWine = 0;

    //--------------------Functions to adjust items--------------------------
    $scope.adjustWater = function(char) {
        if (char === '+') {$scope.numWater++;}
        else if (char === '-') {$scope.numWater -= 1}
    }
    $scope.adjustHealthyFood = function(char) {
        if (char === '+') {$scope.numHealthyFood++;}
        else if (char === '-') {$scope.numHealthyFood -= 1}
    }
    $scope.adjustJunkFood = function(char) {
        if (char === '+') {$scope.numJunkFood++;}
        else if (char === '-') {$scope.numJunkFood -= 1}
    }
    $scope.adjustCondoms = function(char) {
        if (char === '+') {$scope.numCondoms++;}
        else if (char === '-') {$scope.numCondoms -= 1}
    }
    $scope.adjustWine = function(char) {
        if (char === '+') {$scope.numWine++;}
        else if (char === '-') {$scope.wine -= 1}
    }

    //--------------------Functions to perform actions--------------------------
    $scope.drinkWater = function() {
        if ($scope.numWater <= 0) {
            console.log("No more water!")
        }
        else {
            $scope.thirst = 0;
            $scope.numWater -= 1;
        }
    }
    $scope.eatHealthyFood = function() {
        if ($scope.numHealthyFood <= 0) {
            console.log("No more water!")
        }
        else {
            $scope.hunger = 0;
            $scope.numHealthyFood -= 1;
        }
    }
    $scope.eatJunkFood = function() {
        if ($scope.numJunkFood <= 0) {
            console.log("No more water!")
        }
        else {
            $scope.hunger = 0;
            $scope.numJunkFood -= 1;
            checkStress(10);
            $scope.health -= 10;
        }
    }
    $scope.drinkWine = function() {
        if ($scope.numWine <= 0) {
            console.log("No more wine!")
        }
        else {
            $scope.stress = 100;
            $scope.numWine -= 1;
            $scope.health -= 20;
        }
    }

    checkStress = function(n) {
        if (($scope.stress - n) <= 0) {
            $scope.stress = 0;
        }
        else {
            $scope.stress -= n;
        }
    }

//--------------------Starting all timers--------------------------
    $interval(function(){
        $scope.year++;
        if ($scope.year >= 100) {
            $scope.year = 100;
        }
    }, 3000)

    $interval(function() {
        $scope.stress -= 1;
        if ($scope.stress <= 0) {
            $scope.stress = 0;
        }
    }, 1000)

    $interval(function() {
        $scope.hunger++;
        if ($scope.hunger >= 100) {
            $scope.hunger = 100;
        }
    }, 500)

    $interval(function() {
        $scope.thirst++;
        if ($scope.thirst >= 100) {
            $scope.thirst = 100;
        }
    }, 300)

    $interval(function() {
        if (($scope.hunger >= 90) || ($scope.thirst >= 90) || ($scope.stress <= 20)) {
            $scope.health -= 1;
        }
        if ($scope.health <= 0) {
            $scope.health = 0;
        }
    }, 1000)
}]);
